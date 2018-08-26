import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default class IconButton extends Component {
  static propTypes = {
    icon: PropTypes.object.isRequired,
    tooltip: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    rotate: PropTypes.bool,
  }

  render() {
    const { icon, onClick, tooltip, rotate } = this.props

    const style = {}
    if (tooltip) {
      const l = tooltip.length
      if (l > 10) {
        style.width = l * 12
      }
    }

    return (
      <div className="icon-button ToolsMenuTooltip">
        <span className="ToolsMenuTooltipText" style={style}>{tooltip}</span>
        <button className="pure-button" onClick={onClick}>
          <span id={rotate ?'loading' : null} style={{display: 'inline-block'}}>
            <FontAwesomeIcon icon={icon} />
          </span>
        </button>
      </div>
    )
  }
}


