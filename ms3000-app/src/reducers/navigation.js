import { NAVIGATION_SET_LOCATION } from '../actions'


const navigation = (state = {location: "wifi"}, action) => {
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
