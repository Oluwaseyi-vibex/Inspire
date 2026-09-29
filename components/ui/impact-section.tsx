import { BentoGridShowcase } from "@/components/ui/bento-grid-showcase";
import { cn } from "@/lib/utils";

const STATES = [
  "Imo",
  "Abia",
  "Akwa Ibom",
  "Cross River",
  "Rivers",
  "Bayelsa",
  "Delta",
  "Edo",
  "Ondo",
];

const FOCUS_AREAS = [
  "Career Paths",
  "Drug Abuse Sensitization",
  "Mental Health",
  "Gender Equality",
  "Talents & Skills",
  "Tech & Digital Skills",
  "Culture & Identity",
];

const FINALE_ACTIVITIES = [
  "Creative art & craft exhibition",
  "Panel discussions & lectures",
  "Concert and awards night",
  "Excursions & games",
];

function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={cn(
        "text-[11px] font-bold uppercase tracking-[0.2em]",
        dark ? "text-white/60" : "text-brand"
      )}
    >
      {children}
    </p>
  );
}

function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:p-7",
        className
      )}
    >
      {children}
    </div>
  );
}

export function ImpactSection() {
  return (
    <section
      id="gallery"
      className="w-full bg-neutral-50 px-6 py-24 md:px-12"
      data-nav-bg="light"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.3em] text-brand">
          19th Edition · 2026
        </p>
        <h2 className="mb-4 text-center font-display text-4xl font-bold text-neutral-900 md:text-5xl">
          Our Impact
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-base leading-relaxed text-neutral-600 md:text-lg">
          A 9-state tour, seven focus areas, and one grand converge in Yenagoa —
          built to reorient values and project young talent.
        </p>

        <BentoGridShowcase
          integrations={
            <Card>
              <Eyebrow>Preliminaries · Oct 12–30</Eyebrow>
              <h3 className="font-display text-2xl font-semibold text-neutral-900">
                Nine States, One Stage
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600">
                State conferences and preliminaries across the Niger Delta.
              </p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {STATES.map((state) => (
                  <span
                    key={state}
                    className="rounded-full bg-neutral-100 px-2.5 py-1 text-[11px] font-semibold text-neutral-700"
                  >
                    {state}
                  </span>
                ))}
              </div>
            </Card>
          }
          mainFeature={
            <Card className="relative overflow-hidden border-neutral-900 bg-neutral-900 text-white shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/inspire/gallery/2024/6.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-neutral-950/75"
              />
              <div className="relative z-10 flex h-full flex-col gap-3">
              <Eyebrow dark>Grand Converge · Yenagoa</Eyebrow>
              <h3 className="font-display text-3xl font-semibold">
                Three Days That Shape Futures
              </h3>
              <p className="text-4xl font-black tracking-tight text-red-400">
                Nov 11–14
              </p>
              <p className="text-sm leading-relaxed text-white/70">
                Finalists from all nine states battle for the top spots in
                each category — essays published in Inspire Magazine, speeches
                live on stage.
              </p>
              <ul className="mt-auto flex flex-col gap-2.5 pt-4">
                {FINALE_ACTIVITIES.map((activity) => (
                  <li
                    key={activity}
                    className="flex items-center gap-2.5 text-sm text-white/80"
                  >
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#d80f12]"
                    />
                    {activity}
                  </li>
                ))}
              </ul>
              </div>
            </Card>
          }
          featureTags={
            <Card>
              <Eyebrow>What We Tackle</Eyebrow>
              <h3 className="font-display text-2xl font-semibold text-neutral-900">
                Seven Focus Areas
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {FOCUS_AREAS.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-brand/25 bg-brand/5 px-2.5 py-1 text-[11px] font-semibold text-brand"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </Card>
          }
          secondaryFeature={
            <Card className="relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/inspire/gallery/2024/1.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover object-top"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-white/85"
              />
              <div className="relative z-10 flex h-full flex-col gap-3">
              <Eyebrow>Essay & Speech</Eyebrow>
              <h3 className="font-display text-2xl font-semibold text-neutral-900">
                “My Niger Delta Dream”
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600">
                Students write and speak on oil theft, spillage, and the
                future they envision — winners represent their states at the
                finale.
              </p>
              </div>
            </Card>
          }
          statistic={
            <Card className="justify-center text-center">
              <Eyebrow>By The Numbers</Eyebrow>
              <div className="flex flex-col gap-5">
                {[
                  { value: "45,000+", label: "Students, teens & parents" },
                  { value: "700+", label: "Schools in the region" },
                  { value: "9", label: "Niger Delta states" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-5xl font-black tracking-tight text-brand">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-neutral-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Card>
          }
          journey={
            <Card className="border-brand/25 bg-brand/[0.04]">
              <Eyebrow>19 Years Strong</Eyebrow>
              <h3 className="font-display text-2xl font-semibold text-neutral-900">
                Conquer Fear! Secured Future!
              </h3>
              <p className="text-sm leading-relaxed text-neutral-600">
                Nineteen editions of guiding adolescents toward positive
                choices and cultural pride.
              </p>
            </Card>
          }
        />
      </div>
    </section>
  );
}

export default ImpactSection;
