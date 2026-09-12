import { CalendarCheck, ChatCircleText, Headset, Pill } from "@phosphor-icons/react/dist/ssr";

const FEATURES = [
  {
    icon: ChatCircleText,
    title: "Daily check-ins",
    description: "A short conversation each day tracks how recovery is actually going.",
  },
  {
    icon: Pill,
    title: "Medication reminders",
    description: "Dose schedules stay visible and confirmed, not just assumed.",
  },
  {
    icon: CalendarCheck,
    title: "Automatic follow-up booking",
    description: "If symptoms cross a clinical threshold, a visit gets booked — no chasing required.",
  },
  {
    icon: Headset,
    title: "Always-on companion (text + voice)",
    description: "Patients reach AfterCare by texting or calling, whichever they're comfortable with.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h2 className="font-marketing text-2xl font-bold text-foreground sm:text-3xl">How it works</h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="rounded-2xl bg-surface p-6 shadow-soft">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-mint">
              <feature.icon size={22} className="text-primary" />
            </div>
            <p className="mt-4 text-base font-semibold text-foreground">{feature.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
