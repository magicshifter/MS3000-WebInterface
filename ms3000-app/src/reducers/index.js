import { combineReducers } from 'redux'
import ms3000 from './ms3000'
import pixelEditor from './pixelEditor'
import navigation from './navigation'

export default combineReducers({
  ms3000, pixelEditor, navigation
})
