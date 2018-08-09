import React, { Component } from 'react'
import PropTypes from "prop-types";
import { hexFromRGB, shadeRGB, equRGB } from "../../utils/color"
import floodFill from "n-dimensional-flood-fill"



function toolSL(size) {
  return -Math.floor(size/2)
}

function toolSR(size) {
  return Math.ceil(size/2)
}

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
    toolSize: PropTypes.number.isRequired,
    color: PropTypes.object.isRequired,
    pixel: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onPick: PropTypes.func.isRequired,
    scale: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    var c = this.refs.canvas
    var ctx = c.getContext("2d");
    this.canvasContext = ctx

    this.drawPixel()
  }

  getPixel = (x, y) => {
    const { pixel, width, height } = this.props

    if (x < 0 || x >= width || y < 0 || y >= height)
      return null

    const idx = y * width + x
    const v =  pixel.get(idx)
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

  forToolArea = (X, Y, fn) => {
    const { color, scale, toolSize} = this.props
    for (var xx = toolSL(toolSize); xx < toolSR(toolSize); xx++) {
      for (var yy = toolSL(toolSize); yy < toolSR(toolSize); yy++) {
        const x = X + xx
        const y = Y + yy

        const rgb = this.getPixel(x,y)
        if (!rgb)
          continue

        fn(x, y, rgb)
      }
    }
  }

  drawTool = (x, y) => {
    const { color, tool } = this.props
    if (tool === 'draw' || tool === 'erase')
      this.forToolArea(x, y, this.drawToolFn)
    else
      this.drawToolFn(x, y, this.getPixel(x,y))
  }

  drawToolFn = (x, y, rgb) => {
    const { color, scale } = this.props
    const ctx = this.canvasContext
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
    const { onChange, color, toolSize, width, height } = this.props
    const p = this.getPos(evt)

    //console.log("pixeling")

    const changes = []
    if (toolSize <= 1) {
      p.color = color
      changes.push(p)
    }
    else {
      const X = p.x
      const Y = p.y
      for (var xx = toolSL(toolSize); xx < toolSR(toolSize); xx++) {
        for (var yy = toolSL(toolSize); yy < toolSR(toolSize); yy++) {
          const x = X + xx
          const y = Y + yy

          if (x < 0 || x >= width || y < 0 || y >= height)
            continue

          const change = {x, y, color}
          changes.push(change)
        }
      }
    }

    onChange(changes, { usedColor: color })
  }

  useFillTool = (evt) => {
    const { onChange, color } = this.props
    var p = this.getPos(evt)

    const area = this.floodFill(p.x, p.y)

    const changes = []
    for (var i = 0; i < area.length; i++) {
      const pos = area[i]
      const change = { x: pos[0], y: pos[1], color }
      changes.push(change)
    }
    onChange(changes, { usedColor: color })
  }

  usePickTool = (evt) => {
    const { onPick } = this.props
    var p = this.getPos(evt)

    const color = this.getPixel(p.x, p.y)

    onPick(color)
  }


  useTool = (evt) => {
    const { tool } = this.props
    switch (tool) {
      case "draw":
        this.useDrawTool(evt)
        break;

      case "fill":
        this.useFillTool(evt)
        break;

      case 'pick':
        this.usePickTool(evt)
        break

      default:
        console.log("unknown tool", tool);

    }
  }

  onMouseDownCanvas = (evt) => {
    evt.preventDefault()
    this.useTool(evt)
  }

  onMouseMoveCanvas = (evt) => {
    evt.preventDefault()
    var p = this.getPos(evt)
    if (evt.buttons) {
      this.useTool(evt)
    }
    else {
      this.drawPixel()
      this.drawTool(p.x, p.y)
    }
  }

  // clearing tool preview
  onMouseLeaveCanvas = (evt) => {
    evt.preventDefault()
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
              style={{border: "0px solid #FFFFFF", userSelect: "none"}}/>
    )
  }


  // Floodfill
  floodFill = (x, y) => {
    const { width, height } = this.props

    const colorToFlood = this.getPixel(x, y)


    // Define our getter for accessing the data structure.
    const ctx = this
    const getter = function (x, y) {
      if (x >= 0 && x < width && y >= 0 && y < height) {
        const c = ctx.getPixel(x, y)
        return equRGB(c, colorToFlood) ? 1 : 0
      }
      else
        return false
    }

    // Flood fill over the data structure.
    const result = floodFill({
      getter: getter,
      seed: [x, y]
    });

    //console.log(result.flooded, result)

    return result.flooded
  }
}
