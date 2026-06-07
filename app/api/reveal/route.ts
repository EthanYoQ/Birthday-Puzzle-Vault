import { NextResponse, type NextRequest } from "next/server";

import { getConfiguredAnswer, getVaultPayload } from "@/lib/env";
import { checkRateLimit } from "@/lib/rate-limit";
import { createRevealPayload } from "@/lib/reveal";
import { isConfiguredAnswer } from "@/lib/normalize";

export const dynamic = "force-dynamic";

function getClientKey(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  return forwardedFor || realIp || "local";
}

export async function POST(request: NextRequest) {
  const limit = checkRateLimit(getClientKey(request));

  if (limit.limited) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many puzzle attempts. Let the vault cool down for a few minutes.",
      },
      { status: 429 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "The vault needs a final phrase.",
      },
      { status: 400 },
    );
  }

  const finalAnswer =
    typeof body === "object" && body && "finalAnswer" in body
      ? String((body as { finalAnswer: unknown }).finalAnswer)
      : "";

  if (!isConfiguredAnswer(finalAnswer, getConfiguredAnswer("level3"))) {
    return NextResponse.json(
      {
        ok: false,
        error: "The vault stays locked. Re-check the final phrase.",
      },
      { status: 400 },
    );
  }

  const vaultPayload = getVaultPayload();

  if (!vaultPayload) {
    return NextResponse.json(
      {
        ok: false,
        error: "Vault configured, but payload not loaded yet.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json(createRevealPayload(vaultPayload));
}
