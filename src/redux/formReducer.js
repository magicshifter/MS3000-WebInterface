import { reducer as form } from 'redux-form';

import { minmax } from 'utils/math';

export default form.normalize({
  PowerSettings: {
    defaultBrightness: value => minmax(parseInt(value || 1, 10), 1, 31),
    timeoutHighPower: value => minmax(parseInt(value || 0, 10), 0, 30),
    timeoutLowPower: value => minmax(parseInt(value || 0, 10), 0, 30),
  },
});
