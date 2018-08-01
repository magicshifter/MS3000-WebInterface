import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AutoControl from './AutoControl'



export default class AutoInterface extends Component {
  static propTypes = {
    type: PropTypes.object.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
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

  onChangeControl = (newSubValue, field) => {
    const { value, type, onChange } = this.props

    //console.log("cntrl changed", newSubValue, field)

    var newValue = Object.assign({}, value, { [field.name]: newSubValue })
    onChange(newValue, type)
  }

  render() {
    const { type } = this.props
    const controls = []

    for (var k in type.fields) {
      const f = type.fields[k]
      //console.log(f, value)
      controls.push(
        <div key={k} className="pure-control-group">
          <label htmlFor={f.name}>{f.name}:&nbsp;</label>
          <AutoControl field={f} value={this.getFromValue(f)} onChange={this.onChangeControl}/>
        </div>
      )
    }

    return (
      <form className="pure-form pure-form-aligned">
        <fieldset>

            { controls }

        </fieldset>
      </form>





    )
  }
}
