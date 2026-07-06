import { useId, useMemo } from 'react';
import { PALETTES, STYLE_COUNT, hashString, makeRandom } from '../../lib/albumArt';
import type { Palette } from '../../lib/albumArt';
import type { AlbumArtProps } from './AlbumArt.types';
import { Art } from './AlbumArt.style';

interface GradientIds {
  bg: string;
  radial: string;
  label: string;
  soft: string;
}

interface StyleProps {
  colors: Palette;
  ids: GradientIds;
  random: () => number;
}

function Vinyl({ colors, ids }: StyleProps) {
  const grooves = [42, 37, 32, 27, 22];
  return (
    <g>
      <rect width="100" height="100" fill={`url(#${ids.bg})`} />
      <circle cx="50" cy="50" r="47" fill="#0d0d12" />
      {grooves.map((r) => (
        <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
      ))}
      <circle cx="50" cy="50" r="15" fill={colors[0]} />
      <circle cx="50" cy="50" r="15" fill={`url(#${ids.label})`} />
      <circle cx="50" cy="50" r="2.4" fill="#0d0d12" />
      <path d="M30 26 A34 34 0 0 1 74 30" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
}

function Equalizer({ colors, ids, random }: StyleProps) {
  const bars = Array.from({ length: 9 }, (_, index) => {
    const height = 24 + Math.floor(random() * 60);
    return { x: 8 + index * 10, height };
  });
  return (
    <g>
      <rect width="100" height="100" fill={`url(#${ids.bg})`} />
      {bars.map((bar) => (
        <rect
          key={bar.x}
          x={bar.x}
          y={92 - bar.height}
          width="6.5"
          height={bar.height}
          rx="3"
          fill="rgba(255,255,255,0.85)"
          opacity={0.55 + (bar.height / 84) * 0.45}
        />
      ))}
      <circle cx="78" cy="22" r="10" fill={colors[2]} opacity="0.9" />
    </g>
  );
}

function Waveform({ ids, random }: StyleProps) {
  const bars = Array.from({ length: 15 }, (_, index) => {
    const amp = 8 + Math.floor(random() * 34);
    return { x: 6 + index * 6.2, amp };
  });
  return (
    <g>
      <rect width="100" height="100" fill={`url(#${ids.bg})`} />
      {bars.map((bar) => (
        <rect
          key={bar.x}
          x={bar.x}
          y={50 - bar.amp}
          width="3.4"
          height={bar.amp * 2}
          rx="1.7"
          fill="rgba(255,255,255,0.9)"
          opacity="0.9"
        />
      ))}
    </g>
  );
}

function Sunburst({ colors, ids }: StyleProps) {
  const rays = Array.from({ length: 24 }, (_, index) => index);
  return (
    <g>
      <rect width="100" height="100" fill={`url(#${ids.radial})`} />
      <g transform="translate(50 50)">
        {rays.map((index) => (
          <path
            key={index}
            d="M0 0 L6 -70 L-6 -70 Z"
            fill={index % 2 === 0 ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.04)'}
            transform={`rotate(${index * 15})`}
          />
        ))}
      </g>
      <circle cx="50" cy="50" r="16" fill={colors[0]} />
      <circle cx="50" cy="50" r="16" fill={`url(#${ids.label})`} />
    </g>
  );
}

function NoteMesh({ colors, ids, random }: StyleProps) {
  const blobs = Array.from({ length: 4 }, () => ({
    cx: 12 + Math.floor(random() * 76),
    cy: 12 + Math.floor(random() * 76),
    r: 16 + Math.floor(random() * 22),
    fill: colors[Math.floor(random() * colors.length)],
  }));
  return (
    <g>
      <rect width="100" height="100" fill={`url(#${ids.bg})`} />
      <g filter={`url(#${ids.soft})`}>
        {blobs.map((blob, index) => (
          <circle key={index} cx={blob.cx} cy={blob.cy} r={blob.r} fill={blob.fill} opacity="0.55" />
        ))}
      </g>
      <g fill="#ffffff">
        <rect x="60" y="26" width="4.5" height="38" rx="2" />
        <path d="M64.5 26 C72 27 76 31 76 37 C74 33 70 31 64.5 33 Z" />
        <ellipse cx="55" cy="66" rx="11" ry="8" transform="rotate(-18 55 66)" />
      </g>
    </g>
  );
}

/** Procedurally generated, music-themed album art used when a real cover is missing. */
export function AlbumArt({ seed, playing = false, className }: AlbumArtProps) {
  const rawId = useId();
  const uid = rawId.replace(/:/g, '');
  const { colors, style, random } = useMemo(() => {
    const hash = hashString(seed);
    return {
      colors: PALETTES[hash % PALETTES.length],
      style: hash % STYLE_COUNT,
      random: makeRandom(hash),
    };
  }, [seed]);

  const ids: GradientIds = {
    bg: `${uid}-bg`,
    radial: `${uid}-radial`,
    label: `${uid}-label`,
    soft: `${uid}-soft`,
  };
  const angle = (hashString(seed) % 4) * 45;
  const styleProps: StyleProps = { colors, ids, random };

  return (
    <Art
      className={className}
      $playing={playing}
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
        <radialGradient id={ids.radial} cx="50%" cy="50%" r="75%">
          <stop offset="0%" stopColor={colors[1]} />
          <stop offset="100%" stopColor={colors[2]} />
        </radialGradient>
        <linearGradient id={ids.label} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>
        <filter id={ids.soft} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      {style === 0 ? <Vinyl {...styleProps} /> : null}
      {style === 1 ? <Equalizer {...styleProps} /> : null}
      {style === 2 ? <Waveform {...styleProps} /> : null}
      {style === 3 ? <Sunburst {...styleProps} /> : null}
      {style === 4 ? <NoteMesh {...styleProps} /> : null}
    </Art>
  );
}
