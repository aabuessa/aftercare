import { RecoveryStatus } from "@/lib/types";
import StatusChip from "./StatusChip";

export default function StatusHeader({
  name,
  day,
  status,
}: {
  name: string;
  day: number;
  status: RecoveryStatus;
}) {
  return (
    <header className="flex items-center justify-between rounded-2xl bg-white p-6 shadow-soft animate-enter-up">
      <div>
        <h1 className="font-heading text-2xl text-foreground">{name}</h1>
        <p className="text-muted-foreground">Day {day} of recovery</p>
      </div>
      <StatusChip status={status} />
    </header>
  );
}
