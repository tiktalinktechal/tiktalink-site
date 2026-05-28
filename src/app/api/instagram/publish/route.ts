import { NextResponse } from "next/server";
import {
  publicInstagramError,
  publishInstagramImage,
  validateInstagramPayload,
  verifyInstagramAdmin,
  type InstagramPublishInput,
} from "@/lib/instagram";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const admin = verifyInstagramAdmin(request);

  if (!admin.ok) {
    return NextResponse.json(
      {
        ok: false,
        provider: "instagram",
        requestId,
        error: {
          code: admin.error,
          message: admin.error,
          status: admin.status,
        },
      },
      { status: admin.status }
    );
  }

  let payload: Partial<InstagramPublishInput>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      {
        ok: false,
        provider: "instagram",
        requestId,
        error: {
          code: "invalid_json",
          message: "Invalid JSON payload.",
          status: 400,
        },
      },
      { status: 400 }
    );
  }

  const validation = validateInstagramPayload(payload);

  if (!validation.ok) {
    return NextResponse.json(
      {
        ok: false,
        provider: "instagram",
        requestId,
        error: {
          code: "validation_failed",
          message: "Instagram publish payload validation failed.",
          status: 400,
          details: validation.errors,
        },
      },
      { status: 400 }
    );
  }

  try {
    const data = await publishInstagramImage(validation.value);

    return NextResponse.json({
      ok: true,
      provider: "instagram",
      requestId,
      data,
    });
  } catch (error) {
    const safeError = publicInstagramError(error);

    return NextResponse.json(
      {
        ok: false,
        provider: "instagram",
        requestId,
        error: safeError,
      },
      { status: safeError.status }
    );
  }
}
