import React, { Suspense } from 'react'
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
import { Col, Container, Row } from 'reactstrap';

import Panel from '../../../components/panel/index';
import SocialImg from '../../../components/social-img/index'
import './index.scss';
import navigation from '../../../config/nav'


class Promote extends React.Component {
  state = {
    activeLink: 'image',
  }

  handleChangeActiveLink = (name) => {
    this.setState({
      activeLink: name,
    })
  }

  render() {
    const { activeLink } = this.state;

    return (
      <Container className='promote' fluid>
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
              <Row>
                <Col className='d-flex justify-content-between promote__icon-block' col={12}>
                  <div className='d-flex'>
                    <AppSidebarToggler
                      className="d-md-none promote__wrapper-icon"
                      // display="lg"
                      mobile
                    >
                      <i
                        className="fa fa-navicon promote__icon"
                      />
                    </AppSidebarToggler>
                    <div
                      onClick={() => this.handleChangeActiveLink('image')}
                      className={activeLink === 'image' ? 'promote__wrapper-icon-active' : 'promote__wrapper-icon'}
                    >
                      <i
                        className={activeLink === 'image' ? "fa fa-file-image-o promote__icon-active" : "fa fa-file-image-o promote__icon"}
                      />
                    </div>
                    <div
                      onClick={() => this.handleChangeActiveLink('instagram')}
                      className={activeLink === 'instagram' ? 'promote__wrapper-icon-active' : 'promote__wrapper-icon'
                      }>
                      <i
                        className={activeLink === 'instagram' ? "fa fa-instagram promote__icon-active" : "fa fa-instagram promote__icon"}
                      />
                    </div>
                    <div
                      onClick={() => this.handleChangeActiveLink('shop')}
                      className={activeLink === 'shop' ? 'promote__wrapper-icon-active' : 'promote__wrapper-icon'}
                    >
                      <i
                        className={activeLink === 'shop' ? "fa fa-shopping-bag promote__icon-active" : "fa fa-shopping-bag promote__icon"}
                      />
                    </div>
                  </div>
                  <button className='promote__button'>
                    Connect IG
                  </button>
                </Col>
              </Row>
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

export default Promote 