import React, { Component } from 'react'
import PropTypes from "prop-types";

import Color from "color"

function toHex(c) {
  return "#" + c.R.toString(16) + c.G.toString(16) + c.B.toString(16)
}

export default class RGBControl extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.optional,
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
  }

  updateChannelFromRef = (channel) => {
    const { onChange } = this.props

    // get current RGB
    const value = this.getValue()

    var x = this.refs[channel].value
    var n = parseInt(x)
    n = isNaN(n) ? 0 : n

    console.log(x, n)

    // onChange if needed
    if (n !== value[channel]) {
      const newValue = Object.assign({}, value, {[channel]: n})
      onChange(newValue)
    }
  }

  onChangeR = () => {
    this.updateChannelFromRef('R')
  }

  onChangeG = () => {
    this.updateChannelFromRef('G')
  }

  onChangeB = () => {
    this.updateChannelFromRef('B')
  }

  onChangeRGBA = () => {
    const { onChange } = this.props

    const x = this.refs.RGBA.value
    console.log("color cng", x)

    const color = Color(x)
    const newValue = {
      R: color.red(),
      G: color.green(),
      B: color.blue()
    }
    onChange(newValue)

  }

  getValue = () => {
    let { value } = this.props
    value = value || {R: 0, G: 0, B: 0}
    return value
  }

  render() {
    const { field, onChange } = this.props
    const value = this.getValue()

    const color = Color.rgb(value.R, value.G, value.B)

    //const color = Color.rgb(0, 124, 234)



    return (
      <span>
        R <input ref="R" type="number" id="eyes" min="0" max="255" value={value.R} onChange={this.onChangeR}/>
        G <input ref="G" value={value.G} onChange={this.onChangeG}/>
        B <input ref="B" value={value.B} onChange={this.onChangeB}/>

        <input ref="RGBA" type="color" value={color.hex()} onChange={this.onChangeRGBA} />
      </span>
    )
  }
}
