import React, { Suspense, useState } from 'react'
import { Col, Row, Container } from 'reactstrap';
import * as router from 'react-router-dom';
import {
  AppSidebar,
  AppSidebarNav2 as AppSidebarNav,
  AppSidebarToggler,
  AppSidebarHeader,
  AppSidebarForm,
} from '@coreui/react';

import StoryMenu from '../../../components/storyMenu/index'
import './index.scss'
import navigation from '../../../config/nav'
import menuItem from '../../../config/dataMenu'
import ModalWindow from '../../../components/modalWindow/index'

const Publish = props => {
  const [story, setStory] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const changeClickedPanel = selectedStory => {
    setIsOpen(!isOpen);
    return setStory(selectedStory);
  };

  const changeIsOpen = () => setIsOpen(!isOpen);

  return (
    <Container className='publish' fluid>
      <ModalWindow story={story} activeLink="story" handleChangeOpen={changeIsOpen} isOpen={isOpen} />
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
            <StoryMenu changeClickedPanel={changeClickedPanel} menuItem={menuItem} />
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Publish