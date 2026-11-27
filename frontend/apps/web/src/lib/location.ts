export interface CityInfo {
  id: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  popular?: boolean;
}

export const CITIES: CityInfo[] = [
  { id: "bengaluru", name: "Bengaluru", state: "Karnataka", lat: 12.9716, lng: 77.5946, popular: true },
  { id: "hyderabad", name: "Hyderabad", state: "Telangana", lat: 17.385, lng: 78.4867, popular: true },
  { id: "chennai", name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, popular: true },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", lat: 19.076, lng: 72.8777, popular: true },
  { id: "delhi", name: "Delhi NCR", state: "Delhi", lat: 28.6139, lng: 77.209, popular: true },
  { id: "pune", name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, popular: true },
  { id: "mysuru", name: "Mysuru", state: "Karnataka", lat: 12.2958, lng: 76.6394, popular: true },
  { id: "mangaluru", name: "Mangaluru", state: "Karnataka", lat: 12.9141, lng: 74.856, popular: true },
  { id: "hubballi", name: "Hubballi", state: "Karnataka", lat: 15.3647, lng: 75.124, popular: true },
  { id: "kochi", name: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673, popular: true },
  { id: "kolkata", name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, popular: true },
  { id: "ahmedabad", name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, popular: true },
  { id: "chandigarh", name: "Chandigarh", state: "Punjab / Haryana", lat: 30.7333, lng: 76.7794 },
  { id: "jaipur", name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873 },
  { id: "lucknow", name: "Lucknow", state: "Uttar Pradesh", lat: 26.8467, lng: 80.9462 },
  { id: "indore", name: "Indore", state: "Madhya Pradesh", lat: 22.7196, lng: 75.8577 },
  { id: "coimbatore", name: "Coimbatore", state: "Tamil Nadu", lat: 11.0168, lng: 76.9558 },
  { id: "goa", name: "Goa", state: "Goa", lat: 15.2993, lng: 74.124 },
  { id: "visakhapatnam", name: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6868, lng: 83.2185 },
  { id: "nagpur", name: "Nagpur", state: "Maharashtra", lat: 21.1458, lng: 79.0882 },
  { id: "belagavi", name: "Belagavi", state: "Karnataka", lat: 15.8497, lng: 74.4977 },
  { id: "thiruvananthapuram", name: "Thiruvananthapuram", state: "Kerala", lat: 8.5241, lng: 76.9366 },
];

export const POPULAR_CITIES = CITIES.filter((c) => c.popular);

const STORAGE_KEY = "gelavu:selected_city";
const STORAGE_META_KEY = "gelavu:city_meta";
export const CITY_EVENT = "gelavu:city_change";

export interface CityMeta {
  city: string;
  method: "gps" | "ip" | "manual";
  timestamp: number;
}

// Haversine formula to compute distance in km between two lat/lng coordinates
export function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Find closest supported sports city from coordinates
export function findClosestCity(lat: number, lng: number): CityInfo {
  let closest = CITIES[0];
  let minDistance = Infinity;

  for (const city of CITIES) {
    const d = getDistanceKm(lat, lng, city.lat, city.lng);
    if (d < minDistance) {
      minDistance = d;
      closest = city;
    }
  }

  return closest;
}

// Reverse geocode via BigDataCloud (free client-side reverse geocoding with no key requirement)
export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`,
      { signal: AbortSignal.timeout(4000) }
    );
    if (res.ok) {
      const data = await res.json();
      const detectedName = data.city || data.locality || data.principalSubdivision;
      if (detectedName) {
        // Match with known cities if possible
        const match = CITIES.find(
          (c) =>
            c.name.toLowerCase() === detectedName.toLowerCase() ||
            detectedName.toLowerCase().includes(c.name.toLowerCase()) ||
            c.name.toLowerCase().includes(detectedName.toLowerCase())
        );
        if (match) return match.name;
        return detectedName;
      }
    }
  } catch {
    // If external service fails, fallback to distance calculation
  }

  const closest = findClosestCity(lat, lng);
  return closest.name;
}

// IP-based fallback when browser GPS permission is denied or pending
export async function detectCityByIP(): Promise<string | null> {
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(3000) });
    if (res.ok) {
      const data = await res.json();
      if (data.city) {
        const match = CITIES.find(
          (c) =>
            c.name.toLowerCase() === data.city.toLowerCase() ||
            data.city.toLowerCase().includes(c.name.toLowerCase())
        );
        if (match) return match.name;
        return data.city;
      }
    }
  } catch {
    // ignore
  }

  try {
    const res2 = await fetch("https://ipwho.is/", { signal: AbortSignal.timeout(3000) });
    if (res2.ok) {
      const data = await res2.json();
      if (data.city) {
        const match = CITIES.find(
          (c) =>
            c.name.toLowerCase() === data.city.toLowerCase() ||
            data.city.toLowerCase().includes(c.name.toLowerCase())
        );
        if (match) return match.name;
        return data.city;
      }
    }
  } catch {
    // ignore
  }

  return null;
}

// Get stored city or fallback to default
export function getStoredCity(): string {
  if (typeof window === "undefined") return "Bengaluru";
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const paramCity = urlParams.get("city");
    if (paramCity) {
      const match = CITIES.find(
        (c) =>
          c.name.toLowerCase() === paramCity.toLowerCase() ||
          c.id.toLowerCase() === paramCity.toLowerCase() ||
          c.state.toLowerCase() === paramCity.toLowerCase()
      );
      if (match) return match.name;
    }
    return localStorage.getItem(STORAGE_KEY) || "Bengaluru";
  } catch {
    return "Bengaluru";
  }
}

export function getStoredCityMeta(): CityMeta | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_META_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Set city and broadcast change
export function setStoredCity(city: string, method: "gps" | "ip" | "manual" = "manual") {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, city);
    const meta: CityMeta = { city, method, timestamp: Date.now() };
    localStorage.setItem(STORAGE_META_KEY, JSON.stringify(meta));
    window.dispatchEvent(new CustomEvent(CITY_EVENT, { detail: meta }));
  } catch {
    // storage not available
  }
}
