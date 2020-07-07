import { combineReducers } from 'redux'
import account from './account'
import user from './user'
import workflow from './workflow'
import instagram from './instagramData'
import shopify from './shopifyData'
import instagramAccounts from './instagramAccounts'
import stories from './stories'

export default combineReducers({
  account,
  user,
  workflow,
  instagram,
  shopify,
  instagramAccounts,
  stories,
})