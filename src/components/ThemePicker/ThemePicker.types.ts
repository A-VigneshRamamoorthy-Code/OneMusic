import type { Accent } from '../../config/themes';

export interface ThemePickerProps {
  accents: Accent[];
  accentId: string;
  onSelect: (id: string) => void;
}
