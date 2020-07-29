import React, { Suspense, useState, useEffect } from 'react'
import * as router from 'react-router-dom';
import {
  AppSidebar,
  AppSidebarNav2 as AppSidebarNav,
  AppSidebarToggler,
  AppSidebarHeader,
  AppSidebarForm,
} from '@coreui/react';
import { Col, Container, Row } from 'reactstrap';
import { connect } from 'react-redux'
import Spinner from '../../../components/utils/Spinner';
import * as types from '../../../store/types/account'

import Panel from '../../../components/setupPanel/index';
import Overview from '../../../components/overview/index';
import './index.scss';
import navigation from '../../../config/nav'


function Setup (props) {
  const [activeLink, setActiveLink] = useState('image')

  const {
    getUser,
    user,
    } = props

  useEffect(() => {
    getUser();
  }, [getUser])


  const handleChangeActiveLink = (name) => {
    setActiveLink(name)
  }

  if (!user.conf) return <Spinner className='setup__spinner' color="dark" />

  return (
    <Container className='setupPage' fluid>
      <Row>
        <Col md={3} xl={2}>
          <AppSidebar fixed display="md">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navigation} router={router} />
            </Suspense>
          </AppSidebar>
        </Col>
            <Col style={{ paddingLeft: '30px' }} stlye={{ marginLeft: '100px' }} md={4} xl={3}>
              <Overview>
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
                        onClick={() => handleChangeActiveLink('image')}
                        className={activeLink === 'image' ? 'promote__wrapper-icon-active' : 'promote__wrapper-icon'}
                      >
                        <i
                          className={activeLink === 'image' ? "fa fa-file-image-o promote__icon-active" : "fa fa-file-image-o promote__icon"}
                        />
                      </div>
                      <div
                        onClick={() => handleChangeActiveLink('instagram')}
                        className={activeLink === 'instagram' ? 'promote__wrapper-icon-active' : 'promote__wrapper-icon'
                        }>
                        <i
                          className={activeLink === 'instagram' ? "fa fa-instagram promote__icon-active" : "fa fa-instagram promote__icon"}
                        />
                      </div>
                      <div
                        onClick={() => handleChangeActiveLink('shop')}
                        className={activeLink === 'shop' ? 'promote__wrapper-icon-active' : 'promote__wrapper-icon'}
                      >
                        <i
                          className={activeLink === 'shop' ? "fa fa-shopping-bag promote__icon-active" : "fa fa-shopping-bag promote__icon"}
                        />
                      </div>
                    </div>
                    <button className='promote__button'>
                      <i
                        className={activeLink === 'instagram' ? "fa fa-instagram promote__icon-active" : "fa fa-instagram promote__icon"}
                      />
                  Connect IG
                </button>

                  </Col>
                </Row>
              </Overview>
            </Col>
            <Panel/>
      </Row>
    </Container >
  )
}

const mapStateToProps = state => ({
  user: state.account.user,
  isLoading: state.account.isLoading
})

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch({ type: types.GET_USER }),
})

export default connect(mapStateToProps, mapDispatchToProps)(Setup) 