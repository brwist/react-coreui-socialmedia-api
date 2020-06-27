import { combineReducers } from 'redux'
import account from './account'
import user from './user'
import workflow from './workflow'
import instagram from './instagramData'
import shopify from './shopifyData'

export default combineReducers({
  account,
  user,
  workflow,
  instagram,
  shopify,
})