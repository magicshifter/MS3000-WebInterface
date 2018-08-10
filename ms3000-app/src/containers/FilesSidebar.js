import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { sidebarFilesVisible } from '../actions'


import Sidebar from '../components/Sidebar'
import SelectableList from '../components/inputs/SelectableList'

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
    const { filesVisible, files } = this.props

    return (
      <Sidebar enlarged={filesVisible} onChange={this.onChangeFilesSidebar} closedChildren={<div>Click to<br/>show Files</div>}>
        <p>Hier kommen dann die Files<br/>die am Shifter lagern<br/>hello world!</p>
        <SelectableList listItems={files} fieldId='name' fieldText='name' lines={20}
                        select={this.selectFile} doubleClick={this.doubleClickFile}  />
      </Sidebar>
    )
  }
}

const mapStateToProps = state => {
  const { filesVisible } = state.sidebar
  const { files } = state.fileSystem

  return {
    filesVisible,
    files
  }
}

export default connect(mapStateToProps)(FilesSidebar)
