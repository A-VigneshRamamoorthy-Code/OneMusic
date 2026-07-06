/** A selectable accent colour for the app. */
export interface Accent {
  id: string;
  name: string;
  /** Swatch shown in the picker (matches the light-mode `--brand`). */
  swatch: string;
}

/** Accent presets. `default` keeps the built-in Apple-Music red from GlobalStyle. */
export const ACCENTS: Accent[] = [
  { id: 'default', name: 'Ruby', swatch: '#fa2d48' },
  { id: 'blue', name: 'Blue', swatch: '#0a84ff' },
  { id: 'indigo', name: 'Indigo', swatch: '#5b6cff' },
  { id: 'purple', name: 'Purple', swatch: '#8b5cf6' },
  { id: 'magenta', name: 'Magenta', swatch: '#e0219a' },
  { id: 'orange', name: 'Sunset', swatch: '#ff6a00' },
  { id: 'green', name: 'Green', swatch: '#1db954' },
  { id: 'teal', name: 'Teal', swatch: '#14b8a6' },
];

const HUES: Record<string, number> = {
  blue: 211,
  indigo: 235,
  purple: 265,
  magenta: 322,
  orange: 26,
  green: 145,
  teal: 174,
};

/** The brand-related custom properties a theme overrides on :root. */
export const ACCENT_VARS = [
  '--brand',
  '--brand-strong',
  '--brand-medium',
  '--brand-soft',
  '--brand-softer',
  '--fg-brand',
  '--fg-brand-strong',
  '--fg-brand-subtle',
  '--border-brand',
  '--border-brand-subtle',
] as const;

/**
 * Build the brand-colour ramp for an accent in light or dark mode. Returns null for
 * the default accent so the GlobalStyle tokens (exact Apple-Music red) are used.
 */
export function accentRamp(id: string, dark: boolean): Record<string, string> | null {
  const hue = HUES[id];
  if (id === 'default' || hue === undefined) {
    return null;
  }
  const hsl = (saturation: number, lightness: number) => `hsl(${hue} ${saturation}% ${lightness}%)`;
  if (dark) {
    return {
      '--brand': hsl(90, 64),
      '--brand-strong': hsl(85, 55),
      '--brand-medium': hsl(45, 24),
      '--brand-soft': hsl(55, 16),
      '--brand-softer': hsl(50, 12),
      '--fg-brand': hsl(90, 70),
      '--fg-brand-strong': hsl(90, 80),
      '--fg-brand-subtle': hsl(50, 40),
      '--border-brand': hsl(85, 60),
      '--border-brand-subtle': hsl(45, 26),
    };
  }
  return {
    '--brand': hsl(85, 52),
    '--brand-strong': hsl(78, 43),
    '--brand-medium': hsl(85, 80),
    '--brand-soft': hsl(90, 95),
    '--brand-softer': hsl(92, 97),
    '--fg-brand': hsl(80, 46),
    '--fg-brand-strong': hsl(75, 38),
    '--fg-brand-subtle': hsl(85, 78),
    '--border-brand': hsl(80, 55),
    '--border-brand-subtle': hsl(85, 84),
  };
}
