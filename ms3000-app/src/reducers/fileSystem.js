import {
  FILESYSTEM_REQUEST_START,
  FILESYSTEM_REQUEST_SUCCESS,
  FILESYSTEM_REQUEST_FAIL
} from '../actions/filesystem'

const DEFAULT_STATE = {
  isFetching: false,
  error: null,
  files: null, 
  //   [
  //   // {name: "index.html", size: 1232},
  //   // {name: "hello.txt", size: 122},
  //   // {name: "mario.magicBitmap", size: 1032},
  //   // {name: "flower.magicBitmap", size: 1232},
  //   // {name: "oneup.magicBitmap", size: 1232},
  // ]
}

const fileSystem = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FILESYSTEM_REQUEST_START:
      return {
        ...state,
        isFetching: true,
        error: null,
      }

    case FILESYSTEM_REQUEST_SUCCESS:
      return {
        ...state,
        files: action.files,
        isFetching: false,
        error: null
      }

    case FILESYSTEM_REQUEST_FAIL:
      return {
        ...state,
        files: [],
        isFetching: false,
        error: action.error
      }

    default:
      return state
  }
};

export default fileSystem
