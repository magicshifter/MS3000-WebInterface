import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AutoControl from './AutoControl'





export default class AutoInterface extends Component {
  static propTypes = {
    protocolBuffer: PropTypes.object.isRequired,
    theState: PropTypes.object.isRequired,
    onChange: PropTypes.func.optional,
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
  }

  getFromTheState = (f) => {
    const { theState } = this.props
    if (theState) {
      return theState[f.name]
    }
    else {
      return null
    }
  }

  onChangeGenerator = (field) => {
    const { theState, onChange } = this.props

    return (newValue) => {
      var ns = Object.assign({}, theState, { [field.name]: newValue })
      onChange(ns)
    }
  }

  render() {
    const { protocolBuffer, theState, onChange } = this.props
    const controls = []

    for (var k in protocolBuffer.fields) {
      const f = protocolBuffer.fields[k]

      console.log(f, theState)

      controls.push(<div>{f.name}:&nbsp;<AutoControl field={f} value={this.getFromTheState(f)} onChange={this.onChangeGenerator(f)}/></div>)
    }

    return (
      <div>
        { controls }
      </div>
    )
  }
}
