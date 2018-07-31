import React, { Component } from 'react'
import PropTypes from "prop-types";
import PixelPreview from './PixelPreview'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFireExtinguisher, faTrash, faClone, faArrowsAlt } from '@fortawesome/free-solid-svg-icons'


import {emptyPixel} from '../utils/color'

import './FrameList.css'


const PREVIEW_SCALE = 4


function DummyPreview({scale, width, height}) {
  return (
    <div style={{height: " " + (scale * height) + "px", width: " " + (PREVIEW_SCALE * width) + "px"}} />
  )
}

// function DummyPreview({scale, width, height}) {
//   return (
//     <canvas height={scale * height} width={scale * width} />
//   )
// }




function findDataInParents(target, trys = 5) {
  let parsed

  while (trys && target && isNaN(parsed = parseInt(target.dataset["idx"]))) {
    target = target.parentNode;
    trys--;
  }

  return { idx: parsed, isSpace: target.dataset["spacer"] === '1' }
}

export default class FrameList extends Component {
  static propTypes = {
    activeFrame: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    frames: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  onClickFrame = (evt) => {
    const {onChange} = this.props
    //console.log("clicked tool", evt)
    const frameNr = parseInt(evt.currentTarget.dataset["frame"] || "0")
    //console.log("clicked tool", frameNr)
    onChange(frameNr)
  }

  onClickAddFrame = (evt) => {
    const {onChange, frames, width, height} = this.props
    const newFrames = frames.slice(0)
    newFrames.push(emptyPixel(width, height))
    onChange(newFrames.length - 1, newFrames)
  }

  onClickDuplicateFrame = (evt) => {
    // dont let click go to select Frame!
    evt.stopPropagation();

    const {onChange, frames} = this.props
    const frameNr = parseInt(evt.currentTarget.dataset["frame"] || "0")

    const newFrames = frames.slice(0)
    newFrames.splice(frameNr, 0, frames[frameNr])

    onChange(frameNr + 1, newFrames)
  }

  onClickRemoveFrame = (evt) => {
    // dont let click go to select Frame!
    evt.stopPropagation();

    const {onChange, activeFrame, frames} = this.props
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

    const {frames, width, height, activeFrame} = this.props

    const fN = frames.length

    console.log("render framelist", frames)

    for (let i = 0; i < fN; i++) {
      const elem = frames[i]

      const className = activeFrame === i ? "FrameListActiveFrame" : "FrameListFrame"

      controls.push(
        <li className={"pure-menu-item FrameListSpacer"} ref={"s" + i} data-idx={i} data-spacer={1} style={{display:"none"}}>
          <DummyPreview width={width} height={height} scale={PREVIEW_SCALE} />
        </li>)

      controls.push(
        <li className={"pure-menu-item ToolsMenuTooltip " + className} data-frame={i} data-idx={i} ref={"i" + i}
            onClick={this.onClickFrame}
            draggable
            onDragStart={this.handleColorDragStart}
            onDragEnd={this.handleColorDragEnd}
            onDragOver={this.handleColorDragOver}
            onDrop={this.handleColorDrop}
        >

          <span className="FrameListDrag" data-frame={i} data-idx={i}

          >
            <FontAwesomeIcon color="white" icon={faArrowsAlt}/>
          </span>

          <span className="FrameListDelete" data-frame={i} onClick={this.onClickRemoveFrame}>
            <FontAwesomeIcon color="white" icon={faTrash}/>
          </span>

          <span className="FrameListDuplicate" data-frame={i} onClick={this.onClickDuplicateFrame}>
            <FontAwesomeIcon color="white" icon={faClone}/>
          </span>

          <PixelPreview data-frameNr={i} scale={PREVIEW_SCALE} width={width} height={height}
                        pixel={elem}

          />
        </li>
      )

      //style={{width: '4em',  display:"none", backgroundColor:'red'}}
    }

    controls.push(
      <li className={"pure-menu-item FrameListSpacer"} ref={"s" + fN} data-idx={fN} data-spacer={1} style={{display:"none"}}>
        <DummyPreview width={width} height={height} scale={PREVIEW_SCALE} />
      </li>)

    controls.push(
      <li className={"pure-menu-item ToolsMenuTooltip"}>
        <button className="pure-button" onClick={this.onClickAddFrame}>+ Add Frame</button>
      </li>
    )


    console.log("render framelist", frames)

    return controls
  }


  handleColorDragStart = (evt) => {
    const { idx } = findDataInParents(evt.target)

    if (!isNaN(idx)) {
      this.dndOneShot = true
      this.dndSourceIdx = idx
      this.dndLastIdx = idx
      this.dndLastSource = evt.target
      this.dndOriginalSpacer = this.refs["s" + idx]
      // console.log("DRagstart", this.dndLastSource.style.display)
      // console.warn("DRAGSGTRT", this.dndLastSource.style.position)

      this.dndLastSource.style.opacity = 0.3
      this.dndLastSource.style.maxWidth = 10

      //this.dndHAck = this.dndLastSource.style.position
      //this.dndLastSource.style.position = "absolute"
      //this.dndLastSource.style.transform = "translateX(-10px)"
      console.log("kjhkj", this.dndLastSource.style.display)

      evt.dataTransfer.setData("idx", idx);
      evt.dataTransfer.effectAllowed = 'move';
      //this.refs.deleteColor.style.display = "inline-block";
    }
    console.log("drag start", idx);
  }

  handleColorDragOver = (evt) => {
    evt.dataTransfer.dropEffect = 'move';

    if (this.dndOneShot) {

      this.dndLastSource.style.display = 'none'
      this.dndOriginalSpacer.style.display = ''
      //this.dndLastSpacer = this.dndOriginalSpacer
    }

    const { idx, isSpace } = findDataInParents(evt.target)

    //console.log("drag over", idx, evt.target);

    if (!isNaN(idx)) {
      if (this.dndLastSpacer) {
        this.dndLastSpacer.style.display = 'none'
      }

      var targetIdx = idx
      if (!isSpace && !this.dndOneShot) {
        if (this.dndLastIdx === idx) {
          targetIdx++
        }
      }

      // if (idx !== this.dndSourceIdx) {
      //   if (idx < this.dndSourceIdx) {
      //     targetIdx = idx
      //   }
      //   else {
      //     targetIdx = idx + 1
      //   }
      //
      //   const l = this.dndLastIdx
      //   const s = this.dndSourceIdx
      //
      //   // special case wehn we go from one side to the other
      //   if ((l === s - 1 && targetIdx === s + 2) || (l === s + 1 && targetIdx === s - 2)) {
      //     console.log("special draggin", l, targetIdx, s)
      //     targetIdx = s
      //   }
      //   else {
      //     console.log("draggin", l, targetIdx, s)
      //   }
      // }
      // else {
      //   targetIdx = idx
      // }
      this.dndLastSpacer = this.refs["s" + targetIdx]
      this.dndLastSpacer.style.display = ''

      this.dndLastIdx = targetIdx

      this.dndOneShot = false

      evt.preventDefault();
    }
  }

  handleColorDragEnd = (evt) =>
  {
    console.log("Drag end")

    if (this.dndLastSpacer) {
      this.dndLastSpacer.style.display = 'none'
      this.dndLastSpacer = null
    }

    if (this.dndLastSource) {
      this.dndLastSource.style.opacity = 1
      this.dndLastSource.style.display = ''
      this.dndLastSource.style.transform = ''
      this.dndLastSource = null
    }

    this.dndSourceIdx = null
  }

  handleColorDrop = (evt) => {
    // var target = evt.target;
    //
    // var trys = 5;
    // while (trys && target && isNaN(parseInt(target.dataset["idx"]))) {
    //   target = target.parentNode;
    //   trys--;
    // }
    //
    // var idx = parseInt(target.dataset["idx"]);
    // if (!isNaN(idx)) {
    //   var sourceIdx = parseInt(evt.dataTransfer.getData("idx"));
    //   if (!isNaN(sourceIdx)) {
    //     if (idx == -1) {
    //       var newPalette = EC.ECPalette.cloneColorsArray(this.state.palette);
    //       newPalette.splice(sourceIdx, 1);
    //
    //       this.setState({palette: newPalette, selectedIdx: undefined});
    //       this.refs.deleteColor.style.display = "none";
    //     }
    //     else {
    //       if (sourceIdx == idx || sourceIdx == idx - 1)
    //         return;
    //
    //       var color = this.state.palette[sourceIdx];
    //
    //       var newPalette = EC.ECPalette.cloneColorsArray(this.state.palette);
    //       if (idx < sourceIdx) {
    //         newPalette.splice(sourceIdx, 1);
    //         newPalette.splice(idx, 0, color);
    //       }
    //       else {
    //         newPalette.splice(idx, 0, color);
    //         newPalette.splice(sourceIdx, 1);
    //       }
    //
    //       this.setState({palette: newPalette, selectedIdx: idx});
    //       this.refs.deleteColor.style.display = "none";
    //     }
    //   }
    // }
  }
}

