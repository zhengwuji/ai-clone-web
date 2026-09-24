"use client";

import { SITE_CONFIG } from "@/data/music-data";

export function Footer() {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer className="mt-20 border-t border-border/40 bg-muted/30 py-8 text-center text-xs text-muted-foreground">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="font-bold text-foreground">{SITE_CONFIG.name}</span>
            <span>·</span>
            <span>{SITE_CONFIG.version}</span>
            <span>·</span>
            <span>基于 MIT 协议开源</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={SITE_CONFIG.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition underline underline-offset-4"
            >
              GitHub 源码仓库
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition"
            >
              <span>返回顶部</span>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>

        <p className="mt-4 text-[11px] text-muted-foreground/80 leading-relaxed">
          免责提示：本站为开源前端工具，所有转换均在访客本地设备内存中运行，不持有、不存储、不分发任何音乐音频。
        </p>
      </div>
    </footer>
  );
}
