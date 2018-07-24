import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import hacktransporter from './protobufhack'

class App extends Component {
  render() {


    var testObj = {
      current: {
        current: "pov"
      },
      lucky_number: 23,
      luckyNumber:24,
    };

    var check = hacktransporter.MS3KG.verify(testObj);
    console.log(check)
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
