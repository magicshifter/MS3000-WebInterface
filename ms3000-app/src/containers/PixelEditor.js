import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Color from "color"

import { pixelEditorSetTool } from '../actions'

import PixelCanvas from '../components/PixelCanvas'
import ToolsMenu from '../components/ToolsMenu'
import ColorPalette from '../components/ColorPalette'

import {connect} from "react-redux";

import { faEraser, faPencilAlt, faPaintBrush, faEyeDropper } from '@fortawesome/free-solid-svg-icons'

import './PixelEditor.css'


import { RGB } from '../utils/color'
const bogusPalette = [
  RGB(255,0,0),
  RGB(255,255,0),
  RGB(255,0,255),
  RGB(0,255,255),
  RGB(0,0,0),
  RGB(255,255,255),
]


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
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    tool: PropTypes.string,
    color: PropTypes.object,
    pixel: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  onChangePixel = (evt) => {
    console.log("change pixel", evt)
  }

  onChangePalette = (color) => {
    const { dispatch } = this.props
    console.log("color selected in App", color)
    //dispatch(receiveShifterState(newState))
  }

  render() {
    const { width, height, tool, color, pixel } = this.props

    return (
      <div>
        <ToolsMenu structure={toolbarStructure} tool={tool} onChange={this.onClickTool}/>
        <ColorPalette palette={bogusPalette} onChange={this.onChangePalette}/>
        <PixelCanvas width={width} height={height} tool={tool} color={color} pixel={pixel} scale={20} onChange={this.onChangePixel}/>
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
  const { width, height, color, tool, pixel } = state.pixelEditor

  return {
    width, height, color, tool, pixel
  }
}

export default connect(mapStateToProps)(PixelEditor)
