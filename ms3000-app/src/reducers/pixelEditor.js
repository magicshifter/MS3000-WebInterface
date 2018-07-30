import { List }  from 'immutable'

import {PIXEL_EDITOR_CHANGE_TOOL, PIXEL_EDITOR_CHANGE_PIXEL, PIXEL_EDITOR_SET_COLOR} from '../actions'

import {  RGB} from '../utils/color'

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

const DEFAULT_WIDTH = 16
const DEFAULT_HEIGHT = 16

const pixelEditor = (state = null, action) => {
  state = state || {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    pixel: emptyImage(DEFAULT_WIDTH, DEFAULT_HEIGHT),
    tool: "erase",
    color: RGB(255, 255, 255),
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

    case PIXEL_EDITOR_CHANGE_PIXEL:
      return {
        ...state,
        pixel: applyPixelChanges(state, action.changes)
      }



    default:
      return state
  }
}

export default pixelEditor
