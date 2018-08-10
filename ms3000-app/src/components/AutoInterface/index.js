import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AutoControl from './AutoControl'

import './AutoInterface.css'

export default class AutoInterface extends Component {
  static propTypes = {
    type: PropTypes.object.isRequired,
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    legend: PropTypes.string,
    skipInputTag: PropTypes.bool,
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
    const { type, skipInputTag, legend } = this.props
    const controls = []

    const fs = type.fields
    const fKeys = Object.keys(fs)




    fKeys.sort((a, b) => {
      const f1 = fs[a]
      const f2 = fs[b]

      // TODO use custom metadata
      return f1.id - f2.id
    })

    for (var i = 0; i < fKeys.length; i++) {
      const k = fKeys[i]
      const f = fs[k]
      //console.log(f, value)
      controls.push(
        <div key={i} className="pure-control-group">
          <AutoControl field={f} value={this.getFromValue(f)} onChange={this.onChangeControl}/>
        </div>
      )
    }

    if (skipInputTag) {
      return (
        <fieldset style={{border: "3px solid red"}}>
          <h2>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {legend}</h2>
          {controls}
        </fieldset>
      )
    }

    return (
      <form className="pure-form pure-form-aligned">
        <fieldset>
          <legend>{legend}</legend>
            { controls }

          Coding Ground Pure.CSS Forms (HTML-5)  Login Setting Edit Project Fork

        </fieldset>
      </form>





    )
  }
}
