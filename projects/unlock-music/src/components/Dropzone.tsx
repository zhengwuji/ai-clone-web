"use client";

import { useRef, useState, type DragEvent, type ChangeEvent } from "react";
import type { DecryptedFileItem } from "@/data/music-data";

interface DropzoneProps {
  onFilesAdded: (files: File[]) => void;
  onLoadDemo: () => void;
  onClearAll: () => void;
  onDownloadAll: () => void;
  fileCount: number;
  completedCount: number;
}

export function Dropzone({
  onFilesAdded,
  onLoadDemo,
  onClearAll,
  onDownloadAll,
  fileCount,
  completedCount,
}: DropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleDragOver(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesAdded(Array.from(e.dataTransfer.files));
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      onFilesAdded(Array.from(e.target.files));
      e.target.value = "";
    }
  }

  return (
    <div className="w-full">
      {/* Drop area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`group relative flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200 ${
          isDragOver
            ? "border-sky-500 bg-sky-50/70 ring-4 ring-sky-500/10"
            : "border-border/80 bg-muted/30 hover:border-sky-400 hover:bg-muted/60"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        {/* Upload Icon */}
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-500/10 text-sky-600 transition-transform duration-200 group-hover:scale-110">
          <svg
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.8}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>

        <h3 className="text-base font-semibold text-foreground sm:text-lg">
          拖拽加密音乐文件到此处，或{" "}
          <span className="text-sky-600 underline underline-offset-4">
            点击选择文件
          </span>
        </h3>

        <p className="mt-2 max-w-md text-xs text-muted-foreground sm:text-sm">
          支持 QQ 音乐 (QMC/MFLAC)、网易云 (NCM)、酷狗 (KGM)、酷我 (KWM)、虾米等多格式。
        </p>

        <div className="mt-4 flex items-center gap-2 text-xs font-medium text-emerald-600">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <span>前端纯本地处理 · 零服务器交互 · 绝不泄露个人隐私</span>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-sky-500 active:scale-95"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            选择文件
          </button>

          <button
            type="button"
            onClick={onLoadDemo}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-medium text-foreground transition hover:bg-muted active:scale-95"
          >
            <svg
              className="h-4 w-4 text-sky-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            载入演示示例
          </button>
        </div>

        {fileCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">
              共 <span className="font-semibold text-foreground">{fileCount}</span> 个文件
              {completedCount > 0 && `（已解密 ${completedCount}）`}
            </span>

            {completedCount > 0 && (
              <button
                type="button"
                onClick={onDownloadAll}
                className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-500 active:scale-95"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
                全部下载
              </button>
            )}

            <button
              type="button"
              onClick={onClearAll}
              className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-2 text-xs font-medium text-destructive transition hover:bg-destructive/10"
            >
              清空
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
