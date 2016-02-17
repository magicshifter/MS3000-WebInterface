import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import Immutable from 'immutable';

import layout from 'redux/modules/layout';
import colorList from 'redux/modules/colorList';
import pixels from 'redux/modules/pixels';

import imageView from 'redux/modules/views/image';
import textView from 'redux/modules/views/text';
import settingsView from 'redux/modules/views/settings';

// import { normalizeMinMax } from 'utils/inputs';

export default Immutable.fromJS(combineReducers({
  routeReducer,
  /*
  form: form.normalize({
    powerSettings: {
      defaultBrightness: normalizeMinMax,
      powerdownTimeUSB: normalizeMinMax,
      powerdownTimeBattery: normalizeMinMax,
    },
  }),
  */
  form,

  layout,
  colorList,
  pixels,

  imageView,
  textView,
  settingsView,
}));
