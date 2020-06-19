import React, { Suspense, useState, useEffect } from 'react'
import { connect } from "react-redux";

import { Col, Row, Container } from 'reactstrap';
import * as router from 'react-router-dom';
import {
  AppSidebar,
  AppSidebarNav2 as AppSidebarNav,
  AppSidebarToggler,
  AppSidebarHeader,
  AppSidebarForm,
} from '@coreui/react';
import { Spinner } from 'reactstrap';

import StoryMenu from '../../../components/storyMenu/index'
import './index.scss'
import navigation from '../../../config/nav'
import ModalWindow from '../../../components/modalWindow/index'

import { GET_USER_INFO } from '../../../store/types/user'


const Publish = props => {
  const [workflowId, setWorkflowId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { getUserInfo, userInfo } =props

  const changeClickedPanel = (workflowId, locationId) => e => {
    setIsOpen(true);
    setWorkflowId(workflowId);
    setLocationId(locationId);
  };

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo])

  const changeIsOpen = () => setIsOpen(!isOpen);

  return (
    userInfo.locations ? <Container className='publish' fluid>
      {isOpen && <ModalWindow story="storySteps" workflowId={workflowId} locationId={locationId} activeLink="story" handleChangeOpen={changeIsOpen} isOpen={isOpen} />}
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
              <AppSidebarNav navConfig={navigation} {...props} router={router} />
            </Suspense>
          </AppSidebar>
        </Col>
        <Col className='publish__main' md={9}>
          <div className='publish__block'>
            <h3 className='publish__title'>Setup Your First Story</h3>
            <p className='publish__text'>What would you like display on the Lightbox Panel?</p>
            <StoryMenu locations={userInfo.locations} changeIsOpen={changeIsOpen} changeClickedPanel={changeClickedPanel} />
          </div>
        </Col>
      </Row>
    </Container> : <Spinner className='setup__spinner' color="dark" />
  )
}


const mapStateToProps = state => ({
  userInfo: state.user.userInfo,
})

const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch({ type: GET_USER_INFO }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Publish);