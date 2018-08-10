import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppDebug from './App';
import registerServiceWorker from './registerServiceWorker';
import { getProtocolBuffersPromise } from './utils/protoBufLoader'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { createLogger } from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'


import rootSaga from './sagas'
import createSagaMiddleware from 'redux-saga'

import thunk from 'redux-thunk'


const middleware = []

const sagaMiddleware = createSagaMiddleware()
middleware.push(sagaMiddleware)

middleware.push(thunk)
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

// after createStore
sagaMiddleware.run(rootSaga)





var p = getProtocolBuffersPromise();
p.then( () => {

  if (true) {
    ReactDOM.render(
      <Provider store={store}>
        <App/>
      </Provider>,
      document.getElementById('root')
    )
  }
  else {
    ReactDOM.render(<AppDebug/>, document.getElementById('root'));
  }
});


registerServiceWorker();
