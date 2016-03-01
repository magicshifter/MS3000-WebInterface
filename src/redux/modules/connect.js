import { createAction, handleActions } from 'redux-actions';
import Immutable from 'immutable';

import * as GLOBALS from 'GLOBALS';

const defaultValues = {
  connecting: GLOBALS.connecting,
  connected: GLOBALS.connected,
  connectError: GLOBALS.connectError,
  hosts: GLOBALS.hosts,
};

const initialState = Immutable.Map(defaultValues);

// ------------------------------------
// Constants
// ------------------------------------
export const SET_CONNECT_STATE = 'SET_CONNECT_STATE';

// ------------------------------------
// Actions
// ------------------------------------

export const setConnectState = createAction(
  SET_CONNECT_STATE,
  value => value
);

export const actions = {
  setConnectState,
};

// ------------------------------------
// Reducer
// ------------------------------------
export default handleActions({
  [SET_CONNECT_STATE]:
    (state, { payload }) =>
      Immutable.Map({
        ...state.toJS(),
        ...payload,
      }),

}, initialState);
