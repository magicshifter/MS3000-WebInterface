import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

import protobufs from './utils/protoBufLoader'
import {fetch} from './utils/http'

class App extends Component {
  // constructor() {
  //
  // }

  sendPing = () => {
    window.location.reload();
  }

  render() {
    var r = Math.floor(Math.random()*256)
    var g = Math.floor(Math.random()*256)
    var b = Math.floor(Math.random()*256)

    var testObj = {
      modes: {
        current: "light",
        light: {
          name: "light evil hacked",
          subMode: protobufs.MS3KG.Modes.Light.LightMode.SCANNER_RGB,
          color: {
            R: r, G: g, B: b
          }
        }
      },
    };

    var check = protobufs.MS3KG.verify(testObj);

    var bufferU8 = protobufs.MS3KG.encode(testObj).finish()
    //var decoder = new TextDecoder('utf8');

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
          <button value="kjjkj" onClick={this.sendPing}>refreshhh</button>
          {message}
        </p>
      </div>
    );
  }


}

export default App;
