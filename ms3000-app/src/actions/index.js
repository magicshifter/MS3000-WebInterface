import {fetch} from "../utils/http";
import protoBuffers from '../utils/protobufhack'

export const REQUEST_SHIFTER_STATE = 'REQUEST_POSTS'
export const RECEIVE_SHIFTER_STATE = 'RECEIVE_POSTS'


export const requestShifterState = () => ({
  type: REQUEST_SHIFTER_STATE
})

export const receiveShifterState = (shifterState) => ({
  type: RECEIVE_SHIFTER_STATE,
  shifterState,
  receivedAt: Date.now()
})

export const fetchShifterState = () => (dispatch, getState) => {
  console.log("fetchShifterState")
    dispatch(requestShifterState())


  const shifterState = { h: "uhdskjh", jhjk:7687, ii:{o:8,x:[7,8,9]}, oooo:getState().ms3000.shifterState }
  setTimeout(function(){ dispatch(receiveShifterState(shifterState)) }, 1600);

  // fetch( {method: "get", url: 'http://192.168.4.1/protobuf' } ).then(dataUint8 => {
  //   console.log("received shifter blob", dataUint8)
  //
  //   const shifterState = protoBuffers.MS3KG.decode(dataUint8);
  //
  //   console.log("decoded", shifterState)
  //
  //   dispatch(receiveShifterState(shifterState))
  // })


  // return fetch(`https://www.reddit.com/r/${subreddit}.json`)
  //   .then(response => response.json())
  //   .then(json => dispatch(receiveShifterState(json)))
}
