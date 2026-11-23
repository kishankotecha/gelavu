"use client";

import React, { useState, useId } from "react";
import { MapPin, Search, Star, ExternalLink, Check, Navigation, Building2 } from "lucide-react";

export interface BadmintonCourtVenue {
  id: string;
  name: string;
  address: string;
  area: string;
  city: string;
  rating: number;
  reviewsCount: number;
  courtsCount: number;
  courtType: string;
  lat: number;
  lng: number;
  mapPlaceUrl: string;
}

export const POPULAR_BADMINTON_VENUES: BadmintonCourtVenue[] = [
  {
    id: "v-play9",
    name: "Play9 Badminton Arena",
    address: "Off Sarjapur Main Rd, Carmelaram, Janatha Colony, Doddakannelli",
    area: "Sarjapur Road",
    city: "Bengaluru",
    rating: 4.8,
    reviewsCount: 1420,
    courtsCount: 8,
    courtType: "BWF Standard Synthetic Mats",
    lat: 12.8988,
    lng: 77.6824,
    mapPlaceUrl: "https://maps.google.com/?q=Play9+Badminton+Arena+Sarjapur",
  },
  {
    id: "v-smashbounce",
    name: "SmashBounce Badminton Academy",
    address: "14th Main Rd, Sector 2, HSR Layout",
    area: "HSR Layout",
    city: "Bengaluru",
    rating: 4.7,
    reviewsCount: 980,
    courtsCount: 6,
    courtType: "Wooden Floating Surface with Yonex Mats",
    lat: 12.9121,
    lng: 77.6446,
    mapPlaceUrl: "https://maps.google.com/?q=SmashBounce+Badminton+HSR+Layout",
  },
  {
    id: "v-koramangala",
    name: "Koramangala Indoor Badminton Stadium",
    address: "80 Feet Rd, 4th Block, Koramangala",
    area: "Koramangala",
    city: "Bengaluru",
    rating: 4.6,
    reviewsCount: 2310,
    courtsCount: 6,
    courtType: "Synthetic Badminton Mats",
    lat: 12.9352,
    lng: 77.6245,
    mapPlaceUrl: "https://maps.google.com/?q=Koramangala+Indoor+Stadium",
  },
  {
    id: "v-cse",
    name: "Padukone-Dravid Centre for Sports Excellence (CSE)",
    address: "Survey No 336, Bettahalasuru, Jala Hobli, Yelahanka",
    area: "Yelahanka",
    city: "Bengaluru",
    rating: 4.9,
    reviewsCount: 3840,
    courtsCount: 16,
    courtType: "International Tournament Grade Wooden + Li-Ning Mats",
    lat: 13.1415,
    lng: 77.6189,
    mapPlaceUrl: "https://maps.google.com/?q=Padukone+Dravid+Centre+for+Sports+Excellence",
  },
  {
    id: "v-whitepeacock",
    name: "White Peacock Badminton Academy",
    address: "Near ITPL, Inner Circle, Whitefield",
    area: "Whitefield",
    city: "Bengaluru",
    rating: 4.7,
    reviewsCount: 1120,
    courtsCount: 10,
    courtType: "BWF Approved Cushion Wooden Courts",
    lat: 12.9698,
    lng: 77.7499,
    mapPlaceUrl: "https://maps.google.com/?q=White+Peacock+Badminton+Whitefield",
  },
  {
    id: "v-feathertouch",
    name: "Feather Touch Sports Arena",
    address: "Outer Ring Rd, Marathahalli - Sarjapur Junction",
    area: "Marathahalli",
    city: "Bengaluru",
    rating: 4.7,
    reviewsCount: 1540,
    courtsCount: 8,
    courtType: "Synthetic Courts with High Lux LED Lighting",
    lat: 12.9372,
    lng: 77.6945,
    mapPlaceUrl: "https://maps.google.com/?q=Feather+Touch+Sports+Arena+Bengaluru",
  },
  {
    id: "v-surakhsha",
    name: "Surakhsha Badminton Academy",
    address: "12th Main Rd, HAL 2nd Stage, Indiranagar",
    area: "Indiranagar",
    city: "Bengaluru",
    rating: 4.6,
    reviewsCount: 840,
    courtsCount: 4,
    courtType: "Teak Wood Flooring with Pro Mats",
    lat: 12.9784,
    lng: 77.6408,
    mapPlaceUrl: "https://maps.google.com/?q=Surakhsha+Badminton+Indiranagar",
  },
];

interface Props {
  selectedVenue: BadmintonCourtVenue | null;
  onSelectVenue: (venue: BadmintonCourtVenue) => void;
  customVenueName: string;
  onCustomVenueNameChange: (name: string) => void;
  customAddress: string;
  onCustomAddressChange: (addr: string) => void;
}

export function GoogleCourtLocationPicker({
  selectedVenue,
  onSelectVenue,
  customVenueName,
  onCustomVenueNameChange,
  customAddress,
  onCustomAddressChange,
}: Props) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const inputId = useId();

  const filteredVenues = POPULAR_BADMINTON_VENUES.filter((v) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      v.name.toLowerCase().includes(q) ||
      v.area.toLowerCase().includes(q) ||
      v.address.toLowerCase().includes(q) ||
      v.city.toLowerCase().includes(q)
    );
  });

  const handleChoose = (venue: BadmintonCourtVenue) => {
    onSelectVenue(venue);
    setQuery("");
    setIsOpen(false);
    setIsCustomMode(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label htmlFor={inputId} className="text-xs font-bold uppercase tracking-wider text-[#475569] flex items-center gap-1.5">
          <MapPin className="w-4 h-4 text-[#1D4A38]" />
          <span>Badminton Court / Arena (Google Maps Search)</span>
        </label>
        <button
          type="button"
          onClick={() => {
            setIsCustomMode(!isCustomMode);
            if (!isCustomMode) {
              setQuery("");
            }
          }}
          className="text-[11px] font-bold text-[#1D4A38] hover:underline transition-colors cursor-pointer"
        >
          {isCustomMode ? "← Search Google Maps Venues" : "+ Enter Custom Court Location"}
        </button>
      </div>

      {!isCustomMode ? (
        <div className="relative">
          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              id={inputId}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Search verified badminton courts (e.g. Play9, SmashBounce, CSE Yelahanka)..."
              className="w-full h-12 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] pl-10 pr-4 text-sm text-[#1E293B] placeholder:text-[#94A3B8] focus:border-[#1D4A38] focus:outline-none focus:ring-1 focus:ring-[#1D4A38] transition-colors"
            />
          </div>

          {/* Autocomplete Dropdown */}
          {isOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setIsOpen(false)}
                aria-hidden="true"
              />
              <div className="absolute left-0 right-0 top-full mt-2 z-30 max-h-80 overflow-y-auto rounded-2xl border border-[#D5D9CE] bg-white shadow-xl divide-y divide-[#EEF0E8]">
                <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#64748B] bg-[#F9FAF6] flex items-center justify-between">
                  <span>Verified Google Maps Badminton Arenas in Bengaluru</span>
                  <span className="text-[10px] text-[#1D4A38] font-bold">{filteredVenues.length} available</span>
                </div>

                {filteredVenues.length > 0 ? (
                  filteredVenues.map((v) => {
                    const isSelected = selectedVenue?.id === v.id;
                    return (
                      <button
                        key={v.id}
                        type="button"
                        onClick={() => handleChoose(v)}
                        className={`w-full text-left p-3.5 transition-colors flex items-start gap-3 hover:bg-[#F5F6F0] cursor-pointer ${
                          isSelected ? "bg-[#E8EFEA] border-l-2 border-[#1D4A38]" : ""
                        }`}
                      >
                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#E8EFEA] text-[#1D4A38] mt-0.5">
                          <Building2 className="w-4 h-4" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#1E293B] text-sm truncate">{v.name}</span>
                            <span className="flex items-center gap-1 text-[11px] text-amber-600 font-bold shrink-0">
                              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                              {v.rating} ({v.reviewsCount})
                            </span>
                          </div>
                          <p className="text-xs text-[#64748B] truncate mt-0.5">{v.address}</p>
                          <div className="flex flex-wrap gap-2 mt-1 text-[10px]">
                            <span className="rounded-md bg-[#F0F2EB] border border-[#E2E6DD] px-2 py-0.5 text-[#1D4A38] font-semibold">
                              {v.courtsCount} courts · {v.courtType}
                            </span>
                            <span className="rounded-md bg-[#F0F2EB] border border-[#E2E6DD] px-2 py-0.5 text-[#64748B]">
                              {v.area}
                            </span>
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#1D4A38] shrink-0 self-center" />}
                      </button>
                    );
                  })
                ) : (
                  <div className="p-6 text-center text-sm text-[#64748B]">
                    <p>No matching badminton courts found on Google Maps.</p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsCustomMode(true);
                        setIsOpen(false);
                      }}
                      className="mt-2 text-xs font-bold text-[#1D4A38] underline cursor-pointer"
                    >
                      Enter custom venue details manually
                    </button>
                  </div>
                )}
              </div>
            </>
          )}

          {/* Selected Court Preview Card */}
          {selectedVenue && (
            <div className="mt-3 overflow-hidden rounded-2xl border border-[#E2E6DD] bg-white shadow-xs">
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#E8EFEA] border border-[#C5D5CA] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#1D4A38]">
                      Google Maps Verified
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-600">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {selectedVenue.rating} ({selectedVenue.reviewsCount} reviews)
                    </span>
                  </div>
                  <h4 className="text-base font-black text-[#1E293B]">{selectedVenue.name}</h4>
                  <p className="text-xs text-[#475569] flex items-center gap-1.5">
                    <Navigation className="w-3.5 h-3.5 text-[#1D4A38] shrink-0" />
                    <span>{selectedVenue.address}</span>
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1 text-xs">
                    <span className="rounded-md bg-[#F0F2EB] px-2 py-0.5 border border-[#E2E6DD] font-semibold text-[#1E293B]">
                      🏸 {selectedVenue.courtsCount} Courts
                    </span>
                    <span className="rounded-md bg-[#F0F2EB] px-2 py-0.5 border border-[#E2E6DD] text-[#64748B]">
                      {selectedVenue.courtType}
                    </span>
                    <span className="rounded-md bg-[#F0F2EB] px-2 py-0.5 border border-[#E2E6DD] text-[#64748B]">
                      📍 GPS: {selectedVenue.lat.toFixed(4)}, {selectedVenue.lng.toFixed(4)}
                    </span>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center gap-2 shrink-0">
                  <a
                    href={selectedVenue.mapPlaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3.5 py-2 text-xs font-bold text-[#1E293B] hover:bg-[#EEF1EB] transition-colors"
                  >
                    <span>View on Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#1D4A38]" />
                  </a>
                  <button
                    type="button"
                    onClick={() => onSelectVenue(POPULAR_BADMINTON_VENUES[0])}
                    className="text-[11px] text-[#64748B] hover:text-[#1E293B] underline cursor-pointer"
                  >
                    Choose another
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Custom Location Mode */
        <div className="space-y-4 p-4 rounded-2xl border border-[#E2E6DD] bg-white">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#1E293B]">Manual / Private Venue Entry</span>
            <span className="text-[10px] text-[#64748B]">Club, apartment court or private arena</span>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#475569]">Venue Name</label>
            <input
              type="text"
              value={customVenueName}
              onChange={(e) => onCustomVenueNameChange(e.target.value)}
              placeholder="e.g. Prestige Greenwoods Badminton Court"
              className="mt-1 w-full h-10 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3 text-sm text-[#1E293B] focus:border-[#1D4A38] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#475569]">Full Address & Landmark</label>
            <input
              type="text"
              value={customAddress}
              onChange={(e) => onCustomAddressChange(e.target.value)}
              placeholder="e.g. Clubhouse Block B, Outer Ring Road, Bellandur, Bengaluru"
              className="mt-1 w-full h-10 rounded-xl border border-[#D5D9CE] bg-[#F9FAF6] px-3 text-sm text-[#1E293B] focus:border-[#1D4A38] focus:outline-none"
              required
            />
          </div>
        </div>
      )}
    </div>
  );
}
