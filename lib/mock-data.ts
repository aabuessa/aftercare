import {
  Appointment,
  CareTeamMember,
  DoseLogEntry,
  FollowUpState,
  LabResult,
  PatientRecord,
  ThreadMessage,
} from "./types";

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

function formatFullDate(daysFromNow: number, hour?: number, minute = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  const datePart = d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  if (hour === undefined) return datePart;
  d.setHours(hour, minute, 0, 0);
  const timePart = d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  return `${datePart} at ${timePart}`;
}

export const initialFollowUp: FollowUpState = {
  booked: "routine",
  date: formatFullDate(14),
  reason: "Default 14-day routine checkup — no concerning signs reported.",
};

export const appointments: Appointment[] = [
  {
    id: "upcoming-surgeon-followup",
    status: "confirmed",
    clinician: "Dr. Layla Haddad",
    specialty: "Orthopedic Surgery — Post-op follow-up",
    dateTimeLabel: formatFullDate(14, 10, 30),
    mode: "in-person",
    facility: "Corniche Orthopedic Center",
    notes: "Bring your compression sleeve. Arrive 15 minutes early for a follow-up X-ray.",
  },
  {
    id: "past-surgery",
    status: "completed",
    clinician: "Dr. Layla Haddad",
    specialty: "ACL Reconstruction Surgery",
    dateTimeLabel: formatFullDate(-2, 8, 0),
    mode: "in-person",
    facility: "Corniche Orthopedic Center",
  },
];

export const careTeam: CareTeamMember[] = [
  {
    id: "surgeon",
    name: "Dr. Layla Haddad",
    role: "Orthopedic Surgeon",
    specialty: "Sports Medicine & ACL Reconstruction",
    facility: "Corniche Orthopedic Center",
    nextAppointment: formatFullDate(14),
  },
  {
    id: "physical-therapist",
    name: "Omar Khalil",
    role: "Physical Therapist",
    specialty: "Post-Surgical Rehabilitation",
    facility: "MoveWell Physiotherapy",
    nextAppointment: formatFullDate(6),
  },
  {
    id: "care-coordinator",
    name: "Fatima Noor",
    role: "Care Coordinator",
    specialty: "Post-Discharge Care",
    facility: "Corniche Orthopedic Center",
  },
];

export const labResult: LabResult = {
  testName: "C-Reactive Protein (CRP)",
  value: "8",
  unit: "mg/L",
  referenceRange: "0 – 10 mg/L",
  collectionDate: formatFullDate(-2),
  orderingClinician: "Dr. Layla Haddad",
  explanation:
    "CRP checks for inflammation in the body. A mild, temporary rise is expected in the first two weeks after surgery — this result is within the normal range.",
};

export const messageThread: ThreadMessage[] = [
  {
    id: "m1",
    sender: "coordinator",
    senderName: "Fatima Noor",
    text: "Hi Sarah — just checking in ahead of your follow-up. Let us know if the swelling changes before then.",
    timeLabel: "Mon, 9:12 AM",
    read: true,
  },
  {
    id: "m2",
    sender: "patient",
    senderName: "Sarah Ahmed",
    text: "Thanks! It's been improving each day, feeling good.",
    timeLabel: "Mon, 9:40 AM",
    read: true,
  },
  {
    id: "m3",
    sender: "coordinator",
    senderName: "Fatima Noor",
    text: "Great to hear. See you at the follow-up appointment.",
    timeLabel: "Mon, 9:41 AM",
    read: true,
  },
];
