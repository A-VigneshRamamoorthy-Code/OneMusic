import type { IconBaseProps, IconProps } from './Icon.types';

// Modern, Lucide-style SVG icons used across the player UI.

function Stroke({ size = 20, className, children }: IconBaseProps) {
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

function Filled({ size = 20, className, children }: IconBaseProps) {
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

export function IconMusic({ size, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </Stroke>
  );
}

export function IconSearch({ size, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </Stroke>
  );
}

export function IconPlay({ size, className }: IconProps) {
  return (
    <Filled size={size} className={className}>
      <path d="M7 4.5v15a1 1 0 0 0 1.52.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5Z" />
    </Filled>
  );
}

export function IconPause({ size, className }: IconProps) {
  return (
    <Filled size={size} className={className}>
      <rect x="6.5" y="5" width="3.6" height="14" rx="1.3" />
      <rect x="13.9" y="5" width="3.6" height="14" rx="1.3" />
    </Filled>
  );
}

export function IconPrev({ size, className }: IconProps) {
  return (
    <Filled size={size} className={className}>
      <path d="M18 5.2v13.6a1 1 0 0 1-1.55.83L7 13v5a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5l9.45-6.63A1 1 0 0 1 18 5.2Z" />
    </Filled>
  );
}

export function IconNext({ size, className }: IconProps) {
  return (
    <Filled size={size} className={className}>
      <path d="M6 5.2v13.6a1 1 0 0 0 1.55.83L17 13v5a1 1 0 0 0 2 0V6a1 1 0 0 0-2 0v5L7.55 4.37A1 1 0 0 0 6 5.2Z" />
    </Filled>
  );
}

export function IconVolumeLow({ size, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M11 5 6 9H2v6h4l5 4z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
    </Stroke>
  );
}

export function IconVolumeHigh({ size, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M11 5 6 9H2v6h4l5 4z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M19 5a10 10 0 0 1 0 14" />
    </Stroke>
  );
}

export function IconDownload({ size, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M5 21h14" />
    </Stroke>
  );
}

export function IconShuffle({ size, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M16 3h5v5" />
      <path d="m4 20 7-7" />
      <path d="M21 3l-7 7" />
      <path d="m4 4 7 7" />
      <path d="M16 21h5v-5" />
      <path d="m14 14 7 7" />
    </Stroke>
  );
}

export function IconCheck({ size, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M20 6 9 17l-5-5" />
    </Stroke>
  );
}

export function IconTrash({ size, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M3 6h18" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
      <path d="M10 11v6M14 11v6" />
    </Stroke>
  );
}

export function IconSpinner({ size, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </Stroke>
  );
}

export function IconStop({ size, className }: IconProps) {
  return (
    <Filled size={size} className={className}>
      <rect x="5" y="5" width="14" height="14" rx="2" />
    </Filled>
  );
}

export function IconList({ size, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M8 6h13M8 12h13M8 18h13" />
      <path d="M3 6h.01M3 12h.01M3 18h.01" />
    </Stroke>
  );
}

export function IconAlbum({ size, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="2.5" />
    </Stroke>
  );
}

export function IconHome({ size, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
    </Stroke>
  );
}

export function IconMic({ size, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" />
      <path d="M12 18v3" />
    </Stroke>
  );
}

export function IconFolder({ size, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </Stroke>
  );
}

export function IconRefresh({ size, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M21 21v-5h-5" />
    </Stroke>
  );
}

export function IconSignOut({ size, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </Stroke>
  );
}

export function IconChevronUp({ size, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <polyline points="18 15 12 9 6 15" />
    </Stroke>
  );
}

export function IconChevronLeft({ size, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <polyline points="15 18 9 12 15 6" />
    </Stroke>
  );
}

export function IconChevronDown({ size, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <polyline points="6 9 12 15 18 9" />
    </Stroke>
  );
}

export function IconClose({ size, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M18 6 6 18M6 6l12 12" />
    </Stroke>
  );
}

export function IconSettings({ size, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </Stroke>
  );
}

export function IconPalette({ size, className }: IconProps) {
  return (
    <Stroke size={size} className={className}>
      <path d="M12 3a9 9 0 1 0 0 18c.83 0 1.5-.67 1.5-1.5 0-.39-.15-.74-.39-1a1.5 1.5 0 0 1 1.1-2.5H16a5 5 0 0 0 5-5c0-4.42-4.03-8-9-8Z" />
      <circle cx="7.5" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="7.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="16.5" cy="10.5" r="1.1" fill="currentColor" stroke="none" />
    </Stroke>
  );
}
