import React, { Component } from 'react'
import PropTypes from "prop-types";

import IconButton from './inputs/IconButton'
import { faPlus, faMinus} from '@fortawesome/free-solid-svg-icons'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { defaultParseInt }  from '../utils/types'


export default class Sidebar extends Component {
  static propTypes = {
    enlarged: PropTypes.bool.isRequired,
    closedChildren: PropTypes.any,
    children: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  onClick = (evt) => {
    const { onChange, enlarged } = this.props
    onChange(!enlarged)
  }


  render() {
    const { children, closedChildren, enlarged } = this.props

    const s = {
      border: "3px solid green",
      backgroundColor: 'white',

      position: "absolute", top: 0, right: 0, "zIndex": 100
    }

    if (enlarged) {
      return (
        <div style={s}>
          <IconButton icon={faMinus} tooltip='hide' onClick={this.onClick}/>
          {children}
        </div>
      )
    }
    else {
      return (
        <div style={s}>
          <IconButton icon={faPlus} tooltip='enlarge' onClick={this.onClick}/>
          {closedChildren}
        </div>
      )
    }
  }
}
