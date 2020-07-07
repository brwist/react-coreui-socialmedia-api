import * as types from '../types/stories';

const initState = {
  stories: {},
  isLoading: false,
  error: {}
}

export default (state = initState, { type, stories, error }) => {
  switch (type) {

    case types.GET_STORIES:
      return {
        ...state,
        isLoading: true,
      }

    case types.SET_STORIES:
      return {
        ...state,
        stories,
        isLoading: false,
      }

    case types.STORIES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: error
      }

    default:
      return state;
  }
};