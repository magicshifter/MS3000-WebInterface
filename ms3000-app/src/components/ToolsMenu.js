import React, { Component } from 'react'
import PropTypes from "prop-types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './ToolsMenu.css'

export default class ToolsMenu extends Component {
  static propTypes = {
    structure: PropTypes.object.isRequired,
    tool: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    size: PropTypes.string,
  }

  onClickTool = (evt) => {
    const { onChange } = this.props
    const tool = evt.currentTarget.dataset["tool"]

    console.log("clicked tool", tool, evt.currentTarget)
    onChange(tool)
  }


  render() {
    const controls = []

    const { structure, tool } = this.props

    for (let i = 0; i < structure.length; i++) {
      const elem = structure[i]
      const className = elem.name === tool ? "ToolsMenuSelectedTool" : "ToolsMenuTool"

      controls.push(
        <span data-tool={elem.name} onClick={this.onClickTool}>
          <FontAwesomeIcon icon={elem.icon} className={className} size="4x"/>
        </span>
      )

    }

    return (
      <span>
        {controls}
      </span>
    )
  }
}
/*

const ToolsMenu =
  ({ mode, setMode }) => {
  // TODO: if other menu is needed make this props
    const items = [
      {
        name: 'mutate',
        icon: IconMutate,
      },
      {
        name: 'draw',
        icon: IconDraw,
      },
      {
        name: 'random',
        icon: IconRandomize,
      },
      {
        name: 'select',
        icon: IconSelectRect,
      },
    ]

    const buttons = items.map(
      ({ name, icon }) =>
        <li
          key={name}
        >
          <Tab
            Icon={icon}
            text={name}
            active={name === mode}
            onClick={
              (evt) => {
                // console.log('clicked mode', name)
                setMode(name)
              }
            }
          />
        </li>
    )

    return (
      <nav className={classes['container']}>
        <ul>
          {buttons}
        </ul>
      </nav>
    )
  }

ToolsMenu.propTypes = {
  mode: PropTypes.string.isRequired,
  setMode: PropTypes.func.isRequired,
}

const mapStateToProps = (state, ownProps) => {
  const {tool} = state.pixelEditor;

  return {tool}
}

const mapDispatchToProps =
  (dispatch) => ({
    setMode:
      (mode) => {
        dispatch(actions.setMode(mode))
      },
  })

const ToolsMenuContainer = connect(mapStateToProps)(ToolsMenu)

export default ToolsMenuContainer
*/
