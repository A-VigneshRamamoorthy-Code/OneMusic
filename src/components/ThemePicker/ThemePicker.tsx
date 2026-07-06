import { IconCheck } from '../Icon';
import type { ThemePickerProps } from './ThemePicker.types';
import * as S from './ThemePicker.style';

/** Accent-colour swatches. Selecting one recolours the whole app. */
export function ThemePicker({ accents, accentId, onSelect }: ThemePickerProps) {
  const activeName = accents.find((accent) => accent.id === accentId)?.name;

  return (
    <S.Wrap>
      <S.Swatches role="radiogroup" aria-label="Accent colour">
        {accents.map((accent) => {
          const selected = accent.id === accentId;
          return (
            <S.Swatch
              key={accent.id}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={accent.name}
              title={accent.name}
              $color={accent.swatch}
              $selected={selected}
              onClick={() => onSelect(accent.id)}
            >
              <IconCheck size={18} />
            </S.Swatch>
          );
        })}
      </S.Swatches>
      {activeName ? <S.Name>{activeName}</S.Name> : null}
    </S.Wrap>
  );
}
