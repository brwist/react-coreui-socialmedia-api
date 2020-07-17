import * as types from '../types/shopifyProducts';

const initState = {
  shopifyProducts: [],
  isLoading: false,
  error: {}
}

export default (state = initState, { type, shopifyProducts, error }) => {
  switch (type) {

    case types.GET_SHOPIFY_PRODUCTS:
      return {
        ...state,
        isLoading: true,
      }

    case types.SET_SHOPIFY_PRODUCTS:
      return {
        ...state,
        shopifyProducts,
        isLoading: false,
      }

    case types.SHOPIFY_PRODUCTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: error
      }

    default:
      return state;
  }
};