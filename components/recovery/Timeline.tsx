import { CheckCircle, WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { ThreadItem } from "@/lib/types";

interface DayGroup {
  day: number;
  patientReport?: string;
  agentText?: string;
  escalated: boolean;
}

function groupByDay(items: ThreadItem[]): DayGroup[] {
  const groups = new Map<number, DayGroup>();

  for (const item of items) {
    const day = item.kind === "bubble" ? item.message.day : item.day;
    const group = groups.get(day) ?? { day, escalated: false };

    if (item.kind === "bubble") {
      if (item.message.role === "patient") group.patientReport = item.message.text;
      else group.agentText = item.message.text;
    } else {
      group.escalated = true;
      group.agentText = item.result.reasoning;
    }

    groups.set(day, group);
  }

  return Array.from(groups.values()).sort((a, b) => a.day - b.day);
}

export default function Timeline({ items }: { items: ThreadItem[] }) {
  const groups = groupByDay(items);

  return (
    <ol className="space-y-6">
      {groups.map((group, index) => (
        <li key={group.day} className="relative pl-8">
          {index < groups.length - 1 && (
            <span className="absolute left-[9px] top-6 h-full w-px bg-border" aria-hidden />
          )}
          <span
            className={`absolute left-0 top-0.5 flex h-5 w-5 items-center justify-center rounded-full ${
              group.escalated ? "bg-urgent-soft text-urgent" : "bg-success-soft text-success"
            }`}
          >
            {group.escalated ? (
              <WarningCircle size={13} weight="fill" />
            ) : (
              <CheckCircle size={13} weight="fill" />
            )}
          </span>
          <p className="text-sm font-semibold text-foreground">Day {group.day}</p>
          {group.patientReport && (
            <p className="mt-1 text-sm text-muted-foreground">&ldquo;{group.patientReport}&rdquo;</p>
          )}
          {group.agentText && (
            <p className={`mt-1 text-xs ${group.escalated ? "text-urgent" : "text-muted-foreground"}`}>
              {group.agentText}
            </p>
          )}
        </li>
      ))}
    </ol>
  );
}
