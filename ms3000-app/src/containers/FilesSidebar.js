import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {sidebarFilesVisible} from '../actions'


import Sidebar from '../components/Sidebar'
import SelectableList from '../components/inputs/SelectableList'

import {faFolder} from '@fortawesome/free-solid-svg-icons'


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
      <Sidebar enlarged={filesVisible} onChange={this.onChangeFilesSidebar} icon={faFolder} tooltip='MS3000 Filesystem'
        right={0} top={0} >
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
