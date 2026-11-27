export type CityStatus = "live" | "soon";

export interface CityConfig {
  id: string;
  name: string;
  state: string;
  status: CityStatus;
  center: { lat: number; lng: number };
  bounds: { north: number; south: number; east: number; west: number };
}

export const CITIES: CityConfig[] = [
  {
    id: "blr",
    name: "Bengaluru",
    state: "Karnataka",
    status: "live",
    center: { lat: 12.9716, lng: 77.5946 },
    bounds: { north: 13.17, south: 12.8, east: 77.8, west: 77.45 },
  },
  {
    id: "mys",
    name: "Mysuru",
    state: "Karnataka",
    status: "soon",
    center: { lat: 12.2958, lng: 76.6394 },
    bounds: { north: 12.4, south: 12.2, east: 76.72, west: 76.5 },
  },
  {
    id: "hyd",
    name: "Hyderabad",
    state: "Telangana",
    status: "soon",
    center: { lat: 17.385, lng: 78.4867 },
    bounds: { north: 17.62, south: 17.2, east: 78.66, west: 78.2 },
  },
  {
    id: "maa",
    name: "Chennai",
    state: "Tamil Nadu",
    status: "soon",
    center: { lat: 13.0827, lng: 80.2707 },
    bounds: { north: 13.25, south: 12.85, east: 80.35, west: 80.05 },
  },
  {
    id: "bom",
    name: "Mumbai",
    state: "Maharashtra",
    status: "soon",
    center: { lat: 19.076, lng: 72.8777 },
    bounds: { north: 19.31, south: 18.88, east: 73.05, west: 72.75 },
  },
];

export const liveCities = () => CITIES.filter((c) => c.status === "live");

export const inBounds = (lat: number, lng: number, b: CityConfig["bounds"]) =>
  lat <= b.north && lat >= b.south && lng <= b.east && lng >= b.west;
