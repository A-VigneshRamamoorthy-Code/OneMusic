// Modern, Lucide-style SVG icons used across the player UI.

function Stroke({ size = 20, className, children }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

function Filled({ size = 20, className, children }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export function IconMusic({ size, className }) {
  return (
    <Stroke size={size} className={className}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </Stroke>
  );
}

export function IconSearch({ size, className }) {
  return (
    <Stroke size={size} className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </Stroke>
  );
}

export function IconPlay({ size, className }) {
  return (
    <Filled size={size} className={className}>
      <path d="M7 4.5v15a1 1 0 0 0 1.52.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5Z" />
    </Filled>
  );
}

export function IconPause({ size, className }) {
  return (
    <Filled size={size} className={className}>
      <rect x="6.5" y="5" width="3.6" height="14" rx="1.3" />
      <rect x="13.9" y="5" width="3.6" height="14" rx="1.3" />
    </Filled>
  );
}

export function IconPrev({ size, className }) {
  return (
    <Filled size={size} className={className}>
      <path d="M18 5.2v13.6a1 1 0 0 1-1.55.83L7 13v5a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5l9.45-6.63A1 1 0 0 1 18 5.2Z" />
    </Filled>
  );
}

export function IconNext({ size, className }) {
  return (
    <Filled size={size} className={className}>
      <path d="M6 5.2v13.6a1 1 0 0 0 1.55.83L17 13v5a1 1 0 0 0 2 0V6a1 1 0 0 0-2 0v5L7.55 4.37A1 1 0 0 0 6 5.2Z" />
    </Filled>
  );
}

export function IconVolumeLow({ size, className }) {
  return (
    <Stroke size={size} className={className}>
      <path d="M11 5 6 9H2v6h4l5 4z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
    </Stroke>
  );
}

export function IconVolumeHigh({ size, className }) {
  return (
    <Stroke size={size} className={className}>
      <path d="M11 5 6 9H2v6h4l5 4z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M19 5a10 10 0 0 1 0 14" />
    </Stroke>
  );
}
