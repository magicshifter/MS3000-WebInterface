import { combineReducers } from 'redux'
import ms3000 from './ms3000'
import fileSystem from './fileSystem'
import pixelEditor from './pixelEditor'
import navigation from './navigation'
import sockets from './sockets'

export default combineReducers({
  ms3000, fileSystem, sockets, pixelEditor, navigation
})
