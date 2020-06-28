import * as types from '../types/account';

const initState = {
  user: {},
  isLoading: false
}

export default (state = initState, { type, user, loading }) => {
  switch (type) {

    case types.GET_USER:
      return {
        ...state,
        isLoading: true
      }

    case types.SET_USER:
      return {
        ...state,
        user,
        isLoading: false
      }

    default:
      return state;
  }
};