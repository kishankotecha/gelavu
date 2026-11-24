"use client";

import { useState, useEffect, useSyncExternalStore, useCallback, useMemo } from "react";
import {
  CITIES,
  POPULAR_CITIES,
  getStoredCity,
  setStoredCity,
  CITY_EVENT,
  reverseGeocode,
  detectCityByIP,
  CityMeta,
} from "@/lib/location";

const STORAGE_META_KEY = "gelavu:city_meta";

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(CITY_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CITY_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getCitySnapshot() {
  return getStoredCity();
}

function getServerCitySnapshot() {
  return "Bengaluru";
}

function getMetaSnapshot() {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(STORAGE_META_KEY) || "";
  } catch {
    return "";
  }
}

function getServerMetaSnapshot() {
  return "";
}

export function useCity() {
  const city = useSyncExternalStore(subscribe, getCitySnapshot, getServerCitySnapshot);
  const rawMeta = useSyncExternalStore(subscribe, getMetaSnapshot, getServerMetaSnapshot);

  const meta = useMemo<CityMeta | null>(() => {
    if (!rawMeta) return null;
    try {
      return JSON.parse(rawMeta);
    } catch {
      return null;
    }
  }, [rawMeta]);

  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionError, setDetectionError] = useState<string | null>(null);

  // Function to perform real location detection (GPS with IP fallback)
  const detectLocation = useCallback(async (opts?: { silent?: boolean }) => {
    setIsDetecting(true);
    setDetectionError(null);

    return new Promise<string | null>((resolve) => {
      if (typeof window === "undefined") {
        setIsDetecting(false);
        resolve(null);
        return;
      }

      // Check if browser supports Geolocation
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const detected = await reverseGeocode(latitude, longitude);
              if (detected) {
                setStoredCity(detected, "gps");
                setIsDetecting(false);
                resolve(detected);
                return;
              }
            } catch {
              // fallback to IP
            }

            // If reverse geocoding didn't match, fallback to IP
            const ipCity = await detectCityByIP();
            if (ipCity) {
              setStoredCity(ipCity, "ip");
              setIsDetecting(false);
              resolve(ipCity);
            } else {
              setIsDetecting(false);
              resolve(null);
            }
          },
          async (err) => {
            // Geolocation denied or timed out; fallback to IP location
            if (!opts?.silent) {
              if (err.code === err.PERMISSION_DENIED) {
                setDetectionError("Location permission was denied. Trying IP detection...");
              }
            }

            try {
              const ipCity = await detectCityByIP();
              if (ipCity) {
                setStoredCity(ipCity, "ip");
                setIsDetecting(false);
                resolve(ipCity);
                return;
              }
            } catch {
              // fallback
            }

            setIsDetecting(false);
            if (!opts?.silent) {
              setDetectionError("Could not auto-detect location. Please choose your city manually.");
            }
            resolve(null);
          },
          {
            enableHighAccuracy: true,
            timeout: 7000,
            maximumAge: 60000,
          }
        );
      } else {
        // No geolocation in navigator; use IP
        detectCityByIP().then((ipCity) => {
          if (ipCity) {
            setStoredCity(ipCity, "ip");
            setIsDetecting(false);
            resolve(ipCity);
          } else {
            setIsDetecting(false);
            resolve(null);
          }
        });
      }
    });
  }, []);

  // Automatic first-visit detection in an async timeout callback
  useEffect(() => {
    if (typeof window === "undefined") return;
    const existingMeta = localStorage.getItem(STORAGE_META_KEY);
    if (!existingMeta) {
      const timer = setTimeout(() => {
        detectLocation({ silent: true });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [detectLocation]);

  const selectCity = useCallback((newCity: string) => {
    setStoredCity(newCity, "manual");
  }, []);

  return {
    city,
    meta,
    isDetecting,
    detectionError,
    detectLocation,
    selectCity,
    popularCities: POPULAR_CITIES,
    allCities: CITIES,
  };
}
