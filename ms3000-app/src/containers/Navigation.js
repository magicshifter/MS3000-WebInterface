import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {navigationSetLocation} from '../actions/navigation'

import './App.css';

const navStructure = [
  { name: "wifi" },
  { name: "config" },
  // TODO: generate from modes
  { name: "mode-Image" },
  { name: "mode-Light" },
  { name: "mode-MIDI" },
  { name: "help" },
]


class Navigation extends Component {
  static propTypes = {
    location :PropTypes.string,
    structure: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  }

  onClickNav = (evt) => {
    const { onChange } = this.props
    const name = evt.currentTarget.dataset["name"]

    console.log("clicked Nav", name, evt.currentTarget)
    onChange(name)
  }

  render() {
    const { structure, location } = this.props

    const controls = []
    for (var i = 0; i < structure.length; i++) {
      const nav = structure[i]

      controls.push(
        <li key={i} className="pure-menu-item">
          <a href="#" onClick={this.onClickNav} data-name={nav.name} className="pure-menu-link"
             style={{backgroundColor: nav.name === location ? "blue" : null }}>
            {nav.name}
          </a>
        </li>)
    }

    return (
      <div className="pure-menu pure-menu-horizontal" style={{padding: "0px", flex: '0 1 auto'}}>
        <ul className="pure-menu-list">
          {controls}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { location } = state.navigation

  return {
    location,
    // TODO: autogen navstructure from modes
    structure: navStructure
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChange: location => {
      dispatch(navigationSetLocation(location))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
