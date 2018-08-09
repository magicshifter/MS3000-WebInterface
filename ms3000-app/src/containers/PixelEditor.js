import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  pixelEditorSetTool,
  pixelEditorChangePixelList,
  pixelEditorSetColor,
  pixelEditorChangeSize,
  pixelEditorChangeImage,
  pixelEditorResetImage,
  pixelEditorSetActiveFrame,
  pixelEditorSetImageName,
  pixelEditorSetToolSize,
  pixelEditorSetPalette,
  pixelEditorAddToPalette
} from '../actions'
import { ActionCreators } from 'redux-undo';

import PixelCanvas from '../components/PixelEditor/PixelCanvas'
import ToolsMenu from '../components/PixelEditor/ToolsMenu'
import ToolSizes from '../components/PixelEditor/ToolSizes'
import ColorPalette from '../components/PixelEditor/ColorPalette'
import ColorChooser from '../components/PixelEditor/ColorChooser'
import StringInput from '../components/inputs/StringInput'
import NumberInput from '../components/inputs/NumberInput'
import FrameList from '../components/PixelEditor/FrameList'

import Image from '../ms3000/Image'

import { saveAs } from 'file-saver'
import { connect } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEraser, faPencilAlt, faPaintBrush, faEyeDropper, faSave, faFolderOpen, faUpload, faRecycle,  faTint, faUndo, faRedo,

  faCogs, faCloudDownloadAlt, faCloudUploadAlt,
  faFile, // for new?
  faPlusSquare, // add frame
  faSyncAlt, // als spinner
  faWifi,

} from '@fortawesome/free-solid-svg-icons'


import './PixelEditor.css'


const toolbarStructure = [
  {
    name: 'draw',
    icon: faPencilAlt,
  },
  {
    name: 'fill',
    icon: faTint,
  },
  {
    name: 'erase',
    icon: faEraser,
  },
  {
    name: 'pick',
    icon: faEyeDropper,
  },
]

const toolSizes = [ 1, 2, 3, 4]


class PixelEditor extends Component {
  static propTypes = {
    frameIdx: PropTypes.number.isRequired,
    imageName: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    tool: PropTypes.string,
    color: PropTypes.object,
    frames: PropTypes.array.isRequired,
    palette: PropTypes.array.isRequired,
    enableUndo: PropTypes.bool,
    enableRedo: PropTypes.bool,
  }

  shortcutsKeyDown = (evt) => {
    //console.log("shortcutsKeyDown", evt.keyCodee)

    // ctrl for linux, win, meta for mac
    if (evt.ctrlKey || evt.metaKey) {
      // Z
      if (evt.keyCode === 90) {
        evt.preventDefault()
        const { dispatch } = this.props
        dispatch(ActionCreators.undo())
      }
      // Y
      else if (evt.keyCode === 89) {
        evt.preventDefault()
        const { dispatch } = this.props
        dispatch(ActionCreators.redo())
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.shortcutsKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.shortcutsKeyDown, false);
  }

  onChangePixel = (pixelChanges) => {
    const { dispatch, frameIdx } = this.props
    dispatch(pixelEditorChangePixelList(pixelChanges, frameIdx))
  }

  onChangePick = (color) => {
    const { dispatch } = this.props
    dispatch(pixelEditorAddToPalette(color))
  }

  onChangePalette = (color) => {
    const { dispatch } = this.props
    //console.log("color selected in App from Palette", color)
    dispatch(pixelEditorSetColor(color))
  }

  onChangeWidth = (newWidth) => {
    const { dispatch } = this.props
    dispatch(pixelEditorChangeSize(newWidth))
  }

  onChangeName = (newName) => {
    const { dispatch } = this.props
    dispatch(pixelEditorSetImageName(newName))
  }

  onChangeFrames = (newFrameIdx, newFrames) => {
    const { dispatch, width, height } = this.props
    if (newFrames) {
      //console.log("onChangeFrames newFrames")
      dispatch(pixelEditorChangeImage(new Image(width, height, newFrames), newFrameIdx))
    }
    else {
      //console.log("onChangeFrames only idx")
      dispatch(pixelEditorSetActiveFrame(newFrameIdx))
    }
  }

  onExportImage = () => {
    const { width, height, frames, imageName } = this.props

    const fileName = imageName + ".png"
    const img = new Image(width, height, frames)
    const arrayBuffer = img.toPNG()

    //console.log("aexorting arraybuffer", arrayBuffer)

    const blob = new Blob([arrayBuffer], { type: 'application/octet-stream' })
    saveAs(blob, fileName);
  }

  //  handles click when we dont hit label of hidden file input
  uploadClickHAck = (evt) => {
    if (evt.target != this.refs.fileUpload) {
      this.refs.fileUpload.click()
      evt.preventDefault()
    }
  }

  onImportImage = (evt) => {
    //console.log("nr of files selected: " + evt.target.files.length);
    var files = evt.target.files; // FileList object

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      //console.log(file)
      let pName = file.name;
      var reader = new FileReader();
      reader.onload = (evt) => {
        var arrayBuffer = evt.target.result;
        const i = Image.fromPNG(arrayBuffer)
        if (!i) {
          return
        }

        const { dispatch } = this.props
        dispatch(pixelEditorChangeImage(i))

      }
      reader.readAsArrayBuffer(file) // start async operation
    }
    evt.target.value = null
  };

  onClickNew = () => {
    const { dispatch } = this.props
    dispatch(pixelEditorResetImage())
  }

  onClickUndo = () => {
    const { dispatch } = this.props
    dispatch(ActionCreators.undo())
  }

  onClickRedo = () => {
    const { dispatch } = this.props
    dispatch(ActionCreators.redo())
  }

  render() {
    const { width, height, tool, toolSize, color, frames, frameIdx, palette, imagePalette, imageName, enableRedo, enableUndo } = this.props
    const pixel = frames[frameIdx]

    return (
      <div>
        <div className="pure-menu pure-menu-horizontal" style={{paddingBottom: "0px"}}>
          <ul className="pure-menu-list">
            <li className="pure-menu-item ToolsMenuTooltip">
              <span className="ToolsMenuTooltipText" style={{width: "120px"}}>new Image</span>
              <button className="pure-button" onClick={this.onClickNew}>
                <FontAwesomeIcon icon={faFile} size="2x" style={{textShadow: "2px 2px #ff0000"}}/>
              </button>
            </li>
            <li className="pure-menu-item">
              name: <StringInput value={imageName} max={32} onChange={this.onChangeName} />
            </li>
            <li className="pure-menu-item">
              width: <NumberInput value={width} min={1} max={64} onChange={this.onChangeWidth} />
            </li>
            <li className="pure-menu-item ToolsMenuTooltip">
              <span className="ToolsMenuTooltipText" style={{width: "120px"}}>save as PNG</span>
                <button className="pure-button" onClick={this.onExportImage}>
                  <FontAwesomeIcon icon={faSave} size="2x" style={{textShadow: "2px 2px #ff0000"}}/>
                </button>
            </li>
            <li className="pure-menu-item ToolsMenuTooltip">
              <span className="ToolsMenuTooltipText" style={{width: "240px"}}>open PNG or MagicBitmap</span>
              <button className="pure-button" onClick={this.uploadClickHAck}>
                <label htmlFor="ImportImage">
                  <FontAwesomeIcon icon={faFolderOpen} size="2x" style={{textShadow: "2px 2px #ff0000"}}/>
                  <input
                    ref="fileUpload"
                    id="ImportImage"
                    style={{display:"none"}}
                    multiple
                    type="file"
                    name="file"
                    accept=".png,.magicBitmap"
                    onChange={this.onImportImage}
                  />
                </label>
              </button>
            </li>
            <li className="pure-menu-item ToolsMenuTooltip">
              <span className="ToolsMenuTooltipText" style={{width: "260px"}}>upload to MagicShifter</span>
              <button className="pure-button" onClick={this.onUploadToShifter}>
                <FontAwesomeIcon icon={faUpload} size="2x" style={{textShadow: "2px 2px #ff0000"}}/>
              </button>
            </li>

            {enableUndo ?
              <li className="pure-menu-item ToolsMenuTooltip">
                <span className="ToolsMenuTooltipText">undo</span>
                <button className="pure-button" onClick={this.onClickUndo}>
                  <FontAwesomeIcon icon={faUndo} size="2x" style={{textShadow: "2px 2px #ff0000"}}/>
                </button>
              </li>
              : null}

            {enableRedo ?
              <li className="pure-menu-item ToolsMenuTooltip">
                <span className="ToolsMenuTooltipText">redo</span>
                <button className="pure-button" onClick={this.onClickRedo}>
                  <FontAwesomeIcon icon={faRedo} size="2x" style={{textShadow: "2px 2px #ff0000"}}/>
                </button>
              </li>
              : null}
          </ul>
        </div>
        <div className="pure-menu pure-menu-horizontal" style={{paddingBottom: "0px"}}>
          <ul className="pure-menu-list">
            <li className="pure-menu-item">
              <ColorChooser color={color} onChange={this.onChangePalette}/>
            </li>
            <ToolsMenu structure={toolbarStructure} tool={tool} onChange={this.onClickTool}/>
          </ul>
          <ul className="pure-menu-list">
            <ToolSizes sizes={toolSizes} value={toolSize} onChange={this.onClickToolSize}/>
          </ul>
        </div>
        <div className="pure-menu pure-menu-horizontal pure-menu-scrollable" style={{padding: "0px"}}>
          <ul className="pure-menu-list">
            <FrameList frames={frames} width={width} height={height} activeFrame={frameIdx}
                       onChange={this.onChangeFrames} />
          </ul>
        </div>
        <div className="pure-menu pure-menu-horizontal pure-menu-scrollable" style={{padding: "0px"}}>
          <ul className="pure-menu-list">
            <ColorPalette palette={palette} onChange={this.onChangePalette} activeColor={color}/>
          </ul>
        </div>
        <div className="pure-menu pure-menu-horizontal pure-menu-scrollable" style={{padding: "0px"}}>
          <ul className="pure-menu-list">
            <ColorPalette palette={imagePalette} onChange={this.onChangePalette} activeColor={color}/>
          </ul>
        </div>
        <div className="pure-menu pure-menu-horizontal pure-menu-scrollable" style={{paddingTop: "0px"}}>
          <ul className="pure-menu-list">
            {pixel ?
              <PixelCanvas width={width} height={height} tool={tool} toolSize={toolSize} color={color} pixel={pixel} scale={25}
                           onChange={this.onChangePixel} onPick={this.onChangePick}/>
              : <span>No Frames :( Are you happy now?!?</span>
            }
          </ul>
        </div>
      </div>
    )
  }

  onClickTool = (newTool) => {
    //console.log("PixelEditor tool menu changed", newTool)
    const { dispatch } = this.props
    dispatch(pixelEditorSetTool(newTool))
  }

  onClickToolSize = (newToolSize) => {
    //console.log("PixelEditor tool size changed", newToolSize)
    const { dispatch } = this.props
    dispatch(pixelEditorSetToolSize(newToolSize))
  }
}

const mapStateToProps = state => {
  const { width, height, color, tool, toolSize, frames, palette, imagePalette, frameIdx, imageName } = state.pixelEditor.present
  const { past, future } = state.pixelEditor

  return {
    width, height, color, tool, toolSize, frames, palette, imagePalette, frameIdx, imageName,
    enableUndo: past.length > 0,
    enableRedo: future.length > 0
  }
}

export default connect(mapStateToProps)(PixelEditor)
