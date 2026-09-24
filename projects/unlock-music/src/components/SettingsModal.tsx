"use client";

import { useState } from "react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [autoDownload, setAutoDownload] = useState(false);
  const [nameFormat, setNameFormat] = useState("artist-title");
  const [flacBehavior, setFlacBehavior] = useState("auto");
  const [concurrency, setConcurrency] = useState(2);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl transition-all">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500/10 text-sky-600">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="text-base font-bold text-foreground">解密偏好设置</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-muted-foreground hover:bg-muted"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <div className="mt-4 space-y-4 text-xs sm:text-sm">
          {/* Toggle: Auto-download */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-semibold text-foreground">解密完成后自动触发下载</span>
              <p className="text-xs text-muted-foreground">单个文件解析完毕后即刻保存</p>
            </div>
            <input
              type="checkbox"
              checked={autoDownload}
              onChange={(e) => setAutoDownload(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
            />
          </div>

          {/* Naming Pattern */}
          <div>
            <label className="block font-semibold text-foreground">输出文件名格式</label>
            <select
              value={nameFormat}
              onChange={(e) => setNameFormat(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            >
              <option value="artist-title">歌手 - 歌曲名 (例如: 周杰伦 - 晴天.flac)</option>
              <option value="title-artist">歌曲名 - 歌手 (例如: 晴天 - 周杰伦.flac)</option>
              <option value="original">保留原始缓存文件名</option>
            </select>
          </div>

          {/* FLAC handling */}
          <div>
            <label className="block font-semibold text-foreground">音频编码处理策略</label>
            <select
              value={flacBehavior}
              onChange={(e) => setFlacBehavior(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-sky-500/20"
            >
              <option value="auto">自动识别并保留真实无损音质 (推荐)</option>
              <option value="mp3-only">全部自动优化为 MP3 (省空间)</option>
            </select>
          </div>

          {/* Concurrency */}
          <div>
            <label className="block font-semibold text-foreground">
              Worker 并发计算线程数: <span className="font-bold text-sky-600">{concurrency}</span>
            </label>
            <input
              type="range"
              min={1}
              max={4}
              value={concurrency}
              onChange={(e) => setConcurrency(Number(e.target.value))}
              className="mt-2 w-full accent-sky-600"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-2 border-t border-border/40 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-sky-500"
          >
            保存并应用
          </button>
        </div>
      </div>
    </div>
  );
}
