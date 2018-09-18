import React, {Component} from 'react'
import PropTypes from "prop-types";
import Color from "color"
import {arrayForEach} from "../../../utils/functional";
import MIDIOctaveControl from "./MIDIOctaveControl";



const nrOfOctaves = 10
const firstOctave = -1

const boxSize = 32
const boxSpace = boxSize + 5
const offsetX = 1
const offsetY = 1


function getRelativeNDC(element, event) {
  let totalOffsetX = 0
  let totalOffsetY = 0

  const elementWidth = element.offsetWidth
  const elementHeight = element.offsetHeight

  do {
    totalOffsetX += element.offsetLeft
    totalOffsetY += element.offsetTop
    element = element.offsetParent
  } while (element)

  const canvasX = event.pageX - totalOffsetX
  const canvasY = event.pageY - totalOffsetY

  const ndcX = (1.0 * canvasX) / elementWidth
  const ndcY = 1 - (1.0 * canvasY) / elementHeight

  return [ndcX, ndcY]
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}



export default class MIDISequenceControl extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  }

  onChangeControl = (newValue, field) => {
    console.log("onChanged", newValue, field)
    //const v = this.getValue
  }

  // componentDidMount() {
  //   var c = this.canvasRef
  //   this.canvas = c
  //
  //   var ctx = c.getContext("2d");
  //   this.canvasContext = ctx
  //
  //   this.redraw()
  // }

  render() {
    const { field } = this.props
    const value = this.getValue()

    console.log("RENDER MIDISequ", field)

    const controls = []
    arrayForEach(value.steps, (step) => {
      controls.push(<MIDIOctaveControl field="TODO" onChange={this.onChangeControl} value={step.octave}/>)
    })


    // TODO: why -4 ??? margin??
    return (
        <div>
          {controls}
        </div>
    )
  }

  getValue = () => {
    let { value} = this.props
    value = value ? value.v : {
      steps: [
        { interval: { v: 0}, octave: { o: 5 }, mode: 0 },
        { interval: { v: 0}, octave: { o: 5 }, mode: 0 },
        { interval: { v: 0}, octave: { o: 5 }, mode: 0 },
        { interval: { v: 0}, octave: { o: 5 }, mode: 0 },
        { interval: { v: 0}, octave: { o: 5 }, mode: 0 },
        { interval: { v: 0}, octave: { o: 5 }, mode: 0 },
        { interval: { v: 0}, octave: { o: 5 }, mode: 0 },
        { interval: { v: 0}, octave: { o: 5 }, mode: 0 },
      ],
    }
    return value
  }
}
