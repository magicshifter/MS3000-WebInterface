import { createAction, handleActions } from 'redux-actions';
import Immutable from 'immutable';

import { isObjectInArray } from 'utils/unique';

import * as GLOBALS from 'GLOBALS';

const defaultValues = {
  protocol: GLOBALS.protocol,
  host: GLOBALS.host,
  syslogIp: GLOBALS.syslogIp,
  powerdownTimeBattery: GLOBALS.powerdownTimeBattery,
  powerdownTimeUSB: GLOBALS.powerdownTimeUSB,
  defaultBrightness: GLOBALS.defaultBrightness,
  preferredAp: GLOBALS.preferredAp,
  accesspoints: GLOBALS.accesspoints,
  hosts: GLOBALS.hosts,
};

const initialState = Immutable.fromJS(defaultValues);

// ------------------------------------
// Constants
// ------------------------------------
export const SET_SETTINGS = 'SET_SETTINGS';
export const ADD_AP = 'ADD_AP';

// ------------------------------------
// Actions
// ------------------------------------
export const setSettings = createAction(
  SET_SETTINGS,
  (value = defaultValues) => value
);

export const addAp = createAction(
  ADD_AP,
  ({ newApSSID: ssid, newApPass: pass }) => ({
    ssid,
    pass,
  })
);

export const actions = {
  setSettings,
  addAp,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_SETTINGS]:
    (state, { payload }) =>
      Immutable.Map({
        ...state.toJS(),
        ...payload,
      }),

  [ADD_AP]:
    (state, { payload }) => {
      console.log({ payload });
      const accesspoints = state.get('accesspoints');
      if (payload.ssid && payload.key) {
        if (isObjectInArray(accesspoints, payload)) {
          console.log('object is in array');
        } else {
          console.log('object is not in array');
          // accesspoints.push(payload);
        }
      }

      return state.set('accesspoints', accesspoints);
    },

}, initialState);
