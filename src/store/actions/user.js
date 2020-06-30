import * as types from '../types/user';

export const setUserInfo = userInfo => ({
  type: types.SET_USER_INFO,
  userInfo,
})

export const setUserInfoError = error => {
  return ({
    type: types.USER_INFO_ERROR,
    error
  })
}
export const setUserLocation = userLocation => {
  window.localStorage.setItem('locationId', userLocation && userLocation.id)
  return ({
    type: types.SET_USER_LOCATION,
    userLocation
  })
}