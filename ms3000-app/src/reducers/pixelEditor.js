import { List }  from 'immutable'
import {
  PIXEL_EDITOR_CHANGE_TOOL,
  PIXEL_EDITOR_CHANGE_PIXEL,
  PIXEL_EDITOR_SET_COLOR,
  PIXEL_EDITOR_CHANGE_SIZE,
  PIXEL_EDITOR_SET_PALETTE,
  PIXEL_EDITOR_CHANGE_IMAGE,
  PIXEL_EDITOR_SET_ACTIVE_FRAME,
} from '../actions'
import { RGB, emptyPixel } from '../utils/color'


const DEFAULT_WIDTH = 16
const DEFAULT_HEIGHT = 16
const DEFAULT_PALETTE = [
  RGB(0,0,0),
  RGB(127,127,127),
  RGB(255,255,255),
  RGB(255,0,0),
  RGB(0,255,0),
  RGB(0,0,255),
  RGB(255,255,0),
  RGB(255,0,255),
  RGB(0,255,255),

  RGB(255,0,127),
  RGB(255,127,0),
  RGB(127,255,0),
  RGB(0,255,127),
  RGB(0,127,255),
  RGB(127,0,255),

]


function getIndex(state, x, y) {
  return state.width * y + x
}

function applyPixelChanges(state, action) {
  const { changes, frame } = action
  const { frames } = state
  var pixel = frames[frame]
  const newFrames = frames.slice()

  for (var i = 0; i < changes.length; i++) {
    const c = changes[i]
    pixel = pixel.set(getIndex(state, c.x, c.y), c.color)
  }

  newFrames[frame] = pixel

  return newFrames
}

function resizeFrames(state, w, h) {
  const { frames, resizeFrames } = state

  const newFrames = []
  for (var i = 0; i < frames.length; i++) {
    var oldPix = frames[i]
    var oW = state.width
    var oH = state.height
    if (resizeFrames) {
      oldPix = resizeFrames.frames[i]
      oW = resizeFrames.width
      oH = resizeFrames.height
    }
    const pixel = resizePixel(oW, oH, oldPix, w, h)
    newFrames.push(pixel)
  }
  return newFrames
}

function resizePixel(oW, oH, oldPix, width, height) {
  var pixel =  emptyPixel(width, height)

  // var oW = state.width
  // var oH = state.height
  // var oldPix = state.pixel

  for (var y = 0; y < Math.min(height, oH); y++) {
    for (var x = 0; x < Math.min(width, oW); x++) {
      const oldIdx = oW * y + x
      const newIdx = width * y + x

      const oldV = oldPix.get(oldIdx)
      pixel = pixel.set(newIdx, oldV)
    }
  }

  return pixel
}

const pixelEditor = (state = null, action) => {
  state = state || {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    frameIdx: 0,
    frames: [emptyPixel(DEFAULT_WIDTH, DEFAULT_HEIGHT)],
    tool: "erase",
    color: RGB(255, 255, 255),
    palette: DEFAULT_PALETTE,
    frameDelay: 400,
  }

  switch (action.type) {
    case PIXEL_EDITOR_CHANGE_TOOL:
      return {
        ...state,
        tool: action.tool
      }

    case PIXEL_EDITOR_SET_COLOR:
      return {
        ...state,
        color: action.color
      }

    case PIXEL_EDITOR_CHANGE_IMAGE:
      return {
        ...state,
        frameIdx: 0,
        frames: action.image.frames,
        width: action.image.width,
        height: action.image.height,
        resizeFrames: null,
      }


    case PIXEL_EDITOR_CHANGE_PIXEL:
      return {
        ...state,
        frames: applyPixelChanges(state, action),
        resizeFrames: null,
      }

    case PIXEL_EDITOR_CHANGE_SIZE:
      const nW = action.width || state.width
      const nH = action.height || state.height
      return {
        ...state,
        width: nW,
        height: nH,
        frames: resizeFrames(state, nW, nH),
        resizeFrames: state.resizeFrames || { frames: state.frames, width: state.width, height: state.height }
      }

    case PIXEL_EDITOR_SET_PALETTE:
      return {
        ...state,
        palette: action.palette
      }

    case PIXEL_EDITOR_SET_ACTIVE_FRAME:
      return {
        ...state,
        frameIdx: action.frame
      }

    default:
      return state
  }
}

export default pixelEditor
