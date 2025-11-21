import type React from "react";
import { useEffect, useState } from "react";

export function getLocalStorageValue<T>(key: string, defaultValue: T): T {
  // getting stored value
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem(key);
    if (saved === null || saved === undefined || saved === "undefined") {
      return defaultValue;
    }
    else {
      return JSON.parse(saved) as T;
    }
  }

  return defaultValue;
}

export function useLocalStorage<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => getLocalStorageValue(key, defaultValue));
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export function useMediaQuery(query: string, defaultState = false) {
  const isClient = typeof window !== "undefined" && typeof window.matchMedia === "function";
  const [matches, setMatches] = useState(() => isClient ? window.matchMedia(query).matches : defaultState);
  useEffect(() => {
    if (!isClient)
      return;
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent | MediaQueryList) => setMatches((e as any).matches ?? mql.matches);
    mql.addEventListener ? mql.addEventListener("change", handler) : (mql as any).addListener(handler);
    return () => mql.removeEventListener ? mql.removeEventListener("change", handler) : (mql as any).removeListener(handler);
  }, [isClient, query]);
  return matches;
}
