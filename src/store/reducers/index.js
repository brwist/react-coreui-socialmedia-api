import { combineReducers } from 'redux'
import account from './account'
import user from './user'
import workflow from './workflow'

export default combineReducers({
  account,
  user,
  workflow,
})