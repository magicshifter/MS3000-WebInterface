import localforage from 'localforage';

export const getItem =
  key =>
    localforage.getItem(key);

export const setItem =
  (key, value) =>
    localforage.setItem(key, value);

export const removeItem =
  key =>
    localforage.removeItem(key);

export const clear =
  () =>
    localforage.clear();

export const length =
  () =>
    localforage.length();

export const key =
  key =>
    localforage.key(key);

export const keys =
  () =>
    localforage.keys();

export const iterate =
  () =>
    localforage.iterate();
