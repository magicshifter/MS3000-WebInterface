import React, { Component } from 'react'
import PropTypes from "prop-types";
import PixelPreview from './PixelPreview'

import {emptyPixel} from '../utils/color'

import './FrameList.css'

export default class FrameList extends Component {
  static propTypes = {
    activeFrame: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    frames: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    onChangeFrames: PropTypes.func.isRequired,
  }

  onClickFrame = (evt) => {
    const { onChange } = this.props
    //console.log("clicked tool", evt)
    const frameNr = parseInt(evt.currentTarget.dataset["frame"] || "0")
    //console.log("clicked tool", frameNr)
    onChange(frameNr)
  }

  onClickAddFrame = (evt) => {
    const { onChangeFrames, frames, width, height } = this.props
    const newFrames = frames.slice(0)
    newFrames.push(emptyPixel(width, height))
    onChangeFrames(newFrames)
  }

  render() {
    const controls = []

    const { frames, width, height, activeFrame } = this.props

    for (let i = 0; i < frames.length; i++) {
      const elem = frames[i]

      const className = activeFrame === i ? "FrameListActiveFrame" : "FrameListFrame"

      controls.push(
        <li className={"pure-menu-item ToolsMenuTooltip " + className} data-frame={i} onClick={this.onClickFrame} >
          <PixelPreview data-frameNr={i} scale={3} width={width} height={height}
                        pixel={elem}

          />
        </li>
      )
    }

    controls.push(
      <li className={"pure-menu-item ToolsMenuTooltip"} >
        <button className="pure-button" onClick={this.onClickAddFrame}>+ Add Frame</button>
      </li>
    )

    return controls
  }
}
