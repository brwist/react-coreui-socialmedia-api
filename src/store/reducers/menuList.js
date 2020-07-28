import * as types from '../types/menuList';

const initState = {
  menuList: [],
  isLoading: false,
  error: {}
}

export default (state = initState, { type, menuList, error }) => {
  switch (type) {

    case types.GET_MENU_LIST:
      return {
        ...state,
        isLoading: true,
      }

    case types.SET_MENU_LIST:
      return {
        ...state,
        menuList,
        isLoading: false,
      }

    case types.MENU_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: error
      }

    default:
      return state;
  }
};