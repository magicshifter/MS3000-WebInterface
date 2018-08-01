import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { isInteger, isString } from '../utils/types'


export default class StringInput extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    max: PropTypes.number,
  }

  onChangeText = (evt) => {
    const { onChange, max } = this.props

    var x = evt.target.value
    if (x.length > max)
      x = x.substr(0, max)

    onChange(x)
  }

  render() {
    const { value, min, max } = this.props
    return (
      <input type='text' value={value} onChange={this.onChangeText} />
    )
  }
}
