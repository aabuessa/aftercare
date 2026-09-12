"use client";

import { CheckCircle, Circle } from "@phosphor-icons/react/dist/ssr";
import { DoseLogEntry, Medication } from "@/lib/types";

export default function MedicationsCard({
  medication,
  doses,
  onToggleDose,
}: {
  medication: Medication;
  doses: DoseLogEntry[];
  onToggleDose: (index: number) => void;
}) {
  return (
    <section className="rounded-2xl bg-surface p-5 shadow-soft animate-enter-up">
      <h2 className="text-lg font-semibold text-foreground">Medications</h2>
      <div className="mt-3">
        <p className="text-sm font-semibold text-foreground">
          {medication.name} — {medication.dose}
        </p>
        <p className="text-xs text-muted-foreground">
          {medication.schedule} · {medication.days_remaining} days remaining
        </p>
      </div>
      <ul className="mt-3 space-y-2">
        {doses.map((dose, index) => (
          <li key={`${dose.time}-${index}`}>
            <button
              type="button"
              onClick={() => onToggleDose(index)}
              className="flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-left text-sm transition-colors hover:bg-muted"
            >
              {dose.taken ? (
                <CheckCircle size={18} weight="fill" className="text-success" />
              ) : (
                <Circle size={18} className="text-muted-foreground" />
              )}
              <span className={dose.taken ? "text-foreground" : "text-muted-foreground"}>
                {dose.time}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
