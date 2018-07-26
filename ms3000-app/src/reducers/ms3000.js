import { RECEIVE_SHIFTER_STATE, REQUEST_SHIFTER_STATE } from '../actions'


const ms3000 = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_SHIFTER_STATE:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_SHIFTER_STATE:
      return {
        ...state,
        shifterState: action.shifterState,
        isFetching: false
      }
    default:
      return state
  }
}

export default ms3000
