/** Format a number of seconds as `m:ss`. */
export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds <= 0) {
    return '0:00';
  }
  const safeSeconds = Math.floor(seconds);
  const minutes = Math.floor(safeSeconds / 60);
  const remainder = safeSeconds % 60;
  return `${minutes}:${String(remainder).padStart(2, '0')}`;
}

/** Build a metadata line from two fields, skipping unknown placeholders. */
export function formatTrackMetaLine(first: string, second: string): string {
  const a = first.trim();
  const b = second.trim();
  const unknownPattern = /^(unknown|unknwn|n\/a|na|null|none|undefined|unknown artist|unknown album)$/i;
  const isUnknown = (value: string) => !value || unknownPattern.test(value);
  if (isUnknown(a)) {
    return isUnknown(b) ? 'Unknown' : b;
  }
  if (isUnknown(b)) {
    return a;
  }
  return `${a} • ${b}`;
}
