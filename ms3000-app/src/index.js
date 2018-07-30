import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppDebug from './App';
import registerServiceWorker from './registerServiceWorker';

import { getProtocolBuffersPromise } from './utils/protoBufLoader'




import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'





const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)


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
