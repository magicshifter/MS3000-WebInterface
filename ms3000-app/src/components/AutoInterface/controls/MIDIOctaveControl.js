import React, {Component} from 'react'
import PropTypes from "prop-types";
import Color from "color"



const nrOfOctaves = 10
const firstOctave = -1


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



export default class MIDIOctaveControl extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
  }

  componentDidMount() {
    var c = this.canvasRef
    this.canvas = c

    var ctx = c.getContext("2d");
    this.canvasContext = ctx

    this.redraw()
  }

  render() {
    const value = this.getValue()

    this.redraw()

    return (
      <span>
        I'm an octave
        <canvas width={400} height={40} ref={this.setupRefCanvas} onClick={this.onClickCanvas} />
      </span>
    )
  }

  redraw = () => {
    const ctx = this.canvasContext
    if (!ctx) return

    const boxSize = 32
    const boxSpace = boxSize + 0
    const offsetX = 1
    const offsetY = 1


    for (let i = 0; i < nrOfOctaves; i++) {
      ctx.beginPath();
      ctx.rect(offsetX + i * boxSpace, offsetY, boxSize, boxSize);
      ctx.stroke();
    }
  }

  getValue = () => {
    let { value,} = this.props
    value = value || {R: 0, G: 0, B: 0}
    return value
  }

  setupRefCanvas = (theCanvas) => {
    this.canvasRef = theCanvas
  }

  onClickCanvas = (evt) => {
    const pos  = getRelativeNDC(this.canvasRef, evt)
    console.log("clicked", pos)
  }
}
