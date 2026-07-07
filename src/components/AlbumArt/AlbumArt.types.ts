export interface AlbumArtProps {
  /** Stable seed (usually a track id) so the same track always renders the same art. */
  seed: string;
  /** When true, the art animates — used only for the currently playing track. */
  playing?: boolean;
  /**
   * 'row'   — subtle breathe/scale in track list rows (default).
   * 'player' — vinyl spin in the full-screen now-playing view.
   */
  variant?: 'row' | 'player';
  className?: string;
}
