import * as types from '../types/user';

const initState = {
  userInfo: {},
  isLoading: false,
  error: {}
}

export default (state = initState, { type, userInfo, error }) => {
  switch (type) {

    case types.GET_USER_INFO:
      return {
        ...state,
        isLoading: true,
      }

    case types.SET_USER_INFO:
      return {
        ...state,
        userInfo,
        isLoading: false,
      }

    case types.USER_INFO_ERROR:
      return {
        ...state,
        isLoading: false,
        error: error
      }

    default:
      return state;
  }
};