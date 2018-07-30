import React, { Component } from 'react'
import PropTypes from "prop-types";
import Color from "color"

export default class RGBControl extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
  }

  updateChannelFromRef = (channel) => {
    const { onChange, field } = this.props

    // get current RGB
    const value = this.getValue()

    var x = this.refs[channel].value
    var n = parseInt(x, 10)
    n = isNaN(n) ? 0 : n

    // change if needed
    if (n !== value[channel]) {
      const newValue = Object.assign({}, value, {[channel]: n})
      onChange(newValue, field)
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
    const { onChange, field } = this.props

    const x = this.refs.RGBA.value
    console.log("color cng", x)

    const color = Color(x)
    const newValue = {
      R: color.red(),
      G: color.green(),
      B: color.blue()
    }
    onChange(newValue, field)

  }

  getValue = () => {
    let { value } = this.props
    value = value || {R: 0, G: 0, B: 0}
    return value
  }

  render() {
    const value = this.getValue()
    const color = Color.rgb(value.R, value.G, value.B)

    return (
      <span>
        <input ref="RGBA" type="color" value={color.hex()} onChange={this.onChangeRGBA} />
        R <input ref="R" type="number" min="0" max="255" value={value.R} onChange={this.onChangeR}/>
        G <input ref="G" type="number" min="0" max="255" value={value.G} onChange={this.onChangeG}/>
        B <input ref="B" type="number" min="0" max="255" value={value.B} onChange={this.onChangeB}/>
      </span>
    )
  }
}
