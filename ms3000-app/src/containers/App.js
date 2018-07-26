import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchShifterState } from '../actions'

import './App.css';
import logo from '../logo.svg';


class App extends Component {
  // static propTypes = {
  //   fetchingState: isFetching, shifterState : PropTypes.string.isRequired,
  //   posts: PropTypes.array.isRequired,
  //   isFetching: PropTypes.bool.isRequired,
  //   lastUpdated: PropTypes.number,
  //   dispatch: PropTypes.func.isRequired
  // }

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
        </div>
        <pre> {JSON.stringify(shifterState, null, 2) }</pre>
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
