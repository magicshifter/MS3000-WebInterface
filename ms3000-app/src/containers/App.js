import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchShifterState, receiveShifterState } from '../actions'
import protobufs from '../utils/protoBufLoader'

import AutoInterface from '../components/AutoInterface'
import PixelEditor from './PixelEditor'
import Navigation from './Navigation'

import './App.css';
import logo from '../logo.svg';


class App extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    shifterState :PropTypes.object,
    location: PropTypes.string.isRequired,
  }

  // TODO: this must go to shadow state!
  onChangeLightState = (newLightState) => {
    const { shifterState, dispatch } = this.props
    const newS = Object.assign({}, shifterState,
      { modes: Object.assign({}, shifterState ? shifterState.modes : null, {light: newLightState})})
    dispatch(receiveShifterState(newS))
  }

  onChangeAutoInterface = (newState, theType) => {
    const { dispatch } = this.props
    dispatch(receiveShifterState(newState))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(fetchShifterState())
  }

  handleTestDataClick = e => {
    e.preventDefault()
    const { dispatch } = this.props
    var r = Math.floor(Math.random()*256)
    var g = Math.floor(Math.random()*256)
    var b = Math.floor(Math.random()*256)
    dispatch(receiveShifterState({
      modes: {
        light: {
          name: Math.random() < 0.4 ? "The Light" : Math.random() < 0.4 ? "Licht" : "MagicLight",
          color: {
            R: r, G: g, B: b
          },
          subMode: 2
        }
      }
    }))
  }

  render() {
    const { isFetching, shifterState, location } = this.props

    //console.log("render", isFetching, shifterState )

    const controls = []

    switch (location) {
      case "mode-Image":
        controls.push(<PixelEditor />)
        break;

      case "config":
        controls.push(
          <div>
            <div>
              { !isFetching ?
                <button onClick={this.handleRefreshClick}>
                  Refresh
                </button>
                : <p><img src={logo} className="App-logo" alt="logo" /></p>
              }
              <button onClick={this.handleTestDataClick}>
                Get TestData
              </button>
              fast sync: <input type="checkbox" />
            </div>
            <pre> {JSON.stringify(shifterState, null, 2) }</pre>
            <AutoInterface type={protobufs.MS3KG}
                       onChange={this.onChangeAutoInterface}
                       value={shifterState} />
          </div>)
        break;

      default:
        controls.push(<div>MS3000 Error 404 Unknown location: {location}</div>)
    }


    return (
      <div>
        <Navigation/>
        {controls}



      </div>
    )
  }
}

const mapStateToProps = state => {
  const { isFetching, shifterState } = state.ms3000
  const { location } = state.navigation

  return {
    isFetching,
    shifterState,
    location
  }
}

export default connect(mapStateToProps)(App)
