import {fetch} from "../utils/http";
import pb from '../utils/protoBufLoader'

export const REQUEST_SHIFTER_STATE = 'REQUEST_SHIFTER_STATE'
export const RECEIVE_SHIFTER_STATE = 'RECEIVE_SHIFTER_STATE'


export const PIXEL_EDITOR_SET_PALETTE = "PIXEL_EDITOR_SET_PALETTE"
export const PIXEL_EDITOR_ADD_TO_PALETTE = "PIXEL_EDITOR_ADD_TO_PALETTE"

export const PIXEL_EDITOR_CHANGE_SIZE = "PIXEL_EDITOR_CHANGE_SIZE"
export const PIXEL_EDITOR_CHANGE_IMAGE = "PIXEL_EDITOR_CHANGE_IMAGE"
export const PIXEL_EDITOR_RESET_IMAGE = "PIXEL_EDITOR_RESET_IMAGE"
export const PIXEL_EDITOR_CHANGE_PIXEL = "CHANGE_PIXEL"
export const PIXEL_EDITOR_SCROLL_PIXEL = "PIXEL_EDITOR_SCROLL_PIXEL"
export const PIXEL_EDITOR_CHANGE_TOOL = "CHANGE_TOOL"
export const PIXEL_EDITOR_CHANGE_TOOL_SIZE = "CHANGE_TOOL_SIZE"
export const PIXEL_EDITOR_SET_COLOR = "PIXEL_EDITOR_SET_COLOR"
export const PIXEL_EDITOR_SET_ACTIVE_FRAME = "PIXEL_EDITOR_SET_ACTIVE_FRAME"
export const PIXEL_EDITOR_SET_IMAGE_NAME = "PIXEL_EDITOR_SET_IMAGE_NAME"

export const NAVIGATION_SET_LOCATION = 'NAVIGATION_SET_LOCATION'

export const SIDEBAR_FILES_VISIBLE = "SIDEBAR_FILES_VISIBLE"
export const SIDEBAR_TOOLS_VISIBLE = "SIDEBAR_TOOLS_VISIBLE"



export const navigationSetLocation = (location) => ({
  type: NAVIGATION_SET_LOCATION,
  location
})

export const sidebarFilesVisible = (filesVisible) => ({
  type: SIDEBAR_FILES_VISIBLE,
  filesVisible
})

export const sidebarToolsVisible = (toolsVisible) => ({
  type: SIDEBAR_TOOLS_VISIBLE,
  toolsVisible
})

export const pixelEditorSetTool = (tool) => ({
  type: PIXEL_EDITOR_CHANGE_TOOL,
  tool
})

export const pixelEditorSetToolSize = (toolSize) => ({
  type: PIXEL_EDITOR_CHANGE_TOOL_SIZE,
  toolSize
})

export const pixelEditorSetImageName = (name) => ({
  type: PIXEL_EDITOR_SET_IMAGE_NAME,
  name
})


export const pixelEditorSetPalette = (palette) => ({
  type: PIXEL_EDITOR_SET_PALETTE,
  palette
})

export const pixelEditorAddToPalette = (color) => ({
  type: PIXEL_EDITOR_ADD_TO_PALETTE,
  color
})


export const pixelEditorSetColor = (color) => ({
  type: PIXEL_EDITOR_SET_COLOR,
  color
})

export const pixelEditorChangeSize = (width, height) => ({
  type: PIXEL_EDITOR_CHANGE_SIZE,
  width, height
})

export const pixelEditorSetActiveFrame = (activeFrame) => {
  console.log("pixelEditorSetActiveFrame", activeFrame)
  return {
    type: PIXEL_EDITOR_SET_ACTIVE_FRAME,
    activeFrame
  }
}

export const pixelEditorChangeImage = (image, activeFrame = 0) => ({
  type: PIXEL_EDITOR_CHANGE_IMAGE,
  image,
  activeFrame
})

export const pixelEditorResetImage = () => ({
  type: PIXEL_EDITOR_RESET_IMAGE
})

export const pixelEditorChangePixel = (x, y, color, frame) => ({
  type: PIXEL_EDITOR_CHANGE_PIXEL,
  frame,
  changes: [{x, y, color}]
})

export const pixelEditorChangePixelList = (changes, frame) => ({
  type: PIXEL_EDITOR_CHANGE_PIXEL,
  frame,
  changes
})

export const pixelEditorScrollPixel = (x, y, frame) => ({
  type: PIXEL_EDITOR_SCROLL_PIXEL,
  frame,
  dir: {x, y}
})




export const requestShifterState = () => ({
  type: REQUEST_SHIFTER_STATE
})

export const receiveShifterState = (shifterState) => ({
  type: RECEIVE_SHIFTER_STATE,
  shifterState,
  receivedAt: Date.now()
})

export function stringToArray(bufferString) {
  var array = new Uint8Array(new ArrayBuffer(bufferString.length));

  for (var i = 0; i < bufferString.length; i++) {
    array[i] = bufferString.charCodeAt(i);
  }
  return array
}

export function dumpU8(u8) {
  return
  console.log("DUMPu8", u8.length, u8)
  for (var i = 0; i < u8.length; i++) {
    console.log(u8[i].toString(16))
  }

}


export const postShifterState = () => (dispatch, getState) => {
  const state = getState()

  console.log("postShifterStaet", state)

  const testObj = state.ms3000.shifterState
  var check = pb.MS3KG.verify(testObj);

  var bufferU8 = pb.MS3KG.encode(testObj).finish()
  dumpU8(bufferU8)
  //var decoder = new TextDecoder('utf8');

  var funkyStr = String.fromCharCode.apply(null, bufferU8)

  var b64encoded = btoa(funkyStr);

  //b64encoded = "abc"

  fetch({method: "post", url: 'http://192.168.4.1/protobuf?myArg=' + b64encoded})

  console.log(check, bufferU8)

  var message = (check == null ? "success :)" : check);

  //message = "hello"


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

    dumpU8(u8a)

    console.log("u8", u8a)

    try {
      const shifterState = pb.MS3KG.decode(u8a);

      var object = pb.MS3KG.toObject(shifterState, {
        longs: undefined,
        enums: undefined,
        bytes: undefined,
        // see ConversionOptions
      });

      console.log("shifterState decoded", object)
      dispatch(receiveShifterState(object))
    }
    catch (ex) {
      console.error("shifterstate fetch decode error", ex)
    }
  })


  // return fetch(`https://www.reddit.com/r/${subreddit}.json`)
  //   .then(response => response.json())
  //   .then(json => dispatch(receiveShifterState(json)))
}
