import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';

import protobuf from 'protobufjs'

import hacktransporter from './utils/protobufhack'




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


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)






/*


console.log("test hack", hacktransporter, hacktransporter.test)

protobuf.load(process.env.PUBLIC_URL + "MS3000.proto", function(err, root) {
  if (err)
    throw err;

  // Obtain a message type
  hacktransporter.MS3KG = root.lookupType("MS3KG");
  hacktransporter.root = root

  console.log("stage2", hacktransporter)

  ReactDOM.render(<App />, document.getElementById('root'));
})
*/


registerServiceWorker();
