import {fetch} from "../utils/http";
import pb from '../utils/protoBufLoader'

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


function stringToArray(bufferString) {
  let uint8Array = new TextEncoder("utf-8").encode(bufferString);
  return uint8Array;
}


export const fetchShifterState = () => (dispatch, getState) => {
  console.log("fetchShifterState")
    dispatch(requestShifterState())


  //const shifterState = { h: "uhdskjh", jhjk:7687, ii:{o:8,x:[7,8,9]}, oooo:getState().ms3000.shifterState }
  //setTimeout(function(){ dispatch(receiveShifterState(shifterState)) }, 1600);

  fetch( {method: "get", url: 'http://192.168.4.1/protobuf' } ).then(data => {
    console.log("received shifter blob", data.response)

    var decoded = atob(data.response)



    console.log("b64 decoded", decoded)

    var u8a = stringToArray(decoded);

    console.log("u8", u8a)

    const shifterState = pb.MS3KG.decode(u8a);

    console.log("shifterState decoded", shifterState)

    dispatch(receiveShifterState(shifterState))
  })


  // return fetch(`https://www.reddit.com/r/${subreddit}.json`)
  //   .then(response => response.json())
  //   .then(json => dispatch(receiveShifterState(json)))
}
