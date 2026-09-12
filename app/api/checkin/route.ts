import { NextResponse } from "next/server";
import { evaluateCheckIn } from "@/lib/openrouter";
import { patientRecord } from "@/lib/mock-data";
import { CheckInLogEntry } from "@/lib/types";

interface CheckInRequestBody {
  message: string;
  history: CheckInLogEntry[];
}

export async function POST(request: Request) {
  const body = (await request.json()) as CheckInRequestBody;

  if (!body.message || typeof body.message !== "string") {
    return NextResponse.json({ error: "message is required" }, { status: 400 });
  }

  const result = await evaluateCheckIn(patientRecord, body.history ?? [], body.message);
  return NextResponse.json(result);
}
