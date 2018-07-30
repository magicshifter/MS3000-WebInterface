import React, { Component } from 'react'
import PropTypes from "prop-types";
import Color from "color"

export default class PixelCanvas extends Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    tool: PropTypes.string.isRequired,
    color: PropTypes.object.isRequired,
    pixel: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    scale: PropTypes.number.isRequired,
  }

  // TODO: draw pixel here!
  componentDidMount() {
    var c = this.refs.canvas
    var ctx = c.getContext("2d");
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
    console.log("click canvas", evt)
  }

  onMouseMoveCanvas = (evt) => {
    console.log("move canvas", evt)
  }

  render() {
    //const color = Color.rgb(value.R, value.G, value.B)

    return (
      <canvas ref="canvas" onClick={this.onClickCanvas} onMouseMove={this.onMouseMoveCanvas} style={{border: "1px solid #000000"}}/>
    )
  }
}
