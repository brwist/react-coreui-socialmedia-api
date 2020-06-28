import { SET_INSTAGRAM_ACCOUNTS, INSTAGRAM_ACCOUNTS_ERROR } from '../types/instagramAccounts';

export const setInstagramAccounts = instagramAccounts => ({
  type: SET_INSTAGRAM_ACCOUNTS,
  instagramAccounts,
})

export const setInstagramAccountsError = error => {
  return ({
    type: INSTAGRAM_ACCOUNTS_ERROR,
    error
  })
}