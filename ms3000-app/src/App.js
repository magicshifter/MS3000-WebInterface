import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import hacktransporter from './protobufhack'
import { fetch } from './utils/http'

class App extends Component {
  render() {


    var testObj = {
      modes: {
        current: "light",
        light: {
          name: "light evil hacked",
          subMode: hacktransporter.MS3KG.Modes.Light.LightMode.SCANNER_RGB,
          color: {
            R: 0, G: 255, B: 255
          }
        }
      },
    };

    var check = hacktransporter.MS3KG.verify(testObj);

    var bufferU8 = hacktransporter.MS3KG.encode(testObj).finish()
    var decoder = new TextDecoder('utf8');

    var funkyStr = String.fromCharCode.apply(null, bufferU8)

    var b64encoded = btoa(funkyStr);

    //b64encoded = "abc"


    fetch({method: "post", url: 'http://192.168.4.1/protobuf?myArg=' + b64encoded})

    console.log(check, bufferU8)

    var message = (check == null ? "success :)" : check);

    //message = "hello"



    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">MS3000 HyperVisor</h1>
        </header>
        <p className="App-intro">
          <button value="kjjkj"> </button>
          {message}
        </p>
      </div>
    );
  }


}

export default App;
