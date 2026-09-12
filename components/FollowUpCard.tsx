import { CalendarCheck } from "@phosphor-icons/react/dist/ssr";
import { FollowUpState } from "@/lib/types";

export default function FollowUpCard({ followUp }: { followUp: FollowUpState }) {
  const isUrgent = followUp.booked === "urgent";
  return (
    <section
      className={`rounded-2xl p-5 shadow-soft transition-colors duration-200 animate-enter-up ${
        isUrgent ? "border border-urgent/30 bg-urgent-soft" : "bg-surface"
      }`}
    >
      <h2 className="text-lg font-semibold text-foreground">Follow-Up</h2>
      <div className="mt-3 flex items-start gap-2">
        <CalendarCheck
          size={20}
          weight="fill"
          className={isUrgent ? "text-urgent" : "text-primary"}
        />
        <div>
          <p className={`text-sm font-semibold ${isUrgent ? "text-urgent" : "text-foreground"}`}>
            {isUrgent ? "Urgent visit booked" : "Routine checkup"} — {followUp.date}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{followUp.reason}</p>
        </div>
      </div>
    </section>
  );
}
