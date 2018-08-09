import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchShifterState, receiveShifterState } from '../actions'


import Sidebar from '../components/Sidebar'

import './App.css';


class FilesSidebar extends Component {
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


    return (
      <Sidebar enlarged={true} onChange={this.onChangeFilesSidebar}>
       <p>Je mapelle Philipp</p>
      </Sidebar>
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

export default connect(mapStateToProps)(FilesSidebar)
