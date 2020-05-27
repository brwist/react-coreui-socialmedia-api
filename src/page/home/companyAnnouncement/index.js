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

class CompanyAnnouncement extends React.Component {

  state = {
    activeButton: 'Templates'
  }

  onChangeActiveButton = name => this.setState({ activeButton: name })

  render() {
    const { activeButton } = this.state;

    return (
      <Container className='company' fluid>
        <p className='title-page'>Company Announcement</p>
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
              <Row className='company__buttons-wrapper'>
                <Col className='company__buttons-block d-flex justify-content-center' xs={5} md={11} lg={6}>
                  <Button
                    active={activeButton === 'Templates'}
                    block
                    outline
                    color="dark company__button"
                    onClick={() => this.onChangeActiveButton('Templates')}
                  >
                    Templates
                    </Button>
                </Col>
                <Col className='company__buttons-block' xs={5} md={11} lg={6}>
                  <Button
                    active={activeButton === 'Libary'}
                    block
                    outline
                    color="dark company__button"
                    onClick={() => this.onChangeActiveButton('Libary')}
                  >
                    Libary
                    </Button>
                </Col>
                <Col className='d-flex justify-content-center' xs={2}>
                  <div className='d-flex'>
                    <AppSidebarToggler
                      className="d-md-none promote__wrapper-icon"
                      mobile
                    >
                      <i
                        className="fa fa-navicon promote__icon"
                      />
                    </AppSidebarToggler>
                  </div>
                </Col>
              </Row>
              {activeButton === 'Libary' && (
                <Row className='justify-content-center company__upload-block'>
                  <Col className='company__buttons-block' xs={5} md={11}>
                    <Button
                      block
                      outline
                      color="dark company__upload"
                    >
                      Upload
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

export default CompanyAnnouncement