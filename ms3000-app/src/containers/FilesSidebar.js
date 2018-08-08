import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchShifterState, receiveShifterState } from '../actions'
import protobufs from '../utils/protoBufLoader'

import AutoInterface from '../components/AutoInterface/index'
import PixelEditor from './PixelEditor'
import Navigation from './Navigation'
import SocketCmdCenter from './SocketCmdCenter'

import Sidebar from '../components/Sidebar'

import './App.css';


class App extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    shifterState :PropTypes.object,
    location: PropTypes.string.isRequired,
  }

  onChangeFilesSidebar = (newState, theType) => {
    const { dispatch } = this.props
    dispatch(receiveShifterState(newState))
  }

  render() {
    const { isFetching, shifterState, location } = this.props

    //console.log("render", isFetching, shifterState )

    const controls = []

    switch (location) {
      case "wifi":
        controls.push(<SocketCmdCenter />)
        break;

      case "mode-Image":
        controls.push(<PixelEditor key="mImage" />)

        break;

      case "config":
        controls.push(
          <div key="config">
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

            <AutoInterface type={protobufs.MS3KG}
                           onChange={this.onChangeAutoInterface}
                           value={shifterState}
                           legend="MS3000 State"

            />

            <pre> {JSON.stringify(shifterState, null, 2) }</pre>

          </div>)
        break;

      default:
        controls.push(<div key={"uknw"}>MS3000 Error 404 Unknown location: {location}</div>)
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
