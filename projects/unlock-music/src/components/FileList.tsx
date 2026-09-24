"use client";

import { useState } from "react";
import type { DecryptedFileItem } from "@/data/music-data";

interface FileListProps {
  files: DecryptedFileItem[];
  onRemove: (id: string) => void;
  onDownload: (file: DecryptedFileItem) => void;
}

export function FileList({ files, onRemove, onDownload }: FileListProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  // Simple simulated audio preview using Web Audio API oscillator
  function togglePlay(id: string) {
    if (playingId === id) {
      setPlayingId(null);
      return;
    }
    setPlayingId(id);

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(440, ctx.currentTime); // Concert A
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.5);
      }
    } catch {
      // AudioContext unavailable or blocked by autoplay
    }

    setTimeout(() => {
      setPlayingId((curr) => (curr === id ? null : curr));
    }, 2000);
  }

  if (files.length === 0) return null;

  return (
    <div className="mt-6 w-full rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-3">
        <h4 className="text-sm font-bold text-foreground sm:text-base">
          解密文件队列 ({files.length})
        </h4>
        <span className="text-xs text-muted-foreground">
          解密完成即可一键保存至本地
        </span>
      </div>

      <div className="divide-y divide-border/40">
        {files.map((file) => {
          const isPlaying = playingId === file.id;

          return (
            <div
              key={file.id}
              className="group flex flex-col justify-between gap-3 py-3.5 sm:flex-row sm:items-center"
            >
              {/* Info Column */}
              <div className="flex items-start gap-3">
                {/* Audio Disc / Play Icon */}
                <button
                  type="button"
                  onClick={() => togglePlay(file.id)}
                  title={isPlaying ? "正在试听..." : "点击试听"}
                  className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition ${
                    isPlaying
                      ? "bg-sky-500 text-white shadow-md shadow-sky-500/25 animate-pulse"
                      : "bg-muted text-muted-foreground hover:bg-sky-500/10 hover:text-sky-600"
                  }`}
                >
                  {isPlaying ? (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="truncate text-sm font-semibold text-foreground">
                      {file.title || file.name}
                    </span>
                    <span className="rounded bg-sky-50 px-1.5 py-0.5 text-[10px] font-bold text-sky-700 ring-1 ring-sky-600/10">
                      {file.sourceFormat}
                    </span>
                    <span className="text-xs text-muted-foreground">➔</span>
                    <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 ring-1 ring-emerald-600/10">
                      {file.targetFormat}
                    </span>
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-x-3 text-xs text-muted-foreground">
                    <span>歌手: {file.artist}</span>
                    <span>专辑: {file.album}</span>
                    <span>大小: {file.size}</span>
                  </div>
                </div>
              </div>

              {/* Status & Actions Column */}
              <div className="flex items-center justify-end gap-2 pt-1 sm:pt-0">
                {file.status === "completed" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-600 ring-1 ring-emerald-500/20">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    已完成
                  </span>
                )}

                {file.status === "processing" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-600 ring-1 ring-sky-500/20">
                    <svg className="h-3 w-3 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M12 2v4m0 12v4m10-10h-4M6 12H2" />
                    </svg>
                    解密中 {file.progress}%
                  </span>
                )}

                <button
                  type="button"
                  onClick={() => onDownload(file)}
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted active:scale-95"
                  title="下载文件"
                >
                  <svg className="h-3.5 w-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  下载
                </button>

                <button
                  type="button"
                  onClick={() => onRemove(file.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive"
                  title="移除此项"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
