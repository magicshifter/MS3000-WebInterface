import { isNumber } from 'utils/types';

export const minmax =
  ({ value, min, max }) =>
    isNumber(parseInt(value, 10))
      ? Math.min(max, Math.max(min, parseInt(value, 10)))
      : 0;
