"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { APIProvider, AdvancedMarker, Map, useMapsLibrary } from "@vis.gl/react-google-maps";
import { ExternalLink, MapPin, X } from "lucide-react";
import { type CityConfig, inBounds, liveCities } from "@/config/cities";
import type { VenueSelection } from "@/types/venue";

const SPORTS_TYPES = ["sports_complex", "sports_club", "stadium", "gym"];
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID ?? "DEMO_MAP_ID";
const field =
  "h-10 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-hotpink/30 focus:outline-none focus:ring-1 focus:ring-hotpink/40";

type Picked = Omit<VenueSelection, "city" | "source">;

function VenueSearch({
  city,
  sportsOnly,
  onPick,
  onError,
}: {
  city: CityConfig;
  sportsOnly: boolean;
  onPick: (v: Picked) => void;
  onError: (m: string) => void;
}) {
  const places = useMapsLibrary("places");
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!places || !host.current) return;

    try {
      const PlaceAutocompleteClass = places.PlaceAutocompleteElement || (window.google?.maps?.places as unknown as { PlaceAutocompleteElement: new (opts: unknown) => HTMLElement })?.PlaceAutocompleteElement;

      if (!PlaceAutocompleteClass) {
        return;
      }

      const el = new PlaceAutocompleteClass({
        includedRegionCodes: ["in"],
        includedPrimaryTypes: sportsOnly ? SPORTS_TYPES : [],
        locationRestriction: city.bounds,
      });

      (el as unknown as { placeholder: string }).placeholder = `Search venues in ${city.name}`;
      host.current.replaceChildren(el);

      const onSelect = async (e: Event) => {
        try {
          const { placePrediction } = e as unknown as {
            placePrediction: {
              toPlace: () => {
                fetchFields: (o: { fields: string[] }) => Promise<void>;
                location?: { lat: () => number; lng: () => number };
                addressComponents?: Array<{ types: string[]; longText?: string }>;
                id?: string;
                displayName?: string;
                formattedAddress?: string;
              };
            };
          };
          const place = placePrediction.toPlace();
          await place.fetchFields({
            fields: ["id", "displayName", "formattedAddress", "location", "addressComponents"],
          });

          if (!place.location) {
            return onError("We could not read that place. Please try another.");
          }

          const comp = place.addressComponents ?? [];
          const area =
            comp.find((c: { types: string[]; longText?: string }) => c.types.includes("sublocality_level_1") || c.types.includes("sublocality"))?.longText ??
            comp.find((c: { types: string[]; longText?: string }) => c.types.includes("locality"))?.longText ??
            city.name;

          onPick({
            placeId: place.id ?? null,
            name: place.displayName ?? "",
            address: place.formattedAddress ?? "",
            area,
            lat: place.location.lat(),
            lng: place.location.lng(),
          });
        } catch {
          onError("Could not load details for that venue. Please try entering it manually.");
        }
      };

      const onFail = () => onError("Search is unavailable right now. Please enter the venue manually.");

      el.addEventListener("gmp-select", onSelect);
      el.addEventListener("gmp-error", onFail);

      return () => {
        el.removeEventListener("gmp-select", onSelect);
        el.removeEventListener("gmp-error", onFail);
        el.remove();
      };
    } catch {
      onError("Search component initialization failed. Please use manual entry.");
    }
  }, [places, city, sportsOnly, onPick, onError]);

  return <div ref={host} className="min-h-10" />;
}

interface Props {
  city: CityConfig;
  value: VenueSelection | null;
  onChange: (v: VenueSelection | null) => void;
}

function Inner({ city, value, onChange }: Props) {
  const [sportsOnly, setSportsOnly] = useState(true);
  const [manual, setManual] = useState(false);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState({
    name: "",
    address: "",
    area: "",
    lat: 0,
    lng: 0,
    pinned: false,
  });

  const live = liveCities()
    .map((c) => c.name)
    .join(", ");
  const outside = `That spot is outside ${city.name}. Gelavu is live in ${live} for now.`;

  const accept = useCallback(
    (v: Picked) => {
      if (!inBounds(v.lat, v.lng, city.bounds)) return setError(outside);
      setError("");
      onChange({ ...v, city: city.name, source: "google" });
    },
    [city, onChange, outside]
  );

  const fail = useCallback((m: string) => setError(m), []);

  if (value) {
    const link = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value.name)}${
      value.placeId ? `&query_place_id=${value.placeId}` : ""
    }`;

    return (
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5">
          <div className="flex min-w-0 items-start gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-hotpink/40 bg-hotpink/10 text-hotpink">
              <MapPin className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-slate-900">{value.name}</p>
              <p className="mt-0.5 text-[11px] leading-snug text-slate-500">{value.address}</p>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-slate-700 underline underline-offset-2 hover:text-hotpink"
              >
                Open in Google Maps <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-slate-800 hover:text-hotpink cursor-pointer"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" /> Change
          </button>
        </div>

        <div className="h-56 overflow-hidden rounded-xl border border-slate-200">
          <Map
            key={value.placeId ?? value.name}
            defaultCenter={{ lat: value.lat, lng: value.lng }}
            defaultZoom={17}
            mapId={MAP_ID}
            gestureHandling="cooperative"
            disableDefaultUI
            zoomControl
          >
            <AdvancedMarker
              position={{ lat: value.lat, lng: value.lng }}
              draggable
              onDragEnd={(e) => {
                const p = e.latLng;
                if (!p) return;
                if (!inBounds(p.lat(), p.lng(), city.bounds)) return setError(outside);
                setError("");
                onChange({ ...value, lat: p.lat(), lng: p.lng() });
              }}
            />
          </Map>
        </div>
        <p className="text-[11px] text-slate-400">
          Drag the pin to the exact entrance so players find you easily.
        </p>
        {error && (
          <p role="alert" className="text-[11px] font-semibold text-rose-700">
            {error}
          </p>
        )}
        {value.source === "manual" && (
          <p className="text-[11px] text-navy bg-hotpink/10 p-2 rounded-lg border border-hotpink/40">
            This venue was entered manually. Our team checks it before your tournament goes live.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {!manual ? (
        <>
          <VenueSearch city={city} sportsOnly={sportsOnly} onPick={accept} onError={fail} />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-500">
            <label className="inline-flex cursor-pointer items-center gap-1.5">
              <input
                type="checkbox"
                checked={!sportsOnly}
                onChange={(e) => setSportsOnly(!e.target.checked)}
                className="accent-slate-950"
              />
              Search all places, not only sports venues
            </label>
            <button
              type="button"
              onClick={() => setManual(true)}
              className="font-bold text-slate-800 underline underline-offset-2 hover:text-hotpink cursor-pointer"
            >
              Can’t find it? Enter manually
            </button>
          </div>
        </>
      ) : (
        <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
          <input
            className={field}
            placeholder="Venue name"
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
          />
          <input
            className={field}
            placeholder="Full address"
            value={draft.address}
            onChange={(e) => setDraft({ ...draft, address: e.target.value })}
          />
          <input
            className={field}
            placeholder="Area (for example Indiranagar)"
            value={draft.area}
            onChange={(e) => setDraft({ ...draft, area: e.target.value })}
          />
          <div className="h-56 overflow-hidden rounded-xl border border-slate-200">
            <Map
              defaultCenter={city.center}
              defaultZoom={12}
              mapId={MAP_ID}
              gestureHandling="cooperative"
              disableDefaultUI
              zoomControl
              onClick={(e) => {
                const p = e.detail.latLng;
                if (!p) return;
                if (!inBounds(p.lat, p.lng, city.bounds)) return setError(outside);
                setError("");
                setDraft((d) => ({ ...d, lat: p.lat, lng: p.lng, pinned: true }));
              }}
            >
              {draft.pinned && <AdvancedMarker position={{ lat: draft.lat, lng: draft.lng }} />}
            </Map>
          </div>
          <p className="text-[11px] text-slate-500">Tap the map to place the pin on the venue.</p>
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setManual(false);
                setError("");
              }}
              className="text-xs font-bold text-slate-700 underline underline-offset-2 cursor-pointer"
            >
              Back to search
            </button>
            <button
              type="button"
              disabled={
                !draft.name.trim() || !draft.address.trim() || !draft.area.trim() || !draft.pinned
              }
              onClick={() =>
                onChange({
                  placeId: null,
                  name: draft.name.trim(),
                  address: draft.address.trim(),
                  area: draft.area.trim(),
                  city: city.name,
                  lat: draft.lat,
                  lng: draft.lng,
                  source: "manual",
                })
              }
              className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold text-white disabled:opacity-40 cursor-pointer"
            >
              Use this venue
            </button>
          </div>
        </div>
      )}
      {error && (
        <p role="alert" className="text-[11px] font-semibold text-rose-700">
          {error}
        </p>
      )}
    </div>
  );
}

function FallbackManualPicker({ city, value, onChange }: Props) {
  const [draft, setDraft] = useState({
    name: value?.name || "Play9 Badminton Arena",
    address: value?.address || "Sarjapur Main Rd, Doddakannelli",
    area: value?.area || "Sarjapur",
  });

  if (value) {
    return (
      <div className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3.5">
        <div className="flex min-w-0 items-start gap-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-hotpink/40 bg-hotpink/10 text-hotpink">
            <MapPin className="h-4 w-4" aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-slate-900">{value.name}</p>
            <p className="mt-0.5 text-[11px] leading-snug text-slate-500">{value.address}</p>
            <span className="inline-block mt-1 text-[10px] text-navy bg-hotpink/10 px-2 py-0.5 rounded border border-hotpink/40">
              Manual entry · verified by team
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onChange(null)}
          className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-slate-800 hover:text-hotpink cursor-pointer"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" /> Change
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3 rounded-xl border border-slate-200 bg-slate-50 p-3.5">
      <div className="rounded-lg bg-hotpink/10/80 border border-hotpink/40 p-2.5 text-[11px] text-navy">
        Google Maps API key not configured yet. Add <code className="bg-hotpink/15 px-1 py-0.5 rounded font-mono text-[10px]">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code> to <code className="bg-hotpink/15 px-1 py-0.5 rounded font-mono text-[10px]">.env.local</code> for live Places search. You can enter venue details directly below:
      </div>
      <input
        className={field}
        placeholder="Venue name (e.g. Play9 Badminton Arena)"
        value={draft.name}
        onChange={(e) => setDraft({ ...draft, name: e.target.value })}
      />
      <input
        className={field}
        placeholder="Full address (e.g. Sarjapur Main Rd, Doddakannelli)"
        value={draft.address}
        onChange={(e) => setDraft({ ...draft, address: e.target.value })}
      />
      <input
        className={field}
        placeholder="Area (e.g. Sarjapur / Indiranagar)"
        value={draft.area}
        onChange={(e) => setDraft({ ...draft, area: e.target.value })}
      />
      <div className="flex items-center justify-end">
        <button
          type="button"
          disabled={!draft.name.trim() || !draft.address.trim()}
          onClick={() =>
            onChange({
              placeId: null,
              name: draft.name.trim(),
              address: draft.address.trim(),
              area: draft.area.trim() || city.name,
              city: city.name,
              lat: city.center.lat,
              lng: city.center.lng,
              source: "manual",
            })
          }
          className="rounded-full bg-slate-950 px-4 py-2 text-xs font-semibold text-white disabled:opacity-40 cursor-pointer"
        >
          Confirm Venue
        </button>
      </div>
    </div>
  );
}

export function VenuePicker(props: Props) {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!key) {
    return <FallbackManualPicker {...props} />;
  }

  return (
    <APIProvider apiKey={key}>
      <Inner {...props} />
    </APIProvider>
  );
}
