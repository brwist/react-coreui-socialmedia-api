import { SET_SHOPIFY_DATA, SHOPIFY_DATA_ERROR } from '../types/shopifyData';

export const setShopifyData = shopifyData => ({
  type: SET_SHOPIFY_DATA,
  shopifyData,
})

export const setShopifyDataError = error => {
  return ({
    type: SHOPIFY_DATA_ERROR,
    error
  })
}