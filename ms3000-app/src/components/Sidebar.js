import React, { Component } from 'react'
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { defaultParseInt }  from '../../utils/types'


export default class Sidebar extends Component {
  static propTypes = {
    enlarged: PropTypes.bool.isRequired,
    //children: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  onClick = (evt) => {
    const { onChange } = this.props
    const tool = defaultParseInt(evt.currentTarget.dataset["size"], 1)

    console.log("clicked ToolSizes", tool, evt.currentTarget)
    onChange(tool)
  }


  render() {
    const controls = []

    const { enlarged } = this.props

    if (enlarged) {
      return (
        <div style={{float: "left", position: "absolute"}}>
          {this.children}
          ;jalfkjdslkfjdslkfjlksd
          dsg'sdaglksjalg
          sdag;
          dfs;hg<br/>
          afd;h
          fdlh;kljafldkfjdlsajfds
        </div>
      )
    }
    else {
      return (
        <div style={{float: "left", position: "absolute"}}>
          Click to show Files
        </div>
      )
    }
  }
}
