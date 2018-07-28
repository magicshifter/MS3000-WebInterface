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

  render() {
    const { protocolBuffer, theState, onChange } = this.props
    const controls = []

    for (var k in protocolBuffer.fields) {
      const f = protocolBuffer.fields[k]

      console.log(f, theState)

      controls.push(<AutoControl field={f} value={this.getFromTheState(f)} onChange={alert}/>)
    }

    return (
      <div>
        { controls }
        <pre> {JSON.stringify(theState, null, 2) }</pre>
      </div>
    )
  }
}
