import React, { Component } from 'react'
import PropTypes from "prop-types";

import Color from "color"

function toHex(c) {
  return "#" + c.R.toString(16) + c.G.toString(16) + c.B.toString(16)
}

export default class EnumControl extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.optional,
  }



  onChangeSelect = (evt) => {
    const { onChange } = this.props

    const x = evt.target.value
    var n = parseInt(x)
    n = isNaN(n) ? 0 : n

    onChange(n)

  }

  getValue = () => {
    let { value } = this.props
    value = value || 0
    return value
  }

  render() {
    const { field, onChange } = this.props
    const value = this.getValue()


    const root = field.root
    const t = root.lookupTypeOrEnum(field.type)

    console.log("render enum", t)

    const controls = []

    const keys = Object.keys(t.values)
    console.log("the keys", keys)
    for (var kk in keys) {
      const k = keys[kk]
      const f = t.values[k]

      console.log(k)

      controls.push(<option value={f} label={k} />)
    }

    return (
      <select value={value} onChange={this.onChangeSelect}>
        {controls}
      </select>
    )
  }
}
