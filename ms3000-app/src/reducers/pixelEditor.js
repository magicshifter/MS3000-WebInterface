import { List }  from 'immutable'
import {
  PIXEL_EDITOR_CHANGE_TOOL,
  PIXEL_EDITOR_CHANGE_PIXEL,
  PIXEL_EDITOR_SET_COLOR,
  PIXEL_EDITOR_CHANGE_SIZE,
  PIXEL_EDITOR_SET_PALETTE,
  PIXEL_EDITOR_CHANGE_IMAGE,
} from '../actions'
import { RGB } from '../utils/color'


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


function emptyImage(w, h) {
  const pixel = []
  for (var i = 0; i < w*h; i++) {
    pixel.push({R:0, G: 0, B: 0})
  }
  return List(pixel)
}

function getIndex(state, x, y) {
  return state.width * y + x
}

function applyPixelChanges(state, changes) {
  var { pixel } = state


  for (var i = 0; i < changes.length; i++) {
    const c = changes[i]
    pixel = pixel.set(getIndex(state, c.x, c.y), c.color)
  }

  return pixel
}

function resizePixel(state, width, height) {
  var pixel =  emptyImage(width, height)

  var oW = state.width
  var oH = state.height
  var oldPix = state.pixel

  if (state.resizePixel) {
    oldPix = state.resizePixel.pixel
    oW = state.resizePixel.width
    oH = state.resizePixel.height
  }

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
    pixel: emptyImage(DEFAULT_WIDTH, DEFAULT_HEIGHT),
    tool: "erase",
    color: RGB(255, 255, 255),
    palette: DEFAULT_PALETTE,
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
        pixel: action.image.pixel,
        width: action.image.width,
        height: action.image.height,
      }

    case PIXEL_EDITOR_CHANGE_PIXEL:
      return {
        ...state,
        pixel: applyPixelChanges(state, action.changes),
        resizePixel: null,
      }

    case PIXEL_EDITOR_CHANGE_SIZE:
      const nW = action.width || state.width
      const nH = action.height || state.height
      return {
        ...state,
        width: nW,
        height: nH,
        pixel: resizePixel(state, nW, nH),
        resizePixel: state.resizePixel || { pixel: state.pixel, width: state.width, height: state.height }
      }

    case PIXEL_EDITOR_SET_PALETTE:
      return {
        ...state,
        palette: action.palette
      }

    default:
      return state
  }
}

export default pixelEditor
