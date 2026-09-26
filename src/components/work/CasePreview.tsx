import { dashboardHtml } from "@/lib/dashboard-html";
import { getDashboard } from "@/lib/work";
import { DashboardFrame } from "./DashboardFrame";

/** Browser-window chrome around a scaled, cropped dashboard — used as a case-study thumbnail. */
export function CasePreview({ ids, crop = 0.6, pages = true }: { ids: string[]; crop?: number; pages?: boolean }) {
  const [first, ...rest] = ids;
  const main = getDashboard(first);
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-2 p-2.5 sm:p-3">
      <div className="mb-2.5 flex items-center gap-1.5 px-1" aria-hidden>
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        {pages && ids.length > 1 ? (
          <span className="label-mono ml-auto text-[0.62rem] text-muted">{ids.length} pages</span>
        ) : null}
      </div>
      <div className="overflow-hidden rounded-lg transition-transform duration-700 ease-out group-hover:scale-[1.015]">
        <DashboardFrame html={dashboardHtml(first)} label={`Preview of the ${main?.title ?? ""} dashboard`} cropRatio={crop} />
      </div>
      {pages && rest.length ? (
        <div className="mt-2.5 grid grid-cols-3 gap-2.5" aria-hidden>
          {rest.slice(0, 3).map((id) => (
            <div key={id} className="overflow-hidden rounded-md opacity-80 transition-opacity group-hover:opacity-100">
              <DashboardFrame html={dashboardHtml(id)} label="" cropRatio={0.5} />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
