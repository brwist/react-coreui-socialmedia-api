import React, { Suspense, useState } from 'react'
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

import Spinner from '../../../components/utils/Spinner';
import StoryMenu from '../../../components/storyMenu/index'
import './index.scss'
import navigation from '../../../config/nav'
import ModalWindow from '../../../components/modalWindow/index'


const Publish = props => {
  const [workflowId, setWorkflowId] = useState('');
  const [locationId, setLocationId] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const { userInfo, userLocation } =props

  const changeClickedPanel = (workflowId, locationId) => e => {
    setIsOpen(true);
    setWorkflowId(workflowId);
    setLocationId(locationId);
  };

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
              <AppSidebarNav navConfig={navigation} router={router} />
            </Suspense>
          </AppSidebar>
        </Col>
        <Col className='publish__main' md={9}>
          <div className='publish__block'>
            <h3 className='publish__title'>Setup Your First Story</h3>
            <p className='publish__text'>What would you like display on the Lightbox Panel?</p>
            {userLocation.id && <StoryMenu location={userLocation} changeIsOpen={changeIsOpen} changeClickedPanel={changeClickedPanel} />}
          </div>
        </Col>
      </Row>
      <div className="corner-info">
        <strong>Location:</strong> {userLocation.name}
      </div>
    </Container> : <Spinner className='setup__spinner' color="dark" />
  )
}


const mapStateToProps = state => ({
  userInfo: state.user.userInfo,
  userLocation: state.user.userLocation,
})


export default connect(mapStateToProps)(Publish);