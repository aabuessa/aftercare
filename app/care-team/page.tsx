import AppShell from "@/components/nav/AppShell";
import { careTeam } from "@/lib/mock-data";

function initials(name: string): string {
  const cleaned = name.replace(/^(Dr|Mr|Mrs|Ms)\.\s+/i, "");
  return cleaned
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function CareTeamPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <h1 className="text-2xl font-semibold text-foreground">Care team</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Everyone coordinating Sarah&apos;s recovery, in one place.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {careTeam.map((member) => (
            <div key={member.id} className="rounded-2xl bg-surface p-5 shadow-soft animate-enter-up">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mint text-sm font-semibold text-primary">
                  {initials(member.name)}
                </span>
                <div>
                  <p className="text-base font-semibold text-foreground">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.role}</p>
                </div>
              </div>
              <p className="mt-3 text-sm text-foreground">{member.specialty}</p>
              <p className="text-xs text-muted-foreground">{member.facility}</p>
              {member.nextAppointment && (
                <p className="mt-2 text-xs font-semibold text-primary">
                  Next appointment: {member.nextAppointment}
                </p>
              )}
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  className="rounded-lg border border-primary px-3 py-1.5 text-xs font-semibold text-primary transition-colors hover:bg-mint/50"
                >
                  View profile
                </button>
                <button
                  type="button"
                  className="rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-transform active:scale-[0.97]"
                >
                  Book appointment
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </AppShell>
  );
}
