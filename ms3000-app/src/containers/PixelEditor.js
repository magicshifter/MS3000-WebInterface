import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  pixelEditorSetTool,
  pixelEditorChangePixelList,
  pixelEditorSetColor,
  pixelEditorChangeSize,
  pixelEditorChangeImage,
  pixelEditorSetActiveFrame,
} from '../actions'
import PixelCanvas from '../components/PixelCanvas'
import ToolsMenu from '../components/ToolsMenu'
import ColorPalette from '../components/ColorPalette'
import ColorChooser from  '../components/ColorChooser'
import NumberInput from '../components/NumberInput'
import FrameList from '../components/FrameList'

import Image from '../ms3000/Image'

import { saveAs } from 'file-saver'



import {connect} from "react-redux";

import { faEraser, faPencilAlt, faPaintBrush, faEyeDropper } from '@fortawesome/free-solid-svg-icons'

import './PixelEditor.css'


const toolbarStructure = [
  {
    name: 'draw',
    icon: faPencilAlt,
  },
  {
    name: 'fill',
    icon: faPaintBrush,
  },
  {
    name: 'erase',
    icon: faEraser,
  },
  {
    name: 'pickColor',
    icon: faEyeDropper,
  },
]


class PixelEditor extends Component {
  static propTypes = {
    frameIdx: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    tool: PropTypes.string,
    color: PropTypes.object,
    frames: PropTypes.array.isRequired,
    palette: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  onChangePixel = (pixelChanges) => {
    const { dispatch, frameIdx } = this.props
    dispatch(pixelEditorChangePixelList(pixelChanges, frameIdx))
  }

  onChangePalette = (color) => {
    const { dispatch } = this.props
    console.log("color selected in App from Palette", color)
    dispatch(pixelEditorSetColor(color))
  }

  onChangeWidth = (newWidth) => {
    const { dispatch } = this.props
    dispatch(pixelEditorChangeSize(newWidth))
  }

  // TODO: implement frameIdx!
  onChangeFrameIdx = (newFrameIdx) => {
    const { dispatch } = this.props
    dispatch(pixelEditorSetActiveFrame(newFrameIdx))
  }

  onChangeFrames = (newFrames) => {
    const { dispatch, width, height } = this.props
    dispatch(pixelEditorChangeImage(new Image(width, height, newFrames)))
  }

  // TODO: implement frames
  onExportImage = () => {
    const { width, height, frames } = this.props

    const fileName = "myExport.png"
    const img = new Image(width, height, frames)
    const arrayBuffer = img.toPNG()

    console.log("aexorting arraybuffer", arrayBuffer)

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
      console.log(file)
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

  render() {
    const { width, height, tool, color, frames, frameIdx, palette } = this.props
    const pixel = frames[frameIdx]

    return (
      <div>
        <div className="pure-menu pure-menu-horizontal" style={{paddingBottom: "0px"}}>
          <ul className="pure-menu-list">
            <ToolsMenu structure={toolbarStructure} tool={tool} onChange={this.onClickTool}/>
          </ul>
          <ul className="pure-menu-list">
            <li className="pure-menu-item">
              <ColorChooser color={color} onChange={this.onChangePalette}/>
            </li>
            <li className="pure-menu-item">
              width: <NumberInput value={width} min={1} max={64} onChange={this.onChangeWidth} />
            </li>
            <li className="pure-menu-item">
              <button className="pure-button" onClick={this.onExportImage}>save PNG</button>
            </li>
            <li className="pure-menu-item">
              <button className="pure-button" onClick={this.uploadClickHAck}>
                <label for="ImportImage"><div>import PNG</div>
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
          </ul>
        </div>
        <div className="pure-menu pure-menu-horizontal pure-menu-scrollable" style={{padding: "0px"}}>
          <ul className="pure-menu-list">
            <FrameList frames={frames} width={width} height={height} activeFrame={frameIdx}
                       onChange={this.onChangeFrameIdx} onChangeFrames={this.onChangeFrames}/>
          </ul>
        </div>
        <div className="pure-menu pure-menu-horizontal pure-menu-scrollable" style={{padding: "0px"}}>
          <ul className="pure-menu-list">
            <ColorPalette palette={palette} onChange={this.onChangePalette} activeColor={color}/>
          </ul>
        </div>
        <div className="pure-menu pure-menu-horizontal pure-menu-scrollable" style={{paddingTop: "0px"}}>
          <ul className="pure-menu-list">
            <PixelCanvas width={width} height={height} tool={tool} color={color} pixel={pixel} scale={25} onChange={this.onChangePixel}/>
          </ul>
        </div>
      </div>
    )
  }

  onClickTool = (newTool) => {
    console.log("PixelEditor tool menu changed", newTool)
    const { dispatch } = this.props
    dispatch(pixelEditorSetTool(newTool))
  }
}

const mapStateToProps = state => {
  const { width, height, color, tool, frames, palette, frameIdx } = state.pixelEditor

  return {
    width, height, color, tool, frames, palette, frameIdx
  }
}

export default connect(mapStateToProps)(PixelEditor)
