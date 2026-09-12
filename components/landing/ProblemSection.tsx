const STATS = [
  {
    figure: "79%",
    caption: "of hospital readmissions are considered preventable, tied to poor post-discharge coordination",
  },
  {
    figure: "30%",
    caption: "less likely to be readmitted when patients clearly understand their discharge instructions",
  },
  {
    figure: "50%",
    caption: "average medication adherence among chronic-disease patients in developed countries",
  },
];

export default function ProblemSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h2 className="font-marketing text-2xl font-bold text-foreground sm:text-3xl">
        Discharge is where care usually stops. That&apos;s the problem.
      </h2>
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {STATS.map((stat) => (
          <div key={stat.figure} className="rounded-2xl bg-surface p-6 shadow-soft">
            <p className="font-marketing text-5xl font-extrabold text-primary">{stat.figure}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stat.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
