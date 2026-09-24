import { SUPPORTED_PLATFORMS } from "@/data/music-data";

export function FormatGrid() {
  return (
    <section id="formats" className="mt-12 scroll-mt-20">
      <div className="mb-6 flex flex-col items-center text-center">
        <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          支持的加密格式与平台
        </h3>
        <p className="mt-1.5 max-w-xl text-xs text-muted-foreground sm:text-sm">
          算法持续跟进各大平台最新加密逻辑，覆盖绝大多数离线缓存文件扩展名
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SUPPORTED_PLATFORMS.map((platform) => (
          <div
            key={platform.name}
            className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
          >
            <div>
              {/* Card Header: Platform Name & Badge */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-foreground">
                  {platform.name}
                </span>
                <span
                  className="rounded px-2 py-0.5 text-[10px] font-bold text-white shadow-xs"
                  style={{ backgroundColor: platform.color }}
                >
                  {platform.badge}
                </span>
              </div>

              {/* Description */}
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                {platform.description}
              </p>
            </div>

            {/* Formats Tags */}
            <div className="mt-4 flex flex-wrap gap-1.5 pt-2 border-t border-border/40">
              {platform.formats.map((fmt) => (
                <span
                  key={fmt}
                  className="rounded-md bg-muted px-2 py-0.5 font-mono text-[11px] font-semibold text-foreground/80 transition group-hover:bg-sky-50 group-hover:text-sky-700"
                >
                  {fmt}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
