import * as types from '../types/instagramData';

const initState = {
  instagramData: {},
  isLoading: false,
  error: {}
}

export default (state = initState, { type, instagramData, error }) => {
  switch (type) {

    case types.GET_INSTAGRAM_DATA:
      return {
        ...state,
        isLoading: true,
      }

    case types.SET_INSTAGRAM_DATA:
      return {
        ...state,
        instagramData,
        isLoading: false,
      }

    case types.INSTAGRAM_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        error: error
      }

    default:
      return state;
  }
};