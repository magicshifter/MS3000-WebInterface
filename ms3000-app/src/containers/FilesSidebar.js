import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {sidebarFilesVisible} from '../actions/pixelEditor'


import Sidebar from '../components/Sidebar'
import SelectableList from '../components/inputs/SelectableList'

import {faFolder, faSyncAlt } from '@fortawesome/free-solid-svg-icons'


import './App.css';
import IconButton from "../components/inputs/IconButton";
import { filesystemRefresh } from "../actions/filesystem";


class FilesSidebar extends Component {
  static propTypes = {
    filesVisible: PropTypes.bool.isRequired,
  }

  onChangeFilesSidebar = (newState) => {
    const { dispatch, filesVisible } = this.props
    dispatch(sidebarFilesVisible(newState))
  }

  onClickRefresh = () => {
    const { dispatch } = this.props
    dispatch(filesystemRefresh())
  }

  render() {
    const { filesVisible, files, isFetching, error } = this.props

    return (
      <Sidebar enlarged={filesVisible} onChange={this.onChangeFilesSidebar} icon={faFolder} tooltip='MS3000 Filesystem'
        right={0} top={0} >

        <IconButton icon={faSyncAlt} tooltip='refresh filesystem' onClick={this.onClickRefresh} rotate={isFetching}/>
        {error ? <p style={{color: 'red'}}>error: {error.toString()}</p> : null}
        {!files ?
          <p>Please press refresh to update the filelist</p> :
          <SelectableList listItems={files} fieldId='name' fieldText='name' lines={35}
                          select={this.selectFile} doubleClick={this.doubleClickFile}/>
        }
      </Sidebar>
    )
  }
}

const mapStateToProps = state => {
  const { filesVisible } = state.sidebar
  const { files, isFetching, error } = state.fileSystem

  return {
    filesVisible,
        isFetching,
    files, error
  }
}

export default connect(mapStateToProps)(FilesSidebar)
