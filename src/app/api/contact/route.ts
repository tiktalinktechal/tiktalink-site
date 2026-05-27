import { NextResponse } from "next/server";
import { validateContactPayload, type ContactPayload } from "@/lib/contactValidation";
import { getClientFingerprintHeaders } from "@/lib/security";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: Partial<ContactPayload>;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, errors: ["invalid_json"] }, { status: 400 });
  }

  const validation = validateContactPayload(payload);
  const requestContext = getClientFingerprintHeaders(request);

  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, errors: validation.errors, context: { country: requestContext.country } },
      { status: 400 }
    );
  }

  const emailServiceConfigured = Boolean(
    process.env.RESEND_API_KEY &&
      process.env.CONTACT_TO_EMAIL &&
      process.env.CONTACT_FROM_EMAIL
  );

  if (!emailServiceConfigured) {
    return NextResponse.json({
      ok: true,
      mode: "validated-placeholder",
      status: "contact_payload_validated_email_delivery_not_configured",
    });
  }

  return NextResponse.json({
    ok: true,
    mode: "email-service-ready",
    status: "email_service_configuration_detected",
  });
}
