import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 sm:py-16">
      <div className="mx-auto max-w-xl rounded-2xl bg-mint/60 p-10 shadow-soft">
        <p className="text-sm font-medium text-primary">No setup for patients — AfterCare reaches out first.</p>
        <Link
          href="/today"
          className="mt-5 inline-flex rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-soft transition-transform active:scale-[0.97]"
        >
          Try the demo
        </Link>
      </div>
    </section>
  );
}
