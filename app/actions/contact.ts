"use server";

import { Senviok, ApiError } from "senviok";
import { z } from "zod";
import { headers } from "next/headers";

const INBOX = "info@inspirenigerianchild.org";
const FROM = "info@inspirenigerianchild.org";
const FROM_NAME = "Inspire Website";

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please tell us your name.").max(100),
  email: z.string().trim().toLowerCase().email("Please enter a valid email address."),
  phone: z.string().trim().max(30).optional(),
  message: z
    .string()
    .trim()
    .min(10, "Please write a little more (10+ characters).")
    .max(2000, "Please keep your message under 2000 characters."),
  consent: z.literal("on", {
    error: "Please consent so we can respond to you.",
  }),
  // Honeypot — real users never fill this.
  website: z.string().max(0).optional(),
});

// Best-effort in-memory rate limit: 5 submissions / 10 min per IP.
const submissions = new Map<string, number[]>();
function isRateLimited(ip: string) {
  const now = Date.now();
  const windowStart = now - 10 * 60 * 1000;
  const recent = (submissions.get(ip) ?? []).filter((t) => t > windowStart);
  if (recent.length >= 5) return true;
  recent.push(now);
  submissions.set(ip, recent);
  return false;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export interface EnquiryState {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
}

export async function submitEnquiry(
  _prevState: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  const parsed = enquirySchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") || undefined,
    message: formData.get("message"),
    consent: formData.get("consent"),
    website: formData.get("website") || undefined,
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, fieldErrors, error: "Please fix the highlighted fields." };
  }

  // Bots fill the honeypot: pretend success, send nothing.
  if (parsed.data.website) return { ok: true };

  const headerList = await headers();
  const ip =
    headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return {
      ok: false,
      error: "Too many messages sent. Please try again in a few minutes.",
    };
  }

  const apiKey = process.env.SENviOK_API_KEY;
  if (!apiKey) {
    console.error("submitEnquiry: SENviOK_API_KEY is not configured.");
    return {
      ok: false,
      error: "Messaging is temporarily unavailable. Please call us instead.",
    };
  }

  const { name, email, phone, message } = parsed.data;
  const textBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone ? `Phone: ${phone}` : null,
    "",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");
  const htmlBody = `
    <h2>New website enquiry</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}
    <hr />
    <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
  `;

  try {
    const senviok = new Senviok(apiKey);
    await senviok.emails.send({
      from: FROM,
      fromName: FROM_NAME,
      to: INBOX,
      replyTo: email,
      subject: `New website enquiry from ${name}`,
      html: htmlBody,
      text: textBody,
    });
    return { ok: true };
  } catch (error) {
    console.error("submitEnquiry: Senviok send failed.", error);
    if (error instanceof ApiError && error.status === 429) {
      return {
        ok: false,
        error: "Too many messages sent. Please try again in a few minutes.",
      };
    }
    if (error instanceof ApiError && (error.status === 401 || error.status === 403)) {
      console.error(
        "submitEnquiry: Senviok rejected the API key. Check that SENviOK_API_KEY is the complete live key and the dev server was restarted after setting it."
      );
    }
    return {
      ok: false,
      error: "Something went wrong sending your message. Please try again or call us.",
    };
  }
}
