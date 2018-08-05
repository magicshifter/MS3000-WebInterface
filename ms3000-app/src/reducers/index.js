import { combineReducers } from 'redux'
import ms3000 from './ms3000'
import pixelEditor from './pixelEditor'
import navigation from './navigation'
import sockets from './sockets'

export default combineReducers({
  ms3000, sockets, pixelEditor, navigation
})
