import OpenAI from "openai";
import { CheckInLogEntry, CheckInResult, PatientRecord, Trend } from "./types";

const MODEL = process.env.OPENROUTER_MODEL ?? "meta-llama/llama-3.1-8b-instruct:free";

const FALLBACK_RESULT: CheckInResult = {
  assessment: "Logged, monitoring",
  escalate: false,
  reasoning: "",
  trend: "steady",
};

function client() {
  return new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
  });
}

function systemPrompt(record: PatientRecord): string {
  return `You are a clinical follow-up assistant monitoring a patient's post-discharge recovery.

Patient: ${record.patient.name}, age ${record.patient.age}, blood type ${record.patient.blood_type}.
Diagnosis: ${record.diagnosis}.
Medications: ${JSON.stringify(record.medications)}.
Watch metrics: ${JSON.stringify(record.watch_metrics)}.

ESCALATION RULE (fixed, not a judgment call — apply it mechanically):
If the patient reports worsening swelling or pain for 3 or more CONSECUTIVE
days (counting today's message), set escalate=true and action="${record.follow_up_rule.action}".
If that streak is fewer than 3 consecutive days — even if today's message is
worsening — set escalate=false; you may still set trend="worsening" to flag
it. Any improvement or steady report breaks the consecutive-worsening streak
back to zero. If escalate=false, the default action is
"${record.follow_up_rule.default_action}".

Do not escalate based on severity, tone, or your own clinical intuition —
only the 3-consecutive-day rule above decides escalate. Count the streak
yourself from the check-in history plus today's message before answering.

Respond with ONLY a single JSON object, no prose, no code fences, in exactly this shape:
{"assessment": "<one short sentence for the patient>", "escalate": <true or false>, "reasoning": "<one short sentence stating the consecutive-day count and how it maps to the rule>", "trend": "<improving|steady|worsening>"}`;
}

function extractJson(raw: string): string {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) return fenced[1].trim();
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start !== -1 && end !== -1 && end > start) {
    return raw.slice(start, end + 1);
  }
  return raw.trim();
}

function isTrend(value: unknown): value is Trend {
  return value === "improving" || value === "steady" || value === "worsening";
}

function coerceResult(parsed: unknown): CheckInResult | null {
  if (typeof parsed !== "object" || parsed === null) return null;
  const obj = parsed as Record<string, unknown>;
  if (
    typeof obj.assessment === "string" &&
    typeof obj.escalate === "boolean" &&
    typeof obj.reasoning === "string" &&
    isTrend(obj.trend)
  ) {
    return {
      assessment: obj.assessment,
      escalate: obj.escalate,
      reasoning: obj.reasoning,
      trend: obj.trend,
    };
  }
  return null;
}

export async function evaluateCheckIn(
  record: PatientRecord,
  history: CheckInLogEntry[],
  newMessage: string
): Promise<CheckInResult> {
  const historyText = history
    .map((entry) => `Day ${entry.day}: ${entry.patient_report}`)
    .join("\n");
  const nextDay = (history.at(-1)?.day ?? 0) + 1;

  try {
    const completion = await client().chat.completions.create({
      model: MODEL,
      temperature: 0.1,
      messages: [
        { role: "system", content: systemPrompt(record) },
        {
          role: "user",
          content: `Check-in history:\n${historyText}\n\nDay ${nextDay} (new message): ${newMessage}`,
        },
      ],
    });

    // Some free OpenRouter models attach `reasoning`/`reasoning_details` alongside
    // `content` — only `content` holds the JSON contract, so that's all we read.
    const raw = completion.choices[0]?.message?.content ?? "";
    const parsed = JSON.parse(extractJson(raw));
    const result = coerceResult(parsed);
    return result ?? FALLBACK_RESULT;
  } catch {
    return FALLBACK_RESULT;
  }
}
