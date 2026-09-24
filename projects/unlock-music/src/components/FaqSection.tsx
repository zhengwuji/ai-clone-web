"use client";

import { useState } from "react";
import { FAQ_LIST } from "@/data/music-data";

export function FaqSection() {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  function toggleFaq(index: number) {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }

  return (
    <section id="faq" className="mt-14 scroll-mt-20">
      <div className="mb-6 flex flex-col items-center text-center">
        <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          常见问题与说明
        </h3>
        <p className="mt-1.5 max-w-xl text-xs text-muted-foreground sm:text-sm">
          解答关于解密原理、音质损耗及隐私安全的常见疑问
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-3">
        {FAQ_LIST.map((faq, index) => {
          const isOpen = openIndices.includes(index);

          return (
            <div
              key={faq.question}
              className="overflow-hidden rounded-xl border border-border bg-card transition-all"
            >
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="flex w-full items-center justify-between p-4 text-left font-medium text-foreground hover:bg-muted/40 transition"
              >
                <span className="text-sm font-semibold">{faq.question}</span>
                <span
                  className={`ml-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform duration-200 ${
                    isOpen ? "rotate-180 bg-sky-50 text-sky-600" : ""
                  }`}
                >
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>

              {isOpen && (
                <div className="border-t border-border/40 bg-muted/20 px-4 py-3.5 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Safety & Local execution Callout */}
      <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-emerald-500/20 bg-emerald-50/50 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
            <svg
              className="h-5 w-5"
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
          </div>
          <div>
            <h5 className="text-sm font-bold text-emerald-950">
              安全与合规免责声明
            </h5>
            <p className="mt-1 text-xs leading-relaxed text-emerald-900/80">
              本工具开源免费，仅供个人技术研究及已购音乐离线设备兼容性备份之用。所有音频解密算法均在浏览器沙箱本地运行，本站不提供任何有版权音频的下载或破解传播。请自觉支持正版音乐。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
