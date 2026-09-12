"use client";

import AppShell from "@/components/nav/AppShell";
import StatusChip from "@/components/StatusChip";
import MedicationsCard from "@/components/MedicationsCard";
import FollowUpCard from "@/components/FollowUpCard";
import Timeline from "@/components/recovery/Timeline";
import { patientRecord } from "@/lib/mock-data";
import { useRecovery } from "@/components/providers/RecoveryProvider";

export default function RecoveryPlanPage() {
  const { day, status, thread, followUp, doses, toggleDose } = useRecovery();

  return (
    <AppShell>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
        <header className="flex items-center justify-between rounded-2xl bg-surface p-6 shadow-soft animate-enter-up">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Recovery Plan</h1>
            <p className="text-muted-foreground">
              {patientRecord.diagnosis} · Day {day} of recovery
            </p>
          </div>
          <StatusChip status={status} />
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <section className="rounded-2xl bg-surface p-6 shadow-soft animate-enter-up">
            <h2 className="text-lg font-semibold text-foreground">Recovery timeline</h2>
            <div className="mt-5">
              <Timeline items={thread} />
            </div>
          </section>

          <div className="flex flex-col gap-6">
            <MedicationsCard
              medication={patientRecord.medications[0]}
              doses={doses}
              onToggleDose={toggleDose}
            />
            <FollowUpCard followUp={followUp} />
          </div>
        </div>
      </main>
    </AppShell>
  );
}
