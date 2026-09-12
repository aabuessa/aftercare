import { ArrowDown, ArrowUp, Minus } from "@phosphor-icons/react/dist/ssr";
import { Trend, WatchMetric } from "@/lib/types";

const TREND_STYLES: Record<Trend, { label: string; className: string; icon: typeof Minus }> = {
  improving: { label: "Improving", className: "text-success", icon: ArrowDown },
  steady: { label: "Steady", className: "text-muted-foreground", icon: Minus },
  worsening: { label: "Worsening", className: "text-attention", icon: ArrowUp },
};

export default function WatchMetricsCard({
  metric,
  trend,
}: {
  metric: WatchMetric;
  trend: Trend;
}) {
  const { label, className, icon: Icon } = TREND_STYLES[trend];
  return (
    <section className="rounded-2xl bg-surface p-5 shadow-soft animate-enter-up">
      <h2 className="text-lg font-semibold text-foreground">Watch Metrics</h2>
      <div className="mt-3">
        <p className="text-sm font-semibold capitalize text-foreground">
          {metric.metric.replace(/_/g, " ")}
        </p>
        <p className="text-xs text-muted-foreground">{metric.instruction}</p>
      </div>
      <div className={`mt-3 flex items-center gap-1.5 text-sm font-semibold transition-colors duration-200 ${className}`}>
        <Icon size={16} weight="bold" />
        {label}
      </div>
    </section>
  );
}
