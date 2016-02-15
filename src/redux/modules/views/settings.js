import { createAction, handleActions } from 'redux-actions';
import Immutable from 'immutable';

import { fetch } from 'utils/http';

import * as GLOBALS from 'GLOBALS';

const defaultValues = {
  protocol: GLOBALS.protocol,
  host: GLOBALS.host,
  syslogIp: GLOBALS.syslogIp,
  ssid: GLOBALS.ssid,
  accesspoints: [],
};

const initialState = Immutable.Map(defaultValues);

// ------------------------------------
// Constants
// ------------------------------------
export const SET_SETTINGS = 'SET_SETTINGS';
export const LOAD_AP_SETTINGS = 'LOAD_AP_SETTINGS';
export const ADD_AP = 'ADD_AP';

// ------------------------------------
// Actions
// ------------------------------------
export const setSettings = createAction(
  SET_SETTINGS,
  (value = defaultValues) => value
);

export const loadApSettings = createAction(
  LOAD_AP_SETTINGS,
  async ({ host, protocol }) =>
    await fetch(`${protocol || GLOBALS.protocol}://${host || GLOBALS.host}/settings/wifi/list`)
);

export const addAp = createAction(
  ADD_AP,
  ({ name, pass }) => ({
    name,
    pass,
  })
);

export const actions = {
  setSettings,
  loadApSettings,
  addAp,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_SETTINGS]:
    (state, { payload }) =>
      Immutable.Map(payload),

  [LOAD_AP_SETTINGS]:
    (state, { payload }) => {
      const { status, responseText } = payload;

      if (status !== 200) {
        console.log('returning failure');
        return state.delete('apLoading').set('apLoadError', 'No MagicShifter found in Network.');
      }

      let parsed = false;
      try {
        parsed = JSON.parse(responseText);
      } catch (err) {
        return state.delete('apLoading').set('apLoadError', 'MagicShifter response invalid');
      }

      if (parsed) {
        console.log('parse successful', { parsed });
        return state.delete('apLoading');
      }

      return state.delete('apLoading').set('apLoadError', 'Unknown Error');
    },

  [ADD_AP]:
    (state, { payload }) =>
      state.setIn('accesspoints', state.get('accesspoints').push(payload)),

}, initialState);
