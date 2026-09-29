"use client";

import {
  Map,
  MapControls,
  MapMarker,
  MarkerContent,
  MarkerLabel,
  MarkerPopup,
} from "@/components/ui/map";
import { cn } from "@/lib/utils";

interface NigerDeltaState {
  name: string;
  capital: string;
  lng: number;
  lat: number;
  prelim: string;
  host?: boolean;
}

const STATES: NigerDeltaState[] = [
  { name: "Imo", capital: "Owerri", lng: 7.03, lat: 5.48, prelim: "Mon, Oct 12" },
  { name: "Abia", capital: "Umuahia", lng: 7.48, lat: 5.53, prelim: "Wed, Oct 14" },
  { name: "Akwa Ibom", capital: "Uyo", lng: 7.9, lat: 5.02, prelim: "Fri, Oct 16" },
  { name: "Cross River", capital: "Calabar", lng: 8.33, lat: 4.98, prelim: "Mon, Oct 19" },
  { name: "Rivers", capital: "Port Harcourt", lng: 7.05, lat: 4.82, prelim: "Wed, Oct 21" },
  {
    name: "Bayelsa",
    capital: "Yenagoa",
    lng: 6.27,
    lat: 4.93,
    prelim: "Fri, Oct 23",
    host: true,
  },
  { name: "Delta", capital: "Asaba", lng: 6.73, lat: 6.21, prelim: "Mon, Oct 26" },
  { name: "Edo", capital: "Benin City", lng: 5.6, lat: 6.34, prelim: "Wed, Oct 28" },
  { name: "Ondo", capital: "Akure", lng: 5.2, lat: 7.26, prelim: "Fri, Oct 30" },
];

/**
 * Interactive map of the 9 Niger Delta tour states.
 * Bayelsa (Yenagoa) is highlighted as the Grand Converge host city.
 */
export default function NigerDeltaMap({ className }: { className?: string }) {
  return (
    <Map
      theme="light"
      center={[6.8, 5.85]}
      zoom={6}
      className={cn("h-full w-full", className)}
    >
      <MapControls />
      {STATES.map((state) => (
        <MapMarker
          key={state.name}
          longitude={state.lng}
          latitude={state.lat}
        >
          <MarkerContent>
            <span
              aria-hidden="true"
              className={cn(
                "block rounded-full border-2 border-white shadow-lg",
                state.host
                  ? "size-5 bg-brand"
                  : "size-3.5 bg-brand/80"
              )}
            />
            <MarkerLabel position="bottom">
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap shadow",
                  state.host
                    ? "bg-brand text-white"
                    : "bg-white/95 text-neutral-800"
                )}
              >
                {state.name}
              </span>
            </MarkerLabel>
          </MarkerContent>
          <MarkerPopup>
            <div className="space-y-1 px-1 py-0.5">
              <p className="text-sm font-semibold text-neutral-900">
                {state.name} State
              </p>
              <p className="text-xs text-neutral-500">
                {state.capital} · Prelims {state.prelim}
              </p>
              {state.host && (
                <p className="text-xs font-semibold text-brand">
                  Grand Converge host · Yenagoa, Nov 11–14
                </p>
              )}
            </div>
          </MarkerPopup>
        </MapMarker>
      ))}
    </Map>
  );
}
