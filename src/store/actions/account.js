import * as types from '../types/account';

export const setUser = user => ({
  type: types.SET_USER,
  user,
})