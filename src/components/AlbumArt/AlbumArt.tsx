import { useId, useMemo } from 'react';
import { PALETTES, hashString } from '../../lib/albumArt';
import type { Palette } from '../../lib/albumArt';
import type { AlbumArtProps } from './AlbumArt.types';
import { Art } from './AlbumArt.style';

interface GradientIds {
  bg: string;
  label: string;
}

interface StyleProps {
  colors: Palette;
  ids: GradientIds;
}

/** Vinyl record with gradient background — the sole art style. */
function Vinyl({ colors, ids }: StyleProps) {
  const grooves = [44, 40, 36, 32, 28, 24, 20];
  return (
    <g>
      {/* gradient background */}
      <rect width="100" height="100" fill={`url(#${ids.bg})`} />
      {/* vinyl disc */}
      <circle cx="50" cy="50" r="45" fill="#090910" />
      {/* groove rings */}
      {grooves.map((r) => (
        <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.9" />
      ))}
      {/* disc rim highlight */}
      <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" />
      {/* shine arc */}
      <path
        d="M20 22 A40 40 0 0 1 80 28"
        fill="none"
        stroke="rgba(255,255,255,0.22)"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* center label */}
      <circle cx="50" cy="50" r="17" fill={colors[0]} />
      <circle cx="50" cy="50" r="17" fill={`url(#${ids.label})`} />
      <circle cx="50" cy="50" r="17" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.7" />
      {/* spindle */}
      <circle cx="50" cy="50" r="2.8" fill="#090910" />
    </g>
  );
}

/** Procedurally generated vinyl-record album art; seed is typically the track id. */
export function AlbumArt({ seed, playing = false, variant = 'row', className }: AlbumArtProps) {
  const rawId = useId();
  const uid = rawId.replace(/:/g, '');
  const { colors, angle } = useMemo(() => {
    const hash = hashString(seed);
    return {
      colors: PALETTES[hash % PALETTES.length],
      angle: (hash % 8) * 45,
    };
  }, [seed]);

  const ids: GradientIds = { bg: `${uid}-bg`, label: `${uid}-label` };

  return (
    <Art
      className={className}
      $playing={playing}
      $variant={variant}
      viewBox="0 0 100 100"
      role="img"
      aria-label="Generated album art"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={ids.bg} gradientTransform={`rotate(${angle} 0.5 0.5)`}>
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="55%" stopColor={colors[1]} />
          <stop offset="100%" stopColor={colors[2]} />
        </linearGradient>
        <linearGradient id={ids.label} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
      </defs>
      <Vinyl colors={colors} ids={ids} />
    </Art>
  );
}
