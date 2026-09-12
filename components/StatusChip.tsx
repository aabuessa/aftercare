import { RecoveryStatus } from "@/lib/types";

const STYLES: Record<RecoveryStatus, { label: string; className: string }> = {
  "on-track": { label: "On Track", className: "bg-success/10 text-success" },
  "needs-attention": { label: "Needs Attention", className: "bg-warning/10 text-warning" },
  urgent: { label: "Urgent Visit Booked", className: "bg-destructive/10 text-destructive" },
};

export default function StatusChip({ status }: { status: RecoveryStatus }) {
  const { label, className } = STYLES[status];
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold transition-colors duration-200 ${className}`}
    >
      {label}
    </span>
  );
}
