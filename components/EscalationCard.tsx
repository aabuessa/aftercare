import { WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { CheckInResult } from "@/lib/types";

export default function EscalationCard({
  result,
  date,
}: {
  result: CheckInResult;
  date: string;
}) {
  return (
    <div className="animate-enter-up rounded-2xl border border-urgent/30 bg-urgent-soft p-4 shadow-soft">
      <div className="flex items-start gap-3">
        <WarningCircle size={24} weight="fill" className="mt-0.5 shrink-0 text-urgent" />
        <div>
          <p className="text-base font-semibold text-urgent">Urgent follow-up booked</p>
          <p className="mt-1 text-sm text-foreground">{result.reasoning}</p>
          <p className="mt-2 text-xs font-semibold text-muted-foreground">
            Scheduled for {date}
          </p>
        </div>
      </div>
    </div>
  );
}
