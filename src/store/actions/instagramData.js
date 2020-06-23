import { SET_INSTAGRAM_DATA, INSTAGRAM_DATA_ERROR } from '../types/instagramData';

export const setInstgramData = instagramData => ({
  type: SET_INSTAGRAM_DATA,
  instagramData,
})

export const setInstgramDataError = error => {
  return ({
    type: INSTAGRAM_DATA_ERROR,
    error
  })
}