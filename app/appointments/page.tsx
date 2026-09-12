import { CheckCircle, Clock, MapPin, VideoCamera } from "@phosphor-icons/react/dist/ssr";
import AppShell from "@/components/nav/AppShell";
import { appointments } from "@/lib/mock-data";
import { Appointment } from "@/lib/types";

const STATUS_STYLES: Record<Appointment["status"], string> = {
  requested: "bg-attention-soft text-attention",
  confirmed: "bg-success-soft text-success",
  completed: "bg-muted text-muted-foreground",
  cancelled: "bg-urgent-soft text-urgent",
};

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  return (
    <div className="rounded-2xl bg-surface p-5 shadow-soft animate-enter-up">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-foreground">{appointment.clinician}</p>
          <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${STATUS_STYLES[appointment.status]}`}>
          {appointment.status}
        </span>
      </div>
      <div className="mt-4 space-y-2 text-sm text-foreground">
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-primary" />
          {appointment.dateTimeLabel}
        </div>
        <div className="flex items-center gap-2">
          {appointment.mode === "virtual" ? (
            <VideoCamera size={16} className="text-primary" />
          ) : (
            <MapPin size={16} className="text-primary" />
          )}
          {appointment.mode === "virtual" ? "Virtual visit" : appointment.facility}
        </div>
      </div>
      {appointment.notes && (
        <p className="mt-3 rounded-xl bg-background p-3 text-xs text-muted-foreground">
          {appointment.notes}
        </p>
      )}
      {appointment.status !== "completed" && (
        <button
          type="button"
          className="mt-4 rounded-lg border border-primary px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-mint/50"
        >
          Manage appointment
        </button>
      )}
      {appointment.status === "completed" && (
        <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
          <CheckCircle size={14} weight="fill" />
          Completed
        </div>
      )}
    </div>
  );
}

export default function AppointmentsPage() {
  const upcoming = appointments.filter((a) => a.status !== "completed" && a.status !== "cancelled");
  const past = appointments.filter((a) => a.status === "completed" || a.status === "cancelled");

  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <h1 className="text-2xl font-semibold text-foreground">Appointments</h1>

        <section className="mt-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Upcoming</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {upcoming.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">Past</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {past.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
