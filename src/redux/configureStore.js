import thunk from 'redux-thunk';
import rootReducer from './rootReducer';
import { applyMiddleware, compose, createStore } from 'redux';
import { syncHistory } from 'react-router-redux';
import promiseMiddleware from 'redux-promise';
import { browserHistory } from 'react-router';

import devTools from 'containers/DevTools';

export default function configureStore(initialState) {
  let createStoreWithMiddleware;

  const syncedHistory = syncHistory(browserHistory);

  const middleware = applyMiddleware(thunk, promiseMiddleware, syncedHistory);

  if (__DEBUG__) {
    createStoreWithMiddleware = compose(
      middleware,
      window.devToolsExtension
        ? window.devToolsExtension()
        : devTools.instrument()
    );
  } else {
    createStoreWithMiddleware = compose(
      middleware,
    );
  }

  const store = createStoreWithMiddleware(createStore)(rootReducer, initialState);

  // if (__DEBUG__) {
    // Required for replaying actions from devtools to work
    // does not work with immutable.js
    // syncedHistory.listenForReplays(store);
  // }

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default;

      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
