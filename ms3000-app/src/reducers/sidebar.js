import {
  SIDEBAR_FILES_VISIBLE,
  SIDEBAR_TOOLS_VISIBLE,
  SIDEBAR_SELECT_FILE,
} from '../actions/sidebar'


const DEFAULT_STATE = {
  filesVisible: true,
  toolsVisible: true,

  selectedFile: 'mario.magicBitmap'
}

const sidebar = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SIDEBAR_FILES_VISIBLE:
      return {
        ...state,
        filesVisible: action.filesVisible
      }

    case SIDEBAR_TOOLS_VISIBLE:
      return {
        ...state,
        toolsVisible: action.toolsVisible
      }

    case SIDEBAR_SELECT_FILE:
      return {
        ...state,
        selectedFile: action.name
      }

    default:
      return state
  }
};

export default sidebar
