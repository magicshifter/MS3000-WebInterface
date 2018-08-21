import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {dumpU8, fetchShifterState, postShifterState, receiveShifterState} from '../actions/ms3000'

import protobufs from '../utils/protoBufLoader'
import pb from '../utils/protoBufLoader'
import {throttle} from "../utils/debounce";

import AutoInterface from '../components/AutoInterface/index'

import './App.css';
import logo from '../logo.svg';


class Config extends Component {
  constructor(props) {
    super(props)

    var cnt = 0

    const ctx = this
    this.dispatchDebouncedPostShifterState = throttle(() => {
      const { dispatch } = ctx.props

      console.log("postin....", cnt)
      cnt++
      dispatch(postShifterState())
    }, 500)
  }

  onChangeAutoInterface = (newState, theType) => {
    const { dispatch } = this.props
    dispatch(receiveShifterState(newState))

    if (this.refs.fastSync.checked)
      this.dispatchDebouncedPostShifterState()
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(fetchShifterState())
  }

  handlePostClick = e => {
    e.preventDefault()
    const { dispatch } = this.props
    this.dispatchDebouncedPostShifterState()
  }

  handleTestBuffer = e => {
    console.log("create", pb.MS3KG.create())
    const {shifterState } = this.props


    const testObj = shifterState
    var check = pb.MS3KG.verify(testObj);
    console.log("verified:", check, testObj)

    var bufferU8 = pb.MS3KG.encode(testObj).finish()

    dumpU8(bufferU8)
    const decodedObj = pb.MS3KG.decode(bufferU8);

    console.log("after decoding:", decodedObj, bufferU8)
  }

  handleTestDataClick = e => {
    e.preventDefault()
    const { dispatch } = this.props
    var r = Math.floor(Math.random()*256)
    var g = Math.floor(Math.random()*256)
    var b = Math.floor(Math.random()*256)
    dispatch(receiveShifterState({
      networkName:"Testdate MS",
      modes: {
        current: "what current??",

        beat: {
          beatMode: 1,
          sensitivity: 2,
        },
        light: {
          name: Math.random() < 0.4 ? "The Light" : Math.random() < 0.4 ? "Licht" : "MagicLight",
          color: {
            R: r, G: g, B: b
          },
          subMode: 2
        }
      }
    }))
  }

  render() {
    const { isFetching, shifterState, location } = this.props

      return (
          <div style={{border: '2px solid yellow'}}>
            <div>
              { !isFetching ?
                <button onClick={this.handleRefreshClick}>
                  Refresh
                </button>
                : <p><img src={logo} className="App-logo" alt="logo" /></p>
              }
              <button onClick={this.handleTestDataClick}>
                Get TestData
              </button>

              <button onClick={this.handleTestBuffer}>
                Test Buffer
              </button>

              <button onClick={this.handlePostClick}>
                Post
              </button>
              fast sync: <input ref="fastSync" type="checkbox" defaultChecked={true} />
            </div>

            <AutoInterface type={protobufs.MS3KG}
                           onChange={this.onChangeAutoInterface}
                           value={shifterState}
                           legend="MS3000 State"

            />

            <pre> {JSON.stringify(shifterState, null, 2) }</pre>

          </div>
      )
  }
}

const mapStateToProps = state => {
  const { isFetching, shifterState } = state.ms3000

  return {
    isFetching,
    shifterState,
  }
}

export default connect(mapStateToProps)(Config)
