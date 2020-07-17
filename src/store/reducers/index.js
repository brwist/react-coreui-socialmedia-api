import { combineReducers } from 'redux'
import account from './account'
import user from './user'
import workflow from './workflow'
import instagram from './instagramData'
import shopify from './shopifyData'
import instagramAccounts from './instagramAccounts'
import stories from './stories'
import analytics from './analytics'
import shopifyProducts from './shopifyProducts'

export default combineReducers({
  account,
  user,
  workflow,
  instagram,
  shopify,
  instagramAccounts,
  stories,
  analytics,
  shopifyProducts,
})