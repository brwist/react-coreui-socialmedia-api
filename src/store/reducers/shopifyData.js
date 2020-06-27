import * as types from '../types/shopifyData';

const initState = {
  shopifyData: [],
  isLoading: false,
  error: {}
}

export default (state = initState, { type, shopifyData, error }) => {
  switch (type) {

    case types.GET_SHOPIFY_DATA:
      return {
        ...state,
        isLoading: true,
      }

    case types.SET_SHOPIFY_DATA:
      return {
        ...state,
        shopifyData,
        isLoading: false,
      }

    case types.SHOPIFY_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        error: error
      }

    default:
      return state;
  }
};