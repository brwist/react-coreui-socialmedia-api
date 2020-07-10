import * as types from '../types/analytics';

const initState = {
  analytics: {},
  isLoading: false,
  error: {}
}

export default (state = initState, { type, analytics, error }) => {
  switch (type) {

    case types.GET_ANALYTICS:
      return {
        ...state,
        isLoading: true,
      }

    case types.SET_ANALYTICS:
      return {
        ...state,
        analytics,
        isLoading: false,
      }

    case types.ANALYTICS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: error
      }

    default:
      return state;
  }
};