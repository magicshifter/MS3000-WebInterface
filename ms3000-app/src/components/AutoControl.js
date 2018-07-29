import React, { Component } from 'react'
import PropTypes from 'prop-types'

import RGBControl from './RGBControl'


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

    const controls = []


    switch (field.type) {
      case 'string':
        controls.push(<input type='text' value={value} onChange={(evt) => {
          console.log("text chnage", evt)
          onChange(evt.target.value)
        }
        } />)
        break;

      case 'RGB':
        controls.push(<RGBControl field={field} value={value} onChange={onChange} /> )
        break;

      default:
        controls.push(<span>{field.name} has unknown type {field.type}</span>)
        break;
    }

    return (
      <span>
        { controls }
      </span>
    )
  }
}
