export interface AlbumGroupProps {
  album: string;
  count: number;
  artSeed: string;
  /** Called when the user taps the play button — should play the album's first track. */
  onPlay: () => void;
  /** Called when the user taps the card art/title — drills down to the track list. */
  onToggle: () => void;
}
