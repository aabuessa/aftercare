"use client";

import AppShell from "@/components/nav/AppShell";
import StatusHeader from "@/components/StatusHeader";
import ChatPanel from "@/components/ChatPanel";
import MedicationsCard from "@/components/MedicationsCard";
import WatchMetricsCard from "@/components/WatchMetricsCard";
import FollowUpCard from "@/components/FollowUpCard";
import { patientRecord } from "@/lib/mock-data";
import { useRecovery } from "@/components/providers/RecoveryProvider";

export default function TodayPage() {
  const { day, thread, status, trend, followUp, doses, isLoading, sendCheckIn, toggleDose } =
    useRecovery();

  return (
    <AppShell>
      <main className="px-4 py-6 sm:px-6 sm:py-10">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-6">
            <StatusHeader name={patientRecord.patient.name} day={day} status={status} />
            <div className="min-h-[520px] flex-1">
              <ChatPanel items={thread} onSend={sendCheckIn} isLoading={isLoading} />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <MedicationsCard
              medication={patientRecord.medications[0]}
              doses={doses}
              onToggleDose={toggleDose}
            />
            <WatchMetricsCard metric={patientRecord.watch_metrics[0]} trend={trend} />
            <FollowUpCard followUp={followUp} />
          </div>
        </div>
      </main>
    </AppShell>
  );
}
