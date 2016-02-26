import { createAction, handleActions } from 'redux-actions';
import Immutable from 'immutable';

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
  ({ ssid, free, pass }) => ({
    ssid,
    free,
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
      const { ssid, free, pass } = payload;
      console.log({ state, payload });
      const accesspoints = state.get('accesspoints');

      if (!ssid) {
        return state;
      }

      const apExists = accesspoints.some(
        ap =>
          ap.ssid === ssid
      );

      if (!apExists) {
        accesspoints.push({
          ssid,
          free,
          pass,
        });

        return state.set('accesspoints', accesspoints);
      }

      const newAccesspoints = accesspoints.map(
        ap =>
          ap.ssid !== ssid
            ? ap
            : {
              ...ap,
              pass,
              free,
            }
      );

      return state.set('accesspoints', newAccesspoints);
    },

}, initialState);
