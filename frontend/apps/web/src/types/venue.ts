export interface VenueSelection {
  placeId: string | null; // may be stored indefinitely
  name: string; // confirmed by the host
  address: string; // confirmed by the host
  area: string;
  city: string;
  lat: number; // the pin the host confirmed
  lng: number;
  source: "google" | "manual";
}
