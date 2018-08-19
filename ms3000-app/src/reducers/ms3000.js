import {
  RECEIVE_SHIFTER_STATE,
  REQUEST_SHIFTER_STATE,

  IMAGE_UPLOAD_REQUEST_START,
  IMAGE_UPLOAD_REQUEST_FAIL,
  IMAGE_UPLOAD_REQUEST_SUCCESS,
} from '../actions/ms3000'

import {FILESYSTEM_REQUEST_START, FILESYSTEM_REQUEST_SUCCESS} from "../actions/filesystem";



const DEFAULT_STATE = {
  isFetching: false,
  shifterState: {},

  host: 'http://magicshifter.local', /*'http://192.168.4.1' */

  isUploading: false,
  uploadError: null,
}



const ms3000 = (state = DEFAULT_STATE, action) => {
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



    case IMAGE_UPLOAD_REQUEST_START:
      return {
        ...state,
        isUploading: true,
        uploadError: null,
      }

    case IMAGE_UPLOAD_REQUEST_SUCCESS:
      return {
        ...state,
        files: action.files,
        isUploading: false,
        uploadError: null
      }

    case IMAGE_UPLOAD_REQUEST_FAIL:
      return {
        ...state,
        files: null,
        isUploading: false,
        uploadError: action.error
      }

    default:
      return state
  }
}



export default ms3000
