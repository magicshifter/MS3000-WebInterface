import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import protobuf from 'protobufjs'

import hacktransporter from './protobufhack'



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



registerServiceWorker();
