import { CalendarCheck } from "@phosphor-icons/react/dist/ssr";
import { FollowUpState } from "@/lib/types";

export default function FollowUpCard({ followUp }: { followUp: FollowUpState }) {
  const isUrgent = followUp.booked === "urgent";
  return (
    <section
      className={`rounded-2xl p-5 shadow-soft transition-colors duration-200 animate-enter-up ${
        isUrgent ? "bg-destructive/5 border border-destructive/30" : "bg-white"
      }`}
    >
      <h2 className="font-heading text-lg text-foreground">Follow-Up</h2>
      <div className="mt-3 flex items-start gap-2">
        <CalendarCheck
          size={20}
          weight="fill"
          className={isUrgent ? "text-destructive" : "text-accent"}
        />
        <div>
          <p className={`text-sm font-semibold ${isUrgent ? "text-destructive" : "text-foreground"}`}>
            {isUrgent ? "Urgent visit booked" : "Routine checkup"} — {followUp.date}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">{followUp.reason}</p>
        </div>
      </div>
    </section>
  );
}
