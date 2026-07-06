import { useCallback, useEffect, useState } from 'react';
import { ACCENT_VARS, ACCENTS, accentRamp } from '../config/themes';
import type { Accent } from '../config/themes';

const STORAGE_KEY = 'onemusic.accent';

function readStoredAccent(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'default';
  } catch {
    return 'default';
  }
}

function applyAccent(accentId: string, dark: boolean): void {
  const root = document.documentElement;
  const ramp = accentRamp(accentId, dark);
  if (!ramp) {
    ACCENT_VARS.forEach((name) => root.style.removeProperty(name));
  } else {
    Object.entries(ramp).forEach(([name, value]) => root.style.setProperty(name, value));
  }

  const swatch = ACCENTS.find((accent) => accent.id === accentId)?.swatch || '#fa2d48';
  let meta = document.querySelector('meta[name="theme-color"]');
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'theme-color');
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', swatch);
}

export interface UseThemeResult {
  accentId: string;
  accents: Accent[];
  setAccent: (id: string) => void;
}

/** Persisted accent-colour theme applied as CSS custom properties on :root. */
export function useTheme(): UseThemeResult {
  const [accentId, setAccentId] = useState<string>(readStoredAccent);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    applyAccent(accentId, media.matches);

    try {
      localStorage.setItem(STORAGE_KEY, accentId);
    } catch {
      /* ignore storage failures */
    }

    const handleSchemeChange = () => applyAccent(accentId, media.matches);
    media.addEventListener?.('change', handleSchemeChange);
    return () => media.removeEventListener?.('change', handleSchemeChange);
  }, [accentId]);

  const setAccent = useCallback((id: string) => setAccentId(id), []);

  return { accentId, accents: ACCENTS, setAccent };
}
