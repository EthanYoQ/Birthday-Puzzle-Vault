import { NextResponse, type NextRequest } from "next/server";

import { getConfiguredAnswer } from "@/lib/env";
import { isConfiguredAnswer } from "@/lib/normalize";

export const dynamic = "force-dynamic";

const allowedSteps = new Set(["gate", "level1", "level2", "level3"]);

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const step =
    typeof body === "object" && body && "step" in body
      ? String((body as { step: unknown }).step)
      : "";
  const answer =
    typeof body === "object" && body && "answer" in body
      ? String((body as { answer: unknown }).answer)
      : "";

  if (!allowedSteps.has(step)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  return NextResponse.json({
    ok: isConfiguredAnswer(answer, getConfiguredAnswer(step)),
  });
}
