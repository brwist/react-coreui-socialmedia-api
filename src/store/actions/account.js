import * as types from '../types/account';

export const setUser = user => ({
  type: types.SET_USER,
  user,
})

export const isLoading = loading => {
  return ({
    type: types.IS_LOADING_USER,
    loading
  })
}