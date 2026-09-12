import { DoseLogEntry, FollowUpState, PatientRecord } from "./types";

export const patientRecord: PatientRecord = {
  patient: { name: "Sarah Ahmed", age: 34, blood_type: "O+" },
  diagnosis: "ACL reconstruction surgery",
  medications: [
    { name: "Ibuprofen", dose: "400mg", schedule: "every 8h", days_remaining: 5 },
  ],
  watch_metrics: [
    {
      metric: "ankle_swelling",
      instruction: "should reduce daily; flag if worsening 3+ days",
    },
  ],
  follow_up_rule: {
    type: "conditional",
    condition: "swelling_or_pain_increasing for 3+ consecutive days",
    action: "book_urgent_visit",
    default_action: "routine_checkup_in_14_days",
  },
  check_in_log: [
    { day: 1, patient_report: "feeling fine, slight swelling" },
    { day: 2, patient_report: "still a bit swollen, no pain" },
  ],
};

export const initialDoseLog: DoseLogEntry[] = [
  { medication: "Ibuprofen", time: "8:00 AM", taken: true },
  { medication: "Ibuprofen", time: "4:00 PM", taken: true },
  { medication: "Ibuprofen", time: "12:00 AM", taken: false },
];

function routineFollowUpDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 14);
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

export const initialFollowUp: FollowUpState = {
  booked: "routine",
  date: routineFollowUpDate(),
  reason: "Default 14-day routine checkup — no concerning signs reported.",
};
