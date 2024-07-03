import { TAG_COLOR_LIST } from '@/constants/tagColorList';

export function useTagColor(tagText: string) {
  const firstText = tagText.trim().charAt(0);
  const charCode = firstText.charCodeAt(0) % 10;

  let colorIndex;

  if (charCode === 0 || charCode === 5) {
    colorIndex = 0;
  } else if (charCode === 1) {
    colorIndex = 1;
  } else if (charCode === 2 || charCode === 6) {
    colorIndex = 2;
  } else if (charCode === 3 || charCode === 7) {
    colorIndex = 3;
  } else if (charCode === 4 || charCode === 8) {
    colorIndex = 4;
  } else {
    colorIndex = 5;
  }

  const [backgroundColor, textColor] = TAG_COLOR_LIST[colorIndex];

  return { backgroundColor, textColor };
}
