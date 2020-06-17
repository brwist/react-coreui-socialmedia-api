import { combineReducers } from 'redux'
import account from './account'
import user from './user'

export default combineReducers({
  account,
  user,
})