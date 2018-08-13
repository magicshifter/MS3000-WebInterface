import undoable, { distinctState } from 'redux-undo'
import {
  PIXEL_EDITOR_CHANGE_TOOL,
  PIXEL_EDITOR_CHANGE_PIXEL,
  PIXEL_EDITOR_SET_COLOR,
  PIXEL_EDITOR_CHANGE_SIZE,
  PIXEL_EDITOR_SET_PALETTE,
  PIXEL_EDITOR_ADD_TO_PALETTE,
  PIXEL_EDITOR_CHANGE_IMAGE,
  PIXEL_EDITOR_RESET_IMAGE,
  PIXEL_EDITOR_SET_ACTIVE_FRAME,
  PIXEL_EDITOR_SET_IMAGE_NAME,
  PIXEL_EDITOR_CHANGE_TOOL_SIZE,
  PIXEL_EDITOR_SCROLL_PIXEL,
} from '../actions'
import { RGB, emptyPixel, equRGB, paletteFromImage } from '../utils/color'


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
  var hasChanged = false


  for (var i = 0; i < changes.length; i++) {
    const c = changes[i]

    const idx = getIndex(state, c.x, c.y)
    const existing = pixel.get(idx)

    if (!equRGB(existing, c.color)) {
      pixel = pixel.set(idx, c.color)
      hasChanged = true
    }
  }

  if (hasChanged) {
    const newFrames = frames.slice()
    newFrames[frame] = pixel
    return newFrames
  }
  // nothing changed
  return frames
}

function scrollPixel(state, action) {
  const { width, height, frames } = state
  const { frame, dir } = action

  if (dir.x === 0 && dir.y === 0) {
    return frames
  }

  const pixel = frames[frame]
  let newPixel = emptyPixel(width, height)

  for (var x = 0; x < width; x++) {
    for (var y = 0; y < height; y++) {
      const sIdx = x + y * width

      const xx = (x + dir.x + width) % width
      const yy = (y + dir.y + height) % height

      const dIdx = xx + yy * width

      const rgb = pixel.get(sIdx)
      newPixel = newPixel.set(dIdx, rgb)
    }
  }
  const newFrames = frames.slice()
  newFrames[frame] = newPixel
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
    tool: "draw",
    toolSize: 1,
    color: RGB(255, 255, 255),
    palette: DEFAULT_PALETTE,
    imagePalette: [],
    frameDelay: 500, // TODO: individual!!!
    imageName: "newImage",
  }

  switch (action.type) {
    case PIXEL_EDITOR_CHANGE_TOOL:
      return {
        ...state,
        tool: action.tool
      }

    case PIXEL_EDITOR_CHANGE_TOOL_SIZE:
      return {
        ...state,
        toolSize: action.toolSize
      }

    case PIXEL_EDITOR_SET_IMAGE_NAME:
      return {
        ...state,
        imageName: action.name
      }

    case PIXEL_EDITOR_SET_COLOR:
      return {
        ...state,
        color: action.color
      }

    case PIXEL_EDITOR_SET_ACTIVE_FRAME:
      //console.log("PIXEL_EDITOR_SET_ACTIVE_FRAME", action)
      return {
        ...state,
        frameIdx: action.activeFrame
      }

    case PIXEL_EDITOR_CHANGE_IMAGE:
      //console.log("PIXEL_EDITOR_CHANGE_IMAGE", action)
      return {
        ...state,
        frameIdx: action.activeFrame,
        frames: action.image.frames,
        width: action.image.width,
        height: action.image.height,
        imagePalette: paletteFromImage(action.image.frames),
        resizeFrames: null,
      }

    case PIXEL_EDITOR_RESET_IMAGE:
      return {
        ...state,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT,
        frameIdx: 0,
        frames: [emptyPixel(DEFAULT_WIDTH, DEFAULT_HEIGHT)],
        palette: DEFAULT_PALETTE,
        imagePalette: [],
        imageName: "newImage",
      }

    case PIXEL_EDITOR_CHANGE_PIXEL:
      const newFrames = applyPixelChanges(state, action)
      if (newFrames !== state.frames) {
        return {
          ...state,
          frames: newFrames,
          resizeFrames: null,
        }
      }
      else {
        return state
      }

    case PIXEL_EDITOR_SCROLL_PIXEL:
      const newFrames2 = scrollPixel(state, action)
      if (newFrames2 !== state.frames) {
        return {
          ...state,
          frames: newFrames2,
          resizeFrames: null,
        }
      }
      else {
        return state
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

    case PIXEL_EDITOR_ADD_TO_PALETTE:
      //console.log("add palette", action)
      return {
        ...state,
        palette: [...state.palette, action.color]
      }

    default:
      return state
  }
}


const undoablePixelEditor = undoable(pixelEditor, {
  limit: 200,
  filter: distinctState(),
  // undoType: 'PIXEL_EDITOR_UNDO',
  // redoType: 'PIXEL_EDITOR_REDO',
})


export default undoablePixelEditor
//export default pixelEditor
