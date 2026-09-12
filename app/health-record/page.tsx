import AppShell from "@/components/nav/AppShell";
import { labResult } from "@/lib/mock-data";

export default function HealthRecordPage() {
  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <h1 className="text-2xl font-semibold text-foreground">Health record</h1>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <section className="rounded-2xl bg-surface p-6 shadow-soft animate-enter-up">
            <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Laboratory result
            </p>
            <h2 className="mt-2 text-xl font-semibold text-foreground">{labResult.testName}</h2>
            <p className="mt-3 text-4xl font-bold text-primary">
              {labResult.value}
              <span className="ml-1 text-lg font-semibold text-muted-foreground">{labResult.unit}</span>
            </p>
            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between border-b border-border pb-2">
                <dt className="text-muted-foreground">Reference range</dt>
                <dd className="font-medium text-foreground">{labResult.referenceRange}</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <dt className="text-muted-foreground">Collection date</dt>
                <dd className="font-medium text-foreground">{labResult.collectionDate}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Ordering clinician</dt>
                <dd className="font-medium text-foreground">{labResult.orderingClinician}</dd>
              </div>
            </dl>
          </section>

          <section className="rounded-2xl bg-surface p-6 shadow-soft animate-enter-up">
            <h2 className="text-lg font-semibold text-foreground">What this means</h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-foreground">
              <div>
                <p className="font-semibold text-muted-foreground">What this test measures</p>
                <p className="mt-1">
                  C-reactive protein is produced by the liver in response to inflammation anywhere in
                  the body, including normal post-surgical healing.
                </p>
              </div>
              <div>
                <p className="font-semibold text-muted-foreground">Your result</p>
                <p className="mt-1">
                  {labResult.value} {labResult.unit} — within the reference range of {labResult.referenceRange}.
                </p>
              </div>
              <div>
                <p className="font-semibold text-muted-foreground">What the reference range means</p>
                <p className="mt-1">{labResult.explanation}</p>
              </div>
              <div>
                <p className="font-semibold text-muted-foreground">Questions you may want to ask your doctor</p>
                <p className="mt-1">
                  Is this level expected at this stage of recovery, and should it be rechecked at the
                  next follow-up?
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </AppShell>
  );
}
