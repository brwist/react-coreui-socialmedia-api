import React, { Suspense } from 'react'
import { Button, Col, Row, Container } from 'reactstrap';
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

const Publish = props => {
  return (
    <Container className='publish' fluid>
      <Row>
        <div className='d-flex publish__menu'>
          <AppSidebarToggler className="d-md-none" mobile>
            <i className="fa fa-navicon promote__icon" />
          </AppSidebarToggler>
        </div>
        <Col md={3} xl={2}>
          <AppSidebar fixed display="md">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navigation} {...props} router={router} />
            </Suspense>
          </AppSidebar>
        </Col>
        <Col className='publish__main' lg={9}>
          <Button className='publish__button' color='light'>Back</Button>
          <div className='publish__block'>
            <h3 className='publish__title'>Setup Your First Story</h3>
            <p className='publish__text'>What would you like display on the Lightbox Panel?</p>
            <StoryMenu menuItem={menuItem} />
          </div>
          <Button className='publish__button' color='warning'>Next</Button>
        </Col>
      </Row>
    </Container>
  )
}

export default Publish