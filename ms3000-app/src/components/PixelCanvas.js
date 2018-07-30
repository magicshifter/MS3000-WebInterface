import React, { Component } from 'react'
import PropTypes from "prop-types";
import { hexFromRGB, shadeRGB, equRGB } from "../utils/color"






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

  constructor(props) {
    super(props)

    this.state = {
      hover: {x:-100, y:-100}
    }
  }

  componentDidMount() {
    var c = this.refs.canvas
    var ctx = c.getContext("2d");
    this.canvasContext = ctx

    this.drawPixel()
  }

  getPixel = (x, y) => {
    const idx = y * this.props.width + x
    const v =  this.props.pixel.get(idx)
    return v
  }

  drawPixel = () => {
    var index = 0

    const { pixel, width, height, scale } = this.props
    const ctx = this.canvasContext

    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {

        ctx.fillStyle= hexFromRGB(pixel.get(index));
        ctx.fillRect(x*scale,y*scale,scale-1,scale-1);

        index++;
      }
    }
  }

  drawTool = (x, y) => {
    const { pixel, width, height, color, scale } = this.props
    const ctx = this.canvasContext

    const rgb = this.getPixel(x,y)
    if (!equRGB(rgb, color)) {
      const shaded = shadeRGB(rgb)
      ctx.fillStyle = hexFromRGB(shaded);
      ctx.fillRect(x * scale, y * scale, scale - 1, scale - 1);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.drawPixel()
  }

  getPos = (evt) => {
    let { width, height, scale } = this.props
    var p = getMousePos(this.refs.canvas, evt)

    var px = Math.floor(p.x / scale)
    var py = Math.floor(p.y / scale)

    if (px < 0) px = 0
    else if (px >= width) px = width - 1
    if (py < 0) py = 0
    else if (py >= height) py = height - 1

    return {x: px, y: py}
  }

  useDrawTool = (evt) => {
    const { onChange, color } = this.props
    var p = this.getPos(evt)
    p.color = color
    onChange([p], { usedColor: color })
  }

  useFillTool = (evt) => {
    const { onChange, color } = this.props
    var p = this.getPos(evt)
    p.color = color
    onChange([p], { usedColor: color })
  }

  useToole = (evt) => {
    const { tool } = this.props
    switch (tool) {
      case "draw":
        this.useDrawTool(evt)
        break;

      case "fill":
        this.useDrawTool(evt)
        break;

      default:
        console.log("unknown tool", tool);

    }
  }

  onMouseDownCanvas = (evt) => {
    const { onChange, color } = this.props
    var p = this.getPos(evt)
    p.color = color
    onChange([p])
  }

  onMouseMoveCanvas = (evt) => {
    var p = this.getPos(evt)
    if (evt.buttons) {
      const {onChange, color} = this.props
      p.color = color
      onChange([p])
    }
    else {
      this.drawPixel()
      this.drawTool(p.x, p.y)
    }
  }

  onMouseLeaveCanvas = (evt) => {
    this.drawPixel()
  }

  render() {
    let { width, height, scale } = this.props


    const cw = width * scale
    const ch = height * scale

    return (
      <canvas ref="canvas" width={cw} height={ch}
              onMouseDown={this.onMouseDownCanvas}
              onMouseMove={this.onMouseMoveCanvas}
              onMouseLeave={this.onMouseLeaveCanvas}
              style={{border: "0px solid #FFFFFF"}}/>
    )
  }
}
