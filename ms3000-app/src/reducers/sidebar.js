import {SIDEBAR_FILES_VISIBLE, SIDEBAR_TOOLS_VISIBLE} from '../actions'


const sidebar = (state = {filesVisible: true, toolsVisible: true}, action) => {
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

    default:
      return state
  }
};

export default sidebar
