import { NAVIGATION_SET_LOCATION } from '../actions'


const navigation = (state = {location: "mode-Image"}, action) => {
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