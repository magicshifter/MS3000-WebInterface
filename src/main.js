import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import routes from './routes';
import Root from './containers/Root';
import configureStore from './redux/configureStore';

const store = configureStore(window.__INITIAL_STATE__);

// Render the React application to the DOM
ReactDOM.render(
  <Root history={browserHistory} routes={routes} store={store} />,
  document.getElementById('root')
);
