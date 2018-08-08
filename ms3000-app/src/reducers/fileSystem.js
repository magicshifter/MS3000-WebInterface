import {  } from '../actions'

const DEFAULT_STATE = {
  files: ["index.html", "hello.txt", "mario.magicBitmap", "flower.magicBitmap", "oneup.magicBitmap"]
}

const fileSystem = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    // case REQUEST_SHIFTER_STATE:
    //   return {
    //     ...state,
    //     isFetching: true
    //   }
    // case RECEIVE_SHIFTER_STATE:
    //   return {
    //     ...state,
    //     shifterState: action.shifterState,
    //     isFetching: false
    //   };
    default:
      return state
  }
};

export default fileSystem
