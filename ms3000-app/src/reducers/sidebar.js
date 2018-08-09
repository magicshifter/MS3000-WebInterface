import { SIDEBAR_FILES_VISIBLE } from '../actions'


const sidebar = (state = {filesVisible: false}, action) => {
  switch (action.type) {
    case SIDEBAR_FILES_VISIBLE:
      return {
        ...state,
        filesVisible: action.filesVisible
      }

    default:
      return state
  }
};

export default sidebar
