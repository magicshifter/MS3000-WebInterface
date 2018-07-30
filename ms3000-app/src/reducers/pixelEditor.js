import {PIXEL_EDITOR_CHANGE_TOOL, PIXEL_EDITOR_SET_TOOL} from '../actions'

function emptyImage(w, h) {
  const pixel = []
  for (var i = 0; i < w*h; i++) {
    pixel.push({R:0, G: 0, B: 0})
  }
}

const DEFAULT_WIDTH = 16
const DEFAULT_HEIGHT = 16

const pixelEditor = (state = null, action) => {
  state = state || {
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT,
    pixel: emptyImage(DEFAULT_WIDTH, DEFAULT_HEIGHT),
    tool: "erase",
  }

  switch (action.type) {
    case PIXEL_EDITOR_CHANGE_TOOL:
      return {
        ...state,
        tool: action.tool
      }

    default:
      return state
  }
}

export default pixelEditor
