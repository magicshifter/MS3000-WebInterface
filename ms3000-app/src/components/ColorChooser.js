import React, { Component } from 'react'
import PropTypes from "prop-types";
import { hexFromRGB, equRGB, createRGBFromHex } from '../utils/color'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './ColorChooser.css'

export default class ColorChooser extends Component {
  static propTypes = {
    color: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const { color } = this.props

    return (
      <span className="ColorChooser" style={{backgroundColor: hexFromRGB(color)}}>
        <input  type="color" value={hexFromRGB(color)} onChange={this.onChangeColor}/>
      </span>
    )
  }

  onChangeColor = (evt) => {
    const { color, onChange} = this.props
    const hex = evt.target.value
    const rgb = createRGBFromHex(hex)
    onChange(rgb)
  }
}
