import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default class IconButton extends Component {
  static propTypes = {
    icon: PropTypes.object.isRequired,
    tooltip: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  render() {
    const { icon, onClick, tooltip } = this.props

    const style = {}
    if (tooltip) {
      const l = tooltip.length
      if (l > 10) {
        style.width = l * 12
      }
    }

    return (
      <li className="pure-menu-item ToolsMenuTooltip">
        <span className="ToolsMenuTooltipText" style={style}>{tooltip}</span>
        <button className="pure-button" onClick={onClick}>
          <FontAwesomeIcon icon={icon} size="2x"/>
        </button>
      </li>
    )
  }
}


