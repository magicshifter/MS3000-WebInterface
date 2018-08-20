import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {dumpU8, fetchShifterState, postShifterState, receiveShifterState} from '../actions/ms3000'

import protobufs from '../utils/protoBufLoader'
import pb from '../utils/protoBufLoader'
import debounce from '../utils/debounce'

import AutoInterface from '../components/AutoInterface/index'
import PixelEditor from './PixelEditor'
import Navigation from './Navigation'
import SocketCmdCenter from './SocketCmdCenter'

import IconTest from '../components/IconTest'

import FilesSidebar from './FilesSidebar'

import './App.css';
import logo from '../logo.svg';


class App extends Component {
  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    shifterState :PropTypes.object,
    location: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    var cnt = 0

    const ctx = this
    this.dispatchDebouncedPostShifterState = debounce(() => {
      const { dispatch } = ctx.props

      console.log("postin....", cnt)
      cnt++
      dispatch(postShifterState())
    }, 1000, true)
  }

  // // TODO: this must go to shadow state!
  // onChangeLightState = (newLightState) => {
  //   const { shifterState, dispatch } = this.props
  //   const newS = Object.assign({}, shifterState,
  //     { modes: Object.assign({}, shifterState ? shifterState.modes : null, {light: newLightState})})
  //   dispatch(receiveShifterState(newS))
  // }

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
    const { isFetching, shifterState, location } = this.props


    const testObj = shifterState
    var check = pb.MS3KG.verify(testObj);
    console.log("verified:", check, testObj)

    var bufferU8 = pb.MS3KG.encode(testObj).finish()

    dumpU8(bufferU8)
    const decodedObj = pb.MS3KG.decode(bufferU8);

    console.log("after decoding:", decodedObj, bufferU8)


    // //var decoder = new TextDecoder('utf8');
    //
    // var funkyStr = String.fromCharCode.apply(null, bufferU8)
    //
    // var b64encoded = btoa(funkyStr);
    //
    // //b64encoded = "abc"
    //
    // fetch({method: "post", url: 'http://192.168.4.1/protobuf?myArg=' + b64encoded})
    //
    // console.log(check, bufferU8)
    //
    // var message = (check == null ? "success :)" : check);
    //
    // //message = "hello"


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

    //console.log("render", isFetching, shifterState )

    const controls = []

    switch (location) {
      case "wifi":
        controls.push(<SocketCmdCenter key='soc'/>)
        break;

      case "mode-Image":
        controls.push(<FilesSidebar key='fS'/>)
        controls.push(<PixelEditor key="mImage" />)
        break;

      case "config":
        controls.push(
          <div key="config">
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

          </div>)
        break;

      case "help":
        controls.push(<IconTest key='icontest' />)
        break;

      default:
        controls.push(<div key="uknw">MS3000 Error 404 Unknown location: {location}</div>)
    }

    return (
      <div style={{width: '100%', height:'100%', display: 'flex', flexFlow: 'column'}}>
        <Navigation/>
        {controls}
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { isFetching, shifterState } = state.ms3000
  const { location } = state.navigation

  return {
    isFetching,
    shifterState,
    location
  }
}

export default connect(mapStateToProps)(App)
