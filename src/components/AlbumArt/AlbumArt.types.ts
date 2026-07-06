export interface AlbumArtProps {
  /** Stable seed (usually a track id) so the same track always renders the same art. */
  seed: string;
  /** When true, the art gently "breathes" — used only for the track that is playing. */
  playing?: boolean;
  className?: string;
}
