import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import Config from './Config'
import PixelEditor from './PixelEditor'
import Navigation from './Navigation'
import SocketCmdCenter from './SocketCmdCenter'

import IconTest from '../components/IconTest'

import FilesSidebar from './FilesSidebar'

import './App.css';


class App extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    shifterState :PropTypes.object,
    location: PropTypes.string.isRequired,
  }

  render() {
    const { location } = this.props

    //console.log("render", isFetching, shifterState )

    const controls = []

    switch (location) {
      case "wifi":
        controls.push(<SocketCmdCenter key='soc'/>)
        break;

      case "mode-Image":
        controls.push(<FilesSidebar key='fS'/>)
        controls.push(<PixelEditor key="mImage" />)
        break;

      case "config":
        controls.push(<Config key='cfg' />)
        break;

      case "help":
        controls.push(<IconTest key='icontest' />)
        break;

      default:
        controls.push(<div key="uknw">MS3000 Error 404 Unknown location: {location}</div>)
    }

    return (
      <div style={{width: '100%', height:'100%', display: 'flex', flexFlow: 'column'}}>
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
