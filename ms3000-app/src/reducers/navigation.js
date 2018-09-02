import { NAVIGATION_SET_LOCATION } from '../actions/navigation'

const DEFAULT_MODE = {
  //location: 'config',
  location: "config",
}

const navigation = (state = DEFAULT_MODE, action) => {
  switch (action.type) {
    case NAVIGATION_SET_LOCATION:
      return {
        ...state,
        location: action.location
      }

    default:
      return state
  }
};

export default navigation
