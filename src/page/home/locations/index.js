import React, { Suspense, useState, useEffect } from 'react'
import { connect } from "react-redux";

import { Col, Row, FormGroup, Input, Button } from 'reactstrap';
import * as router from 'react-router-dom';
import {
  AppSidebar,
  AppSidebarNav2 as AppSidebarNav,
  AppSidebarToggler,
  AppSidebarHeader,
  AppSidebarForm,
} from '@coreui/react';

import './index.scss'
import navigation from '../../../config/nav'

import { setUserLocation } from '../../../store/actions/user'


const Locations = props => {
  const {
    userInfo,
    setUserLocation,
    userLocation,
  } = props

  const [location, setLocation] = useState('')
  const [save, setSave] = useState(false)

  useEffect(() => {
    setLocation(userLocation.id)
  }, [userLocation, setLocation])

  const handleLocationSelect =e => {
    const { value } = e.target
    setLocation(value)
    setSave(false)
  }

  const handleLocationSave = e => {
    setUserLocation(userInfo.locations.find(({ id }) => id === location))
    setSave(true)
  }

  return (
    <Row>
      <div className='d-flex publish__menu'>
        <AppSidebarToggler className="d-md-none" mobile>
          <i className="fa fa-navicon promote__icon" />
        </AppSidebarToggler>
      </div>
      <Col md={3} lg={2}>
        <AppSidebar fixed display="md">
          <AppSidebarHeader />
          <AppSidebarForm />
          <Suspense>
            <AppSidebarNav navConfig={navigation} router={router} />
          </Suspense>
        </AppSidebar>
      </Col>
      <Col className='publish__main' md={9}>
        <div className='publish__block'>
          <h3 className='publish__title'>Select Location</h3>
          <FormGroup>
            <Input type="select" name="location" id="location" value={location} className="location-select" onChange={handleLocationSelect}>
              <option key="choose" value='' disabled>Choose Location</option>
              {userInfo.locations.map(({id, name}) => {
                return <option key={id} value={id}>{name}</option>
              })}
            </Input>
          </FormGroup>
          <div className="location-select" style={{textAlign: 'right'}}>
            {save && <span>Location is Saved</span>} <Button onClick={handleLocationSave} color='warning'>Save</Button>
          </div>
        </div>
      </Col>
      </Row>
  )
}


const mapStateToProps = state => ({
  userInfo: state.user.userInfo,
  userLocation: state.user.userLocation,
})

const mapDispatchToProps = dispatch => ({
  setUserLocation: (location) => dispatch(setUserLocation(location)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Locations);