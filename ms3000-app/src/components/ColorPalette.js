import React, { Component } from 'react'
import PropTypes from "prop-types";
import { hexFromRGB } from '../utils/color'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './ColorPalette.css'

class ColorButton extends Component {
  static propTypes = {
    color: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  render() {
    const { color, onClick} = this.props

    return (<span data-color={color} onClick={onClick} className="PaletteItem" style={{backgroundColor: hexFromRGB(color)}} />)
  }

  onClickColor = () => {
    const { color, onClick} = this.props
    onClick(color)
  }
}

export default class ColorPalette extends Component {
  static propTypes = {
    palette: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  onClickPalette = (color) => {
    const { onChange } = this.props
    console.log("clicked tool", color)
    onChange(color)
  }

  render() {
    const controls = []

    const {palette, tool} = this.props

    for (let i = 0; i < palette.length; i++) {
      const elem = palette[i]

      controls.push(
        <ColorButton color={elem} onClick={this.onClickPalette}/>
      )

    }

    return (
      <span>
        {controls}
      </span>
    )
  }
}
