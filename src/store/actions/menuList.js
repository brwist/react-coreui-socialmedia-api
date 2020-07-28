import { SET_MENU_LIST, MENU_LIST_ERROR } from '../types/menuList';

export const setMenuList = menuList => ({
  type: SET_MENU_LIST,
  menuList,
})

export const setMenuListError = error => {
  return ({
    type: MENU_LIST_ERROR,
    error
  })
}