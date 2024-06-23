import { PROFILE_COLOR_LIST } from '@/constants/profileColorList';

export const useProfileColor = (id: number) => {
  const lastNumber = id % 10;

  if (lastNumber === 0 || lastNumber === 5) {
    return PROFILE_COLOR_LIST[0];
  } else if (lastNumber === 1) {
    return PROFILE_COLOR_LIST[1];
  } else if (lastNumber === 2 || lastNumber === 6) {
    return PROFILE_COLOR_LIST[2];
  } else if (lastNumber === 3 || lastNumber === 7) {
    return PROFILE_COLOR_LIST[3];
  } else if (lastNumber === 4 || lastNumber === 8) {
    return PROFILE_COLOR_LIST[4];
  } else {
    return PROFILE_COLOR_LIST[5];
  }
};
