export interface Patient {
  name: string;
  age: number;
  blood_type: string;
}

export interface Medication {
  name: string;
  dose: string;
  schedule: string;
  days_remaining: number;
}

export interface WatchMetric {
  metric: string;
  instruction: string;
}

export interface FollowUpRule {
  type: "conditional";
  condition: string;
  action: string;
  default_action: string;
}

export interface CheckInLogEntry {
  day: number;
  patient_report: string;
}

export interface PatientRecord {
  patient: Patient;
  diagnosis: string;
  medications: Medication[];
  watch_metrics: WatchMetric[];
  follow_up_rule: FollowUpRule;
  check_in_log: CheckInLogEntry[];
}

export type Trend = "improving" | "steady" | "worsening";

export interface CheckInResult {
  assessment: string;
  escalate: boolean;
  reasoning: string;
  trend: Trend;
}

export type RecoveryStatus = "on-track" | "needs-attention" | "urgent";

export interface ChatMessage {
  id: string;
  day: number;
  role: "patient" | "agent";
  text: string;
}

export interface EscalationEvent {
  id: string;
  day: number;
  result: CheckInResult;
}

export interface FollowUpState {
  booked: "routine" | "urgent";
  date: string;
  reason: string;
}

export interface DoseLogEntry {
  medication: string;
  time: string;
  taken: boolean;
}

export type ThreadItem =
  | { kind: "bubble"; id: string; message: ChatMessage }
  | { kind: "escalation"; id: string; day: number; result: CheckInResult; date: string };

export interface Appointment {
  id: string;
  status: "requested" | "confirmed" | "completed" | "cancelled";
  clinician: string;
  specialty: string;
  dateTimeLabel: string;
  mode: "virtual" | "in-person";
  facility: string;
  notes?: string;
}

export interface CareTeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  facility: string;
  nextAppointment?: string;
}

export interface LabResult {
  testName: string;
  value: string;
  unit: string;
  referenceRange: string;
  collectionDate: string;
  orderingClinician: string;
  explanation: string;
}

export interface ThreadMessage {
  id: string;
  sender: "patient" | "coordinator";
  senderName: string;
  text: string;
  timeLabel: string;
  read: boolean;
}
