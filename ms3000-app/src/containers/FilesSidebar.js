import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sidebarFilesVisible } from '../actions'


import Sidebar from '../components/Sidebar'

import './App.css';


class FilesSidebar extends Component {
  static propTypes = {
    filesVisible: PropTypes.bool.isRequired,
  }

  onChangeFilesSidebar = (newState) => {
    const { dispatch, filesVisible } = this.props
    dispatch(sidebarFilesVisible(newState))
  }

  render() {
    const { filesVisible } = this.props

    return (
      <Sidebar enlarged={filesVisible} onChange={this.onChangeFilesSidebar} closedChildren={<div>Click to<br/>show Files</div>}>
        <p>Hier kommen dann die Files<br/>die am Shifter lagern<br/>hello world!</p>
      </Sidebar>
    )
  }
}

const mapStateToProps = state => {
  const { filesVisible } = state.sidebar

  return {
    filesVisible,
  }
}

export default connect(mapStateToProps)(FilesSidebar)
