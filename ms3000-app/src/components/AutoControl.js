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

  onChange = () => {

  }

  render() {
    const { field , value, onChange } = this.props

    const controls = []


    switch (field.type) {
      case 'string':
        controls.push(<div><span>field.name</span><input type='text' value={value} onChange={onChange} /></div>)
        break;

      case 'RGB':
        controls.push(<RGBControl field={field} value={value} onChange={() => alert("dd")} /> )
        break;

      default:
        controls.push(<div><span>field.name</span></div>)
        break;
    }

    return (
      <div>
        { controls }
        <pre> {JSON.stringify(value, null, 2) }</pre>
      </div>
    )
  }
}
