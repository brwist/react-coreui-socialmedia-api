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

import './index.scss'
import navigation from '../../../config/nav'

const Publish = props => {
  return (
    <Container className='publish' fluid>
      <Row>
        <Col md={3} xl={2}>
          <AppSidebar fixed display="md">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navigation} {...props} router={router} />
            </Suspense>
          </AppSidebar>
        </Col>
        {/* <Col md={9} xl={2}>
          <h3>Setup Your First Story</h3>
          <p>What would you like display on the Lightbox Panel?</p>
        </Col> */}
      </Row>
    </Container>
  )
}

export default Publish