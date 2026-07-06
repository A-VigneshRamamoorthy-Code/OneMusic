export interface AlbumArtProps {
  /** Stable seed (usually a track id) so the same track always renders the same art. */
  seed: string;
  playing?: boolean;
  /** Enable the spinning-vinyl animation (only applies to the vinyl style while playing). */
  spin?: boolean;
  className?: string;
}
