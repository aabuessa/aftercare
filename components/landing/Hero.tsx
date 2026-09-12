import Link from "next/link";
import DashboardPreview from "./DashboardPreview";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-2 lg:py-20">
      <div>
        <h1 className="font-marketing text-5xl font-extrabold leading-[1.08] text-foreground sm:text-6xl">
          AfterCare
        </h1>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
          The AI companion that walks patients home from the hospital — texting,
          calling, and checking in until recovery is actually done.
        </p>
        <Link
          href="/today"
          className="mt-8 inline-flex rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-soft transition-transform active:scale-[0.97]"
        >
          Try the demo
        </Link>
      </div>
      <DashboardPreview />
    </section>
  );
}
