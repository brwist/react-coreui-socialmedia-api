import * as types from '../types/account';

const initState = {
  user: {},
  isLoading: false
}

export default (state = initState, { type, user, loading }) => {
  switch (type) {

    case types.SET_USER:
      return {
        ...state,
        user,
      }

    case types.IS_LOADING_USER:
      return {
        ...state,
        isLoading: loading
      }

    default:
      return state;
  }
};