import { RECEIVE_SHIFTER_STATE, REQUEST_SHIFTER_STATE } from '../actions'


const ms3000 = (state = {isFetching: false, shifterState: {}, host: 'http://magicshifter.local' /*'http://192.168.4.1' */}, action) => {
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
      };
    default:
      return state
  }
};

export default ms3000
