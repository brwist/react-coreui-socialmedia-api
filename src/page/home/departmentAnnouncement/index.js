import React, { Suspense } from 'react'
import * as router from 'react-router-dom';
import {
  AppSidebar,
  AppSidebarNav2 as AppSidebarNav,
  AppSidebarHeader,
  AppSidebarForm,
  AppSidebarToggler
} from '@coreui/react';
import { Col, Container, Row, Button } from 'reactstrap';

import Panel from '../../../components/panel/index';
import SocialImg from '../../../components/social-img/index'
import './index.scss';
import navigation from '../../../config/nav'

class DeprtmentAnnouncement extends React.Component {

  state = {
    activeButton: 'Templates'
  }

  onChangeActiveButton = name => this.setState({ activeButton: name })

  render() {
    const { activeButton } = this.state;

    return (
      <Container className='department' fluid>
        <div className="department-title">
          <p className='title-page'>Department Announcement</p>
        </div>
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
          <Col style={{ paddingLeft: '30px' }} stlye={{ marginLeft: '100px' }} md={4} xl={3}>
            <SocialImg>
              <Row className='department__buttons-wrapper'>
                <Col className='department__buttons-block' xs={5} md={11}>
                  <Button
                    active={activeButton === 'Templates'}
                    block
                    outline
                    color="dark department__button"
                    onClick={() => this.onChangeActiveButton('Templates')}
                  >
                    Templates
                  </Button>
                </Col>
                <Col className='department__buttons-block' xs={5} md={11}>
                  <Button
                    active={activeButton === 'Google Slides'}
                    block
                    outline
                    color="dark department__button"
                    onClick={() => this.onChangeActiveButton('Google Slides')}
                  >
                    Google Slides
                  </Button>
                </Col>
                <Col className='d-flex justify-content-center' xs={2}>
                  <div className='d-flex'>
                  <AppSidebarToggler className="d-md-none promote__wrapper-icon" mobile>
                    <i className="fa fa-navicon promote__icon" />
                  </AppSidebarToggler>
                  </div>
                </Col>
              </Row>
              {activeButton === 'Google Slides' && (
                <Row className='justify-content-center department__upload-block'>
                  <Col className='department__buttons-block' xs={5} md={11}>
                    <Button
                      block
                      outline
                      color="dark department__upload"
                    >
                      Connect Drive
                  </Button>
                  </Col>
                </Row>
              )}
            </SocialImg>
          </Col>
          <Col md={5} lg={5} xl={7}>
            <Panel />
          </Col>
        </Row>
      </Container >
    )
  }
}

export default DeprtmentAnnouncement