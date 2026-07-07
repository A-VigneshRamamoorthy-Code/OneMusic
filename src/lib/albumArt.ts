export type Palette = readonly [string, string, string];

// Vinyl-record–inspired gradient palettes: pink, red, purple, and mixed ramps.
export const PALETTES: readonly Palette[] = [
  ['#FF6B9D', '#F43F5E', '#A855F7'],  // hot-pink → red → purple (reference)
  ['#FB5C74', '#FA2D48', '#D5254E'],  // apple red
  ['#F43F5E', '#EC4899', '#A855F7'],  // rose → pink → violet
  ['#FF375F', '#FF6482', '#FF9DAE'],  // crimson → light-pink
  ['#FF6A3D', '#FF3B6B', '#C026D3'],  // coral → magenta
  ['#FF2D55', '#F43F6B', '#7C3AED'],  // brand-red → violet
  ['#FF7A59', '#FF4D6D', '#C9184A'],  // coral-red
  ['#FFB03A', '#FF5E5B', '#FA2D48'],  // gold → red
  ['#E040FB', '#F43F5E', '#FF6B9D'],  // magenta → pink
  ['#9C27B0', '#E91E63', '#FF6584'],  // purple → hot-pink
];

// Only the vinyl style is used; the constant is kept for future extension.
export const STYLE_COUNT = 1;

/** Deterministic FNV-1a hash of a string, used to seed the generated art. */
export function hashString(value: string): number {
  let hash = 2166136261;
  const text = String(value || 'onemusic');
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

/** A small seeded PRNG (LCG) so a track always renders the same art. */
export function makeRandom(seed: number): () => number {
  let state = seed >>> 0 || 1;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

/**
 * Standalone SVG data URL for the current track, used as Media Session lock-screen
 * artwork (works where raster is not required; harmless where the platform ignores SVG).
 */
export function artworkDataUrl(seed: string): string {
  const hash = hashString(seed);
  const colors = PALETTES[hash % PALETTES.length];
  const angle = (hash % 4) * 45;
  const svg = [
    "<svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'>",
    "<defs><linearGradient id='g' gradientTransform='rotate(" + angle + " 0.5 0.5)'>",
    "<stop offset='0%' stop-color='" + colors[0] + "'/>",
    "<stop offset='55%' stop-color='" + colors[1] + "'/>",
    "<stop offset='100%' stop-color='" + colors[2] + "'/>",
    '</linearGradient></defs>',
    "<rect width='512' height='512' fill='url(#g)'/>",
    "<g fill='#ffffff'>",
    "<rect x='300' y='150' width='26' height='200' rx='13'/>",
    "<path d='M326 150 C372 156 396 182 396 220 C384 196 356 186 326 196 Z'/>",
    "<ellipse cx='268' cy='352' rx='58' ry='44' transform='rotate(-18 268 352)'/>",
    '</g></svg>',
  ].join('');
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
