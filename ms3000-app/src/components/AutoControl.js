import React, { Component } from 'react'
import PropTypes from 'prop-types'

import AutoInterface from './AutoInterface'
import RGBControl from './RGBControl'
import EnumControl from  './EnumControl'

import protobuf from 'protobufjs'



export default class AutoControl extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.optional,
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
  }

  render() {
    const { field , value, onChange } = this.props


    const root = field.root

    const lookup = root.lookup(field.type)
    const isEnum = lookup instanceof protobuf.Enum
    const isType =  lookup instanceof protobuf.Type


    const controls = []

    console.log("Render AutoCntrl", field, lookup)


    switch (field.type) {
      case 'string':
        controls.push(<input type='text' value={value} onChange={(evt) => {
          //console.log("text chnage", evt)
          onChange(evt.target.value)
        }
        }/>)
        break;

      case 'RGB':
        controls.push(<RGBControl field={field} value={value} onChange={onChange}/>)
        break;

      default:
        if (isEnum) {
          controls.push(<EnumControl field={field} value={value} onChange={onChange} /> )
        }
        else if (isType) {
          controls.push(<AutoInterface type={lookup} value={value} onChange={onChange} />)
        }
        else {
          controls.push(<span>!!! {field.name} has unknown type {field.type}</span>)
        }
        break;
    }

    return (
      <span>
        { controls }
      </span>
    )
  }
}
