import React, { Component } from 'react'
import PropTypes from "prop-types";


export default class EnumControl extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
  }

  onChangeSelect = (evt) => {
    const { field, onChange } = this.props

    const x = evt.target.value
    var n = parseInt(x, 10)
    n = isNaN(n) ? 0 : n

    onChange(n, field)
  }

  getValue = () => {
    let { value } = this.props
    value = value || 0
    return value
  }

  render() {
    const { field } = this.props
    const value = this.getValue()

    const root = field.root
    const t = root.lookupTypeOrEnum(field.type)
    //console.log("render enum", t)

    const controls = []

    const keys = Object.keys(t.values)
    for (var kk in keys) {
      const k = keys[kk]
      const f = t.values[k]
      //console.log(k)
      controls.push(<option key={f} value={f} label={k} />)
    }

    return (
      <select value={value} onChange={this.onChangeSelect}>
        {controls}
      </select>
    )
  }
}
