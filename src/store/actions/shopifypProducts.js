import { SET_SHOPIFY_PRODUCTS, SHOPIFY_PRODUCTS_ERROR } from '../types/shopifyProducts';

export const setShopifyProducts = shopifyProducts => ({
  type: SET_SHOPIFY_PRODUCTS,
  shopifyProducts,
})

export const setShopifyProductsError = error => {
  return ({
    type: SHOPIFY_PRODUCTS_ERROR,
    error
  })
}