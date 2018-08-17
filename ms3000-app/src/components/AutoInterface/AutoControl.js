import React, {Component} from 'react'
import PropTypes from 'prop-types'

import AutoInterface from './index'
import RGBControl from './RGBControl'
import EnumControl from './EnumControl'

import {defaultParseInt} from '../../utils/types'

import protobuf from 'protobufjs'


export default class AutoControl extends Component {
  static propTypes = {
    field: PropTypes.object.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
  }

  onChangeRecursive = (newValue, type) => {
    const { field, onChange } = this.props
    onChange(newValue, field)
  }

  render() {
    const { field , value, onChange } = this.props

    const root = field.root
    const lookup = root.lookup(field.type)
    const isEnum = lookup instanceof protobuf.Enum
    const isType = lookup instanceof protobuf.Type

    const controls = []
    //console.log("Render AutoCntrl", field, lookup)



    var noLabel = false
    switch (field.type) {
      case 'string':
        controls.push(<input id={ field.name } key="str" type='text' value={value || ""} onChange={(evt) => {
          //console.log("text chnage", evt)
          onChange(evt.target.value, field)
        }}/>)
        break;

      case 'int32':
        controls.push(<input id={ field.name } key="str" type='text' value={value || ""} onChange={(evt) => {
          const v = defaultParseInt(evt.target.value)
          //console.log("text chnage", evt)

          onChange(v, field)
        }}/>)
        break;


      case 'RGB':
        controls.push(<RGBControl id={ field.name } key="rgb" field={field} value={value} onChange={onChange}/>)
        break;

      default:
        if (isEnum) {
          controls.push(<EnumControl id={ field.name } key="enu" field={field} value={value} onChange={onChange} /> )
        }
        else if (isType) {
          noLabel = true
          //controls.push(<legend key="leg">{field.name}</legend>)
          controls.push(
            <div style={{paddingLeft:"20px"}}>
              <AutoInterface key="rec" legend={field.name} skipInputTag={true} type={lookup} value={value} onChange={this.onChangeRecursive} />
            </div>)
        }
        else {
          controls.push(<span key="u">!!! {field.name} has unknown type {field.type}</span>)
        }
        break;
    }
    if (!noLabel) {
      controls.unshift(<label id="lbl" htmlFor={field.name}>{field.name}:&nbsp;</label>)
    }

    return (
      <span>
        { controls }
      </span>
    )
  }
}
