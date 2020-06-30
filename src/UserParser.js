import React, { useEffect } from 'react'
import { connect } from "react-redux";

import { Spinner } from 'reactstrap';


import { GET_USER_INFO } from './store/types/user'

import { setUserLocation } from './store/actions/user'


const Locations = props => {
  const {
    getUserInfo,
    userInfo,
    userLocation,
    setUserLocation,
  } = props

  useEffect(() => {
    if (!userInfo.locations) {
      getUserInfo();
    }
  }, [getUserInfo, userInfo])

  useEffect(() => {

    const locationId = window.localStorage.getItem('locationId')
    if (!userLocation.id && userInfo.locations) {
      const defaultLocation = locationId ? userInfo.locations.find(({ id }) => id === locationId) : userInfo.locations[0]
      setUserLocation(defaultLocation || {})
    }
  }, [userInfo, userLocation, setUserLocation])

  if (!userInfo.locations) return <Spinner className='setup__spinner' color="dark" />

  return props.children
}


const mapStateToProps = state => ({
  userInfo: state.user.userInfo,
  userLocation: state.user.userLocation,
})

const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch({ type: GET_USER_INFO }),
  setUserLocation: (location) => dispatch(setUserLocation(location)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Locations);