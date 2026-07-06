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
