"use client";

import { createContext, ReactNode, useContext, useState } from "react";
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

// Cosmetic only — a plausible-looking date/time for the mocked urgent slot.
// The demo never gates on real elapsed time; "day" always advances per message sent.
function mockUrgentVisitDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  d.setHours(9, 0, 0, 0);
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }) + " at 9:00 AM";
}

interface RecoveryContextValue {
  day: number;
  history: CheckInLogEntry[];
  thread: ThreadItem[];
  status: RecoveryStatus;
  trend: Trend;
  followUp: FollowUpState;
  doses: DoseLogEntry[];
  isLoading: boolean;
  sendCheckIn: (message: string) => Promise<void>;
  toggleDose: (index: number) => void;
}

const RecoveryContext = createContext<RecoveryContextValue | null>(null);

export function RecoveryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<CheckInLogEntry[]>(patientRecord.check_in_log);
  const [thread, setThread] = useState<ThreadItem[]>(() => seedThread(patientRecord.check_in_log));
  const [status, setStatus] = useState<RecoveryStatus>("on-track");
  const [trend, setTrend] = useState<Trend>("steady");
  const [followUp, setFollowUp] = useState<FollowUpState>(initialFollowUp);
  const [doses, setDoses] = useState<DoseLogEntry[]>(initialDoseLog);
  const [isLoading, setIsLoading] = useState(false);

  // The day counter is purely a function of how many check-ins have happened —
  // never the real clock/date — so the whole escalation story can play out
  // back-to-back in one continuous demo take.
  const day = history.at(-1)!.day;

  async function sendCheckIn(message: string) {
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
          { kind: "escalation", id: `escalation-${nextDay}`, day: nextDay, result, date },
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
    <RecoveryContext.Provider
      value={{ day, history, thread, status, trend, followUp, doses, isLoading, sendCheckIn, toggleDose }}
    >
      {children}
    </RecoveryContext.Provider>
  );
}

export function useRecovery(): RecoveryContextValue {
  const ctx = useContext(RecoveryContext);
  if (!ctx) throw new Error("useRecovery must be used within a RecoveryProvider");
  return ctx;
}
