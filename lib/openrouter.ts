import OpenAI from "openai";
import { CheckInLogEntry, CheckInResult, PatientRecord, Trend } from "./types";

const MODEL = process.env.OPENROUTER_MODEL ?? "nvidia/nemotron-3-super-120b-a12b:free";

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

VAGUE INPUT: If today's message does not describe a concrete symptom (e.g.
"im bad", "not great", "meh") — set escalate=false and trend="steady", and
make "assessment" a brief, warm, natural clarifying question asking what
specifically feels off (e.g. swelling, pain, mobility, sleep). Never guess a
symptom that wasn't stated, and never fall back to a generic non-answer —
always produce a real, specific clarifying question in this case.

Respond with ONLY a single JSON object. No markdown formatting, no
commentary before or after it, in exactly this shape:
{"assessment": "<one short sentence for the patient>", "escalate": <true or false>, "reasoning": "<one short sentence stating the consecutive-day count and how it maps to the rule>", "trend": "<improving|steady|worsening>"}`;
}

function stripCodeFences(raw: string): string {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  return fenced ? fenced[1].trim() : raw.trim();
}

function extractJsonBlock(text: string): string {
  const match = text.match(/\{[\s\S]*\}/);
  return match ? match[0] : text;
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
    console.log("[openrouter] raw check-in response:", raw);

    const jsonCandidate = extractJsonBlock(stripCodeFences(raw));

    let parsed: unknown;
    try {
      parsed = JSON.parse(jsonCandidate);
    } catch (parseError) {
      console.error(
        "[openrouter] JSON.parse failed on extracted candidate:",
        parseError,
        "\ncandidate was:",
        jsonCandidate
      );
      return FALLBACK_RESULT;
    }

    const result = coerceResult(parsed);
    if (!result) {
      console.error("[openrouter] parsed JSON missing expected fields:", parsed);
      return FALLBACK_RESULT;
    }
    return result;
  } catch (error) {
    console.error("[openrouter] request to OpenRouter failed:", error);
    return FALLBACK_RESULT;
  }
}
