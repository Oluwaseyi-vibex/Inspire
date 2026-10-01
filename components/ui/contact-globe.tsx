"use client";

import * as React from "react";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  submitEnquiry,
  type EnquiryState,
} from "@/app/actions/contact";

const NigerDeltaMap = dynamic(
  () => import("@/components/ui/niger-delta-map"),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[420px] w-full animate-pulse rounded-2xl bg-neutral-100"
        aria-hidden="true"
      />
    ),
  }
);

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

interface ContactLink {
  icon: LucideIcon;
  label: string;
  href?: string;
}

const CONTACT_LINKS: ContactLink[] = [
  {
    icon: Phone,
    label: "0903 782 8213",
    href: "tel:+2349037828213",
  },
  {
    icon: Phone,
    label: "0707 447 4229",
    href: "tel:+2347074474229",
  },
  {
    icon: Mail,
    label: "info@inspirenigerianchild.org",
    href: "mailto:info@inspirenigerianchild.org",
  },
  {
    icon: MapPin,
    label: "Yenagoa, Bayelsa State, Nigeria",
  },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Inspire-Nigeria-Child-official/100079960248113/",
    path: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com/inspirenigeriachild",
    path: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </>
    ),
  },
];

function FormDots({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden",
        className
      )}
    >
      <div className="relative h-4 w-full">
        <div
          className="absolute inset-0 bg-repeat text-neutral-300"
          style={{
            backgroundImage:
              "radial-gradient(circle, currentColor 0.8px, transparent 0.8px)",
            backgroundSize: "6px 100%",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        />
      </div>
    </div>
  );
}

const inputClassName =
  "w-full rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 outline-none transition-all duration-200 focus:border-brand focus:ring-2 focus:ring-brand/20";

const labelClassName =
  "text-xs font-semibold uppercase tracking-widest text-brand";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="group h-11 w-fit rounded-xl bg-brand px-8 text-sm font-semibold text-white hover:bg-brand-deep disabled:opacity-70"
    >
      {pending ? (
        <>
          Sending{" "}
          <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
        </>
      ) : (
        <>
          Submit{" "}
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          />
        </>
      )}
    </Button>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="text-xs font-medium text-brand">{message}</p>;
}

function EnquiryFormCard({
  initial,
  onResetKey,
}: {
  initial: false | { opacity: number; y: number };
  onResetKey: () => void;
}) {
  const [state, formAction] = useActionState<EnquiryState, FormData>(
    submitEnquiry,
    { ok: false }
  );
  const fieldErrors = state.fieldErrors ?? {};

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
      className="flex flex-col gap-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8"
    >
      {state.ok ? (
        <div
          role="status"
          className="flex min-h-96 flex-col items-center justify-center gap-3 text-center"
        >
          <CheckCircle2
            aria-hidden="true"
            className="h-12 w-12 text-brand"
          />
          <h3 className="font-display text-xl font-semibold text-neutral-900">
            Message received
          </h3>
          <p className="max-w-xs text-sm leading-relaxed text-neutral-600">
            Thank you for reaching out. Our team will get back to you
            shortly.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={onResetKey}
            className="mt-2"
          >
            Send another message
          </Button>
        </div>
      ) : (
        <form action={formAction} className="flex flex-col gap-5">
          <div>
            <h3 className="mb-0.5 text-lg font-semibold text-brand">
              Send a message
            </h3>
            <p className="text-sm text-neutral-600">
              Fill out the form and we&apos;ll get back to you.
            </p>
          </div>

          <FormDots />

          {state.error && (
            <p
              role="alert"
              className="rounded-xl border border-brand/30 bg-brand/5 px-4 py-3 text-sm font-medium text-brand"
            >
              {state.error}
            </p>
          )}

          {/* Honeypot — invisible to humans, catches bots. */}
          <div
            aria-hidden="true"
            className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
          >
            <label>
              Website
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-name" className={labelClassName}>
                Full Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Your Name"
                className={inputClassName}
              />
              <FieldError message={fieldErrors.name} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-phone" className={labelClassName}>
                Phone <span className="font-normal">(optional)</span>
              </label>
              <input
                id="contact-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                placeholder="+234 ..."
                className={inputClassName}
              />
              <FieldError message={fieldErrors.phone} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-email" className={labelClassName}>
              Email Address
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="you@example.com"
              className={inputClassName}
            />
            <FieldError message={fieldErrors.email} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-message" className={labelClassName}>
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              placeholder="Type your message here"
              rows={4}
              className={`${inputClassName} resize-none py-3`}
            />
            <FieldError message={fieldErrors.message} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-neutral-600">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
              />
              I consent to Inspire Nigeria Child storing my details to
              respond to this enquiry.
            </label>
            <FieldError message={fieldErrors.consent} />
          </div>

          <SubmitButton />
        </form>
      )}
    </motion.div>
  );
}

interface ContactWithGlobeProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  className?: string;
}

export default function ContactWithGlobe({
  title = "Contact us",
  description = "Questions about the conference, invitations, or partnerships? Reach out — we'd love to hear from you.",
  className,
  id,
}: ContactWithGlobeProps) {
  const reduceMotion = useReducedMotion();
  const [formKey, setFormKey] = useState(0);
  const initial = reduceMotion ? false : { opacity: 0, y: 28 };

  return (
    <section
      id={id}
      className={cn("relative w-full overflow-hidden bg-white py-20", className)}
    >
      {/* Creative backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-10%] h-[480px] w-[480px] rounded-full bg-brand/[0.07] blur-[110px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-[#fecb15]/[0.12] blur-[110px]" />
        <div
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
          style={{
            backgroundSize: "56px 56px",
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
          }}
        />
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[20vw] font-black leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(0,0,0,0.07)]">
          CONTACT
        </div>
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <motion.h2
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5 }}
            className="mb-6 text-center font-display text-4xl font-bold text-neutral-900 md:text-5xl"
          >
            {title}
          </motion.h2>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: smoothEase }}
            className="mb-6 max-w-lg text-base leading-relaxed text-neutral-600 md:text-lg"
          >
            {description}
          </motion.p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-10 lg:grid-cols-2">
          <motion.div
            initial={initial}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: smoothEase }}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-1">
              <h3 className="mb-3 font-display text-2xl font-semibold text-neutral-900">
                Get in touch
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
                Join us in supporting children across the Niger Delta.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {CONTACT_LINKS.map(({ icon: Icon, label, href }, i) => {
                const content = (
                  <>
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-brand/20 bg-brand/5 transition-all duration-200 group-hover:border-brand/40 group-hover:bg-brand/10">
                      <Icon
                        aria-hidden="true"
                        className="h-3.5 w-3.5 text-brand"
                      />
                    </div>
                    {label}
                  </>
                );
                const linkClassName =
                  "group flex min-h-[44px] w-fit items-center gap-3 text-sm text-neutral-800 transition-colors duration-200 hover:text-brand";
                return href ? (
                  <motion.a
                    key={label}
                    href={href}
                    initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + i * 0.1,
                      ease: smoothEase,
                    }}
                    className={linkClassName}
                  >
                    {content}
                  </motion.a>
                ) : (
                  <motion.span
                    key={label}
                    initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + i * 0.1,
                      ease: smoothEase,
                    }}
                    className={linkClassName}
                  >
                    {content}
                  </motion.span>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
                Follow us
              </p>
              {SOCIAL_LINKS.map(({ label, href, path }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Inspire Nigeria Child on ${label}`}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: smoothEase }}
                  className="group flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white transition-all duration-200 hover:border-brand hover:bg-brand"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5 text-neutral-700 transition-colors duration-200 group-hover:text-white"
                  >
                    {path}
                  </svg>
                </motion.a>
              ))}
            </div>

            <div className="h-[420px] w-full overflow-hidden rounded-2xl border border-neutral-200 shadow-sm">
              <NigerDeltaMap />
            </div>
            <p className="text-xs text-neutral-500">
              The 9-state preliminaries tour — click a marker for details.
              Bayelsa hosts the Grand Converge.
            </p>
          </motion.div>

          <EnquiryFormCard key={formKey} initial={initial} onResetKey={() => setFormKey((k) => k + 1)} />


        </div>
      </div>
    </section>
  );
}
