"use client";

import { useState } from "react";
import StatusHeader from "@/components/StatusHeader";
import ChatPanel from "@/components/ChatPanel";
import MedicationsCard from "@/components/MedicationsCard";
import WatchMetricsCard from "@/components/WatchMetricsCard";
import FollowUpCard from "@/components/FollowUpCard";
import { patientRecord, initialDoseLog, initialFollowUp } from "@/lib/mock-data";
import {
  CheckInLogEntry,
  CheckInResult,
  DoseLogEntry,
  FollowUpState,
  RecoveryStatus,
  ThreadItem,
  Trend,
} from "@/lib/types";

const SEEDED_REPLIES: Record<number, string> = {
  1: "Thanks for checking in — mild swelling this early is completely normal. Keep elevating and icing.",
  2: "Good to hear there's no pain. Continued swelling at day 2 is still within the expected range — keep tracking it.",
};

function seedThread(history: CheckInLogEntry[]): ThreadItem[] {
  return history.flatMap((entry) => [
    {
      kind: "bubble" as const,
      id: `seed-patient-${entry.day}`,
      message: { id: `seed-patient-${entry.day}`, day: entry.day, role: "patient" as const, text: entry.patient_report },
    },
    {
      kind: "bubble" as const,
      id: `seed-agent-${entry.day}`,
      message: {
        id: `seed-agent-${entry.day}`,
        day: entry.day,
        role: "agent" as const,
        text: SEEDED_REPLIES[entry.day] ?? "Logged — keep resting.",
      },
    },
  ]);
}

function statusFrom(escalate: boolean, trend: Trend): RecoveryStatus {
  if (escalate) return "urgent";
  if (trend === "worsening") return "needs-attention";
  return "on-track";
}

function mockUrgentVisitDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(9, 0, 0, 0);
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) + " at 9:00 AM";
}

export default function Home() {
  const [history, setHistory] = useState<CheckInLogEntry[]>(patientRecord.check_in_log);
  const [thread, setThread] = useState<ThreadItem[]>(() => seedThread(patientRecord.check_in_log));
  const [status, setStatus] = useState<RecoveryStatus>("on-track");
  const [trend, setTrend] = useState<Trend>("steady");
  const [followUp, setFollowUp] = useState<FollowUpState>(initialFollowUp);
  const [doses, setDoses] = useState<DoseLogEntry[]>(initialDoseLog);
  const [isLoading, setIsLoading] = useState(false);

  const day = history.at(-1)!.day;

  async function handleSend(message: string) {
    const nextDay = day + 1;
    const patientMessageId = `live-patient-${nextDay}`;
    setThread((prev) => [
      ...prev,
      {
        kind: "bubble",
        id: patientMessageId,
        message: { id: patientMessageId, day: nextDay, role: "patient", text: message },
      },
    ]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history }),
      });
      const result: CheckInResult = await response.json();

      setHistory((prev) => [...prev, { day: nextDay, patient_report: message }]);
      setTrend(result.trend);
      setStatus(statusFrom(result.escalate, result.trend));

      if (result.escalate) {
        const date = mockUrgentVisitDate();
        setFollowUp({ booked: "urgent", date, reason: result.reasoning });
        setThread((prev) => [
          ...prev,
          { kind: "escalation", id: `escalation-${nextDay}`, result, date },
        ]);
      } else {
        const agentId = `live-agent-${nextDay}`;
        setThread((prev) => [
          ...prev,
          {
            kind: "bubble",
            id: agentId,
            message: { id: agentId, day: nextDay, role: "agent", text: result.assessment },
          },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  }

  function toggleDose(index: number) {
    setDoses((prev) =>
      prev.map((dose, i) => (i === index ? { ...dose, taken: !dose.taken } : dose))
    );
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-6">
          <StatusHeader name={patientRecord.patient.name} day={day} status={status} />
          <div className="min-h-[520px] flex-1">
            <ChatPanel items={thread} onSend={handleSend} isLoading={isLoading} />
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
  );
}
