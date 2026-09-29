"use client";

import * as React from "react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const GlobeWireframe = dynamic(
  () => import("@/components/ui/globe-wireframe"),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-square w-full" aria-hidden="true" />
    ),
  }
);

const smoothEase = [0.25, 0.1, 0.25, 1] as const;

interface ContactLink {
  icon: LucideIcon;
  label: string;
  href?: string;
}

// TODO: replace with the organization's real contact details.
const CONTACT_LINKS: ContactLink[] = [
  {
    icon: Mail,
    label: "info@inspirenigeriachild.org",
    href: "mailto:info@inspirenigeriachild.org",
  },
  {
    icon: Phone,
    label: "+234 (0) 800 000 0000",
    href: "tel:+2348000000000",
  },
  {
    icon: MapPin,
    label: "Yenagoa, Bayelsa State, Nigeria",
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
  const [submitted, setSubmitted] = useState(false);
  const initial = reduceMotion ? false : { opacity: 0, y: 28 };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id={id}
      className={cn("relative w-full overflow-hidden bg-white py-20", className)}
    >
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
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

            <div className="w-full max-w-md">
              <GlobeWireframe
                className="aspect-square w-full"
                autoRotate={!reduceMotion}
                autoRotateSpeed={0.45}
                strokeWidth={0.6}
                graticuleOpacity={0.15}
                strokeColor="rgba(23,23,23,0.55)"
                graticuleColor="rgba(23,23,23,0.4)"
                sphereOutlineColor="rgba(23,23,23,0.3)"
              />
            </div>
          </motion.div>

          <motion.div
            initial={initial}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
            className="flex flex-col gap-5 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8"
          >
            {submitted ? (
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
                  onClick={() => setSubmitted(false)}
                  className="mt-2"
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <h3 className="mb-0.5 text-lg font-semibold text-brand">
                    Send a message
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Fill out the form and we&apos;ll get back to you.
                  </p>
                </div>

                <FormDots />

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
                </div>

                <Button
                  type="submit"
                  className="group h-11 w-fit rounded-xl bg-brand px-8 text-sm font-semibold text-white hover:bg-brand-deep"
                >
                  Submit{" "}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
