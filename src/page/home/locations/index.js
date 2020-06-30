import React, { Suspense } from 'react'
import { connect } from "react-redux";

import { Col, Row, FormGroup, Input } from 'reactstrap';
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

  const handleLocationSelect = e => {
    const { value } = e.target
    setUserLocation(userInfo.locations.find(({ id }) => id === value))
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
            <Input type="select" name="location" id="location" value={userLocation.id} className="location-select" onChange={handleLocationSelect}>
              {userInfo.locations.map(({id, name}) => {
                return <option key={id} value={id}>{name}</option>
              })}
            </Input>
          </FormGroup>
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