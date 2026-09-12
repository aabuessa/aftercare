export default function DashboardPreview() {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4 shadow-soft-hover sm:p-5">
      <div className="flex items-center justify-between rounded-xl bg-background p-3">
        <div>
          <p className="text-sm font-semibold text-foreground">Sarah Ahmed</p>
          <p className="text-xs text-muted-foreground">Day 3 of recovery</p>
        </div>
        <span className="rounded-full bg-success-soft px-3 py-1 text-xs font-semibold text-success">
          On Track
        </span>
      </div>

      <div className="mt-3 space-y-2 rounded-xl bg-mint/50 p-3">
        <div className="ml-auto max-w-[75%] rounded-xl bg-primary px-3 py-2 text-xs text-primary-foreground">
          Swelling seems a little less today, still no pain
        </div>
        <div className="max-w-[75%] rounded-xl bg-surface px-3 py-2 text-xs text-foreground shadow-soft">
          Good to hear — that&apos;s the trend we want to see. Keep it up.
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-background p-3">
          <p className="text-xs font-semibold text-foreground">Ibuprofen 400mg</p>
          <p className="text-[11px] text-muted-foreground">every 8h · 5 days left</p>
        </div>
        <div className="rounded-xl bg-background p-3">
          <p className="text-xs font-semibold text-foreground">Ankle swelling</p>
          <p className="text-[11px] text-success">Improving</p>
        </div>
      </div>
    </div>
  );
}
