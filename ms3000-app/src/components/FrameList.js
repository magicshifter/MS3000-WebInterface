import React, { Component } from 'react'
import PropTypes from "prop-types";
import PixelPreview from './PixelPreview'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFireExtinguisher, faTrash, faClone, faArrowsAlt } from '@fortawesome/free-solid-svg-icons'


import {emptyPixel} from '../utils/color'

import './FrameList.css'

export default class FrameList extends Component {
  static propTypes = {
    activeFrame: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    frames: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  onClickFrame = (evt) => {
    const { onChange } = this.props
    //console.log("clicked tool", evt)
    const frameNr = parseInt(evt.currentTarget.dataset["frame"] || "0")
    //console.log("clicked tool", frameNr)
    onChange(frameNr)
  }

  onClickAddFrame = (evt) => {
    const { onChange, frames, width, height } = this.props
    const newFrames = frames.slice(0)
    newFrames.push(emptyPixel(width, height))
    onChange(newFrames.length - 1, newFrames)
  }

  onClickDuplicateFrame = (evt) => {
    // dont let click go to select Frame!
    evt.stopPropagation();

    const { onChange, frames } = this.props
    const frameNr = parseInt(evt.currentTarget.dataset["frame"] || "0")

    const newFrames = frames.slice(0)
    newFrames.splice(frameNr, 0, frames[frameNr])

    onChange(frameNr + 1, newFrames)
  }

  onClickRemoveFrame = (evt) => {
    // dont let click go to select Frame!
    evt.stopPropagation();

    const { onChange, activeFrame, frames } = this.props
    //console.log("clicked tool", evt)
    const frameNr = parseInt(evt.currentTarget.dataset["frame"] || "0")

    const newFrames = frames.slice(0)
    newFrames.splice(frameNr, 1);

    var newIdx = activeFrame >= frameNr ? activeFrame - 1 : activeFrame
    if (newIdx < 0) newIdx = 0

    onChange(newIdx, newFrames)
  }

  render() {
    const controls = []

    const { frames, width, height, activeFrame } = this.props

    console.log("render framelist", frames)

    for (let i = 0; i < frames.length; i++) {
      const elem = frames[i]

      const className = activeFrame === i ? "FrameListActiveFrame" : "FrameListFrame"

      controls.push(
        <li className={"pure-menu-item ToolsMenuTooltip " + className} data-frame={i} onClick={this.onClickFrame} >

          <span className="FrameListDrag" data-frame={i}
                draggable
                onDragStart={this.handleColorDragStart}
                onDragEnd={this.handleColorDragEnd}
                onDragOver={this.handleColorDragOver}
                onDrop={this.handleColorDrop}
          >
            <FontAwesomeIcon color="white" icon={faArrowsAlt}/>
          </span>

          <span className="FrameListDelete" data-frame={i} onClick={this.onClickRemoveFrame} >
            <FontAwesomeIcon color="white" icon={faTrash}/>
          </span>

          <span className="FrameListDuplicate" data-frame={i} onClick={this.onClickDuplicateFrame} >
            <FontAwesomeIcon color="white" icon={faClone}/>
          </span>

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


    console.log("render framelist", frames)

    return controls
  }
}
