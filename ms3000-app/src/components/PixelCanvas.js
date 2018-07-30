import React, { Component } from 'react'
import PropTypes from "prop-types";
import { hexFromRGB } from "../utils/color"



function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

export default class PixelCanvas extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    tool: PropTypes.string.isRequired,
    color: PropTypes.object.isRequired,
    pixel: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    scale: PropTypes.number.isRequired,
  }

  // TODO: draw pixel here!
  componentDidMount() {
    var c = this.refs.canvas
    var ctx = c.getContext("2d");

    var index = 0

    let { pixel, width, height, scale } = this.props


    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {

        ctx.fillStyle= hexFromRGB(pixel.get(index));
        ctx.fillRect(x*scale,y*scale,scale-2,scale-4);

        index++;
      }
    }


    ctx.moveTo(0, 0);
    ctx.lineTo(200, 100);
    ctx.stroke();
  }

  componentWillReceiveProps(nextProps) {
  }

  getPixel = (x, y) => {
    let { pixel, width } = this.props
    const idx = x + y * width
    return pixel[idx]
  }

  onClickCanvas = (evt) => {
    var p = getMousePos(this.refs.canvas, evt)

    
    console.log("click canvas", p, evt.target)
  }

  onMouseMoveCanvas = (evt) => {
    var p = getMousePos(this.refs.canvas, evt)
    console.log("mouse move canvas", p, evt.target)
  }

  render() {
    let { width, height, scale } = this.props


    const cw = width * scale
    const ch = height * scale

    return (
      <canvas ref="canvas" width={cw} height={ch}
              onClick={this.onClickCanvas} onMouseMove={this.onMouseMoveCanvas} style={{border: "1px solid #000000"}}/>
    )
  }
}
