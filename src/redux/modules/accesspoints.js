import { createAction, handleActions } from 'redux-actions';
import Immutable from 'immutable';

import uniqueBy from 'unique-by';

import { fetch, fetchJSON } from 'utils/http';

import { savedAps, availableAps, preferredAp } from 'GLOBALS';

const defaultValues = {
  availableAps,
  savedAps,
  preferredAp,
};

const initialState = Immutable.fromJS(defaultValues);

// ------------------------------------
// Constants
// ------------------------------------
export const REMOVE_AP = 'SET_SETTINGS';
export const ADD_AP = 'ADD_AP';

export const FETCH_AVAILABLE_APS = 'FETCH_AVAILABLE_APS';

export const FETCH_SAVED_APS = 'FETCH_SAVED_APS';

export const REMOVE_SAVED_AP = 'REMOVE_SAVED_AP';

export const FETCH_PREFERRED_AP = 'FETCH_PREFERRED_AP';

export const POST_NEW_AP = 'POST_NEW_AP';

export const POST_PREFERRED_AP = 'POST_PREFERRED_AP';
// ------------------------------------
// Actions
// ------------------------------------

export const fetchAvailableAps = createAction(
  FETCH_AVAILABLE_APS,
  async (url) =>
    await fetchJSON({ url, unique: true })
);

export const fetchSavedAps = createAction(
  FETCH_SAVED_APS,
  async (url) =>
    await fetchJSON({ url, unique: true })
);

export const removeSavedAp = createAction(
  REMOVE_SAVED_AP,
  async url =>
    await fetch({ url, method: 'POST' })
);

export const postNewAp = createAction(
  POST_NEW_AP,
  async url =>
    await fetch({ url, method: 'POST' })
);

export const fetchPreferredAp = createAction(
  FETCH_PREFERRED_AP,
  async url =>
    await fetchJSON({ url })
);

export const actions = {
  fetchAvailableAps,
  fetchSavedAps,
  removeSavedAp,
  fetchPreferredAp,
  postNewAp,
  // postPreferredAp,
};

// ------------------------------------
// Reducer
// ------------------------------------

export default handleActions({
  [FETCH_AVAILABLE_APS]: {
    next(state, { payload }) {
      console.log('fetch available aps', { payload });
      return Immutable.fromJS({
        ...state.toJS(),
        availableAps: uniqueBy(payload, 'ssid'),
      });
    },
    throw(state, { payload }) {
      return Immutable.fromJS({
        ...state.toJS(),
        fetchAvailableApsError: payload.message || 'Unknown Error',
      });
    },
  },

  [FETCH_SAVED_APS]: {
    next(state, { payload }) {
      console.log('fetch saved aps', { payload });
      return Immutable.fromJS({
        ...state.toJS(),
        savedAps: uniqueBy(payload, 'ssid'),
      });
    },
    throw(state, { payload }) {
      return Immutable.fromJS({
        ...state.toJS(),
        fetchSavedApsError: payload.message || 'Unknown Error',
      });
    },
  },

  [FETCH_PREFERRED_AP]: {
    next(state, { payload }) {
      console.log('fetchPreferredAp returned', { payload });
    },
    throw(state, { payload }) {
      'use strict';
      return Immutable.fromJS({
        ...state.toJS(),
        fetchPreferredApError: payload.message || 'Unkown Error',
      });
    },
  },

  [POST_NEW_AP]: {
    next(state, { payload }) {
      console.log('POST_NEW_AP next', { payload });
      return state;
    },
    throw(state, { payload }) {
      console.log('POST_NEW_AP next', { payload });
      return state;
    }
  },

  [REMOVE_SAVED_AP]: {
    next(state, { payload }) {
      console.log({ payload });
    },
    throw(state, { payload }) {
      console.log({ payload });
    },
  },

}, initialState);
