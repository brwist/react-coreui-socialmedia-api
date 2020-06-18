import * as types from '../types/workflow';

const initState = {
  workflow: {},
  isLoading: false,
  error: {}
}

export default (state = initState, { type, workflow, error }) => {
  switch (type) {

    case types.GET_WORKFLOW:
      return {
        ...state,
        isLoading: true,
      }

    case types.SET_WORKFLOW:
      return {
        ...state,
        workflow,
        isLoading: false,
      }

    case types.WORKFLOW_ERROR:
      return {
        ...state,
        isLoading: false,
        error: error
      }

    default:
      return state;
  }
};