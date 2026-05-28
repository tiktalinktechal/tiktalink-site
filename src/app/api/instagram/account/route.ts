import { NextResponse } from "next/server";
import {
  getInstagramAccount,
  publicInstagramError,
  verifyInstagramAdmin,
} from "@/lib/instagram";

export const runtime = "nodejs";

export async function GET(request: Request) {
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

  try {
    const data = await getInstagramAccount();

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
