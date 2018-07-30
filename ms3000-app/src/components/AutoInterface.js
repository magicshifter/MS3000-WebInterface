import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AutoControl from './AutoControl'



export default class AutoInterface extends Component {
  static propTypes = {
    type: PropTypes.object.isRequired,
    value: PropTypes.object.isRequired,
    onChange: PropTypes.func.optional,
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
  }

  getFromValue = (f) => {
    const { value } = this.props
    if (value) {
      return value[f.name]
    }
    else {
      return null
    }
  }

  onChangeGenerator = (type) => {
    const { value, onChange } = this.props

    return (newValue) => {
      var ns = Object.assign({}, value, { [type.name]: newValue })
      onChange(ns)
    }
  }

  render() {
    const { type, value } = this.props
    const controls = []

    for (var k in type.fields) {
      const f = type.fields[k]

      console.log(f, value)

      controls.push(<div>{f.name}:&nbsp;<AutoControl field={f} value={this.getFromValue(f)} onChange={this.onChangeGenerator(f)}/></div>)
    }

    return (
      <div>
        { controls }
      </div>
    )
  }
}
