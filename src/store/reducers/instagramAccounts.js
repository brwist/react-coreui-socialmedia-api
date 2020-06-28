import * as types from '../types/instagramAccounts';

const initState = {
  accounts: {},
  isLoading: false,
  error: {}
}

export default (state = initState, { type, instagramAccounts, error }) => {
  switch (type) {

    case types.GET_INSTAGRAM_ACCOUNTS:
      return {
        ...state,
        isLoading: true,
      }

    case types.SET_INSTAGRAM_ACCOUNTS:
      return {
        ...state,
        accounts: instagramAccounts,
        isLoading: false,
      }

    case types.INSTAGRAM_ACCOUNTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: error
      }

    default:
      return state;
  }
};