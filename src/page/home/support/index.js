import React, { Suspense } from 'react';
import * as router from 'react-router-dom';
import {
  AppSidebar,
  AppSidebarNav2 as AppSidebarNav,
  AppSidebarToggler,
  AppSidebarHeader,
  AppSidebarForm,
  AppSidebarFooter,
  AppSidebarMinimizer
} from '@coreui/react';
import { Col, Container, Row, Button } from 'reactstrap';

import './index.scss';
import navigation from '../../../config/nav'

class Support extends React.Component {
  state = {
    activeButton: 'Hours'
  }

  changeActiveButton = name => this.setState({ activeButton: name })

  render() {
    const { activeButton } = this.state;

    return (
      <Container className='support' fluid>
        <p className='title-page'>Support</p>
        <AppSidebarToggler
          className="d-md-none promote__wrapper-icon support__nav-icon"
          mobile
        >
          <i
            className="fa fa-navicon promote__icon"
          />
        </AppSidebarToggler>
        <Row>
          <Col md={3} xl={2}>
            <AppSidebar fixed display="md">
              <AppSidebarHeader />
              <AppSidebarForm />
              <Suspense>
                <AppSidebarNav navConfig={navigation} {...this.props} router={router} />
              </Suspense>
            </AppSidebar>
          </Col>
          <Col className='support__page' md={9} xl={10}>
            <Row className='support__page-wrapper'>
              <Col className='support__page-left' lg={6}>
                <h3 className='support__title'>How can we help?</h3>
                <div className='support__wrapper-chat'>
                  <div className='support__chat-block'></div>
                  <div className='support__chat-input-wrapper'>
                    <input placeholder='Message...' className='support__chat-input' />
                    <Button
                      block
                      outline
                      color="dark"
                      className='support__chat-send'
                    >
                      Send
                  </Button>
                  </div>
                </div>
              </Col>
              <Col className='support__page-right' lg={6}>
                <h3 className='support__title'>Support Details</h3>
                <Button
                  block
                  outline
                  color="dark support__button"
                  active={activeButton === 'Hours'}
                  onClick={() => this.changeActiveButton('Hours')}
                >
                  <i className="fa fa-clock-o support__icon" />
                  Support Hours
                  </Button>
                <Button
                  block
                  outline
                  color="dark support__button"
                  active={activeButton === 'Email'}
                  onClick={() => this.changeActiveButton('Email')}
                >
                  <i className="fa icon-envelope support__icon" />
                  Email
                  </Button>
                <Button
                  block
                  outline
                  color="dark support__button"
                  active={activeButton === 'Phone'}
                  onClick={() => this.changeActiveButton('Phone')}
                >
                  <i className="fa fa-phone support__icon" />
                  Phone Number
                  </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Support