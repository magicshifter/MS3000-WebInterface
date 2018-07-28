import React, { Component } from 'react'
import PropTypes from "prop-types";

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

  onChangeR = () => {
    const { onChange } = this.props
    const value = this.getValue()

    var x = this.refs.R.value
    var n = parseInt(x)
    console.log(x, n)

    const changed = Object.assign({}, value, {R: n})
    onChange(changed)
  }

  onChangeG = () => {

  }

  onChangeB = () => {

  }

  getValue = () => {
    let { value } = this.props
    value = value || {R: 0, G: 0, B: 0}
    return value
  }

  render() {
    const { field, onChange } = this.props
    const value = this.getValue()

    const hex = toHex(value)

    return (
      <div>
        R <input ref="R" type="number" id="eyes" min="0" max="255" value={value.R} onChange={this.onChangeR}/>
        G <input value={value.G} onChange={this.onChangeG}/>
        B <input value={value.B} onChange={this.onChangeB}/>

        <input type="color" value={hex}/>
      </div>
    )
  }
}
