import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchShifterState, receiveShifterState } from '../actions'
import protobufs from '../utils/protoBufLoader'

import AutoInterface from '../components/AutoInterface'

import './App.css';
import logo from '../logo.svg';


class App extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    shifterState : PropTypes.object.optional,
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    //dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
    //   const { dispatch, selectedSubreddit } = nextProps
    //   dispatch(fetchPostsIfNeeded(selectedSubreddit))
    // }
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
    const { isFetching, shifterState } = this.props

    console.log("render", isFetching, shifterState )

    return (
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
        </div>
        <pre> {JSON.stringify(shifterState, null, 2) }</pre>
        <AutoInterface protocolBuffer={protobufs.Light}
                       onChange={alert}
                       theState={shifterState ? shifterState.modes.light : null} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { isFetching, shifterState } = state.ms3000

  return {
    isFetching,
    shifterState,
  }
}

export default connect(mapStateToProps)(App)
