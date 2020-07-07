import React, { Suspense, useEffect, useState } from 'react'
import * as router from 'react-router-dom';
import {
  AppSidebar,
  AppSidebarNav2 as AppSidebarNav,
  AppSidebarHeader,
  AppSidebarForm,
} from '@coreui/react';
import { Col, Container, Row, Spinner } from 'reactstrap';

import Panel from '../../../components/editor/index';
import EditorLightbox from '../../../components/editorLightbox/index'
import './index.scss';
import navigation from '../../../config/nav'

import { connect } from "react-redux";


import { GET_STORIES } from '../../../store/types/stories'



function Editor(props) {

  const {
    getStories,
    stories,
    userLocation: {
      id
    }
  } = props

  const [previewImage, setPreviewImage] = useState('');

  useEffect(() => {
    if(id) {
      getStories(id)
    }
  }, [id, getStories])

  return (
    <Container className='promote' fluid>
      <p className="title-page">My lightbox</p>
      <Row>
        <Col md={3} lg={2}>
          <AppSidebar fixed display="md">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={navigation} router={router} />
            </Suspense>
          </AppSidebar>
        </Col>
        <Col className='d-flex justify-content-center' md={4} lg={5}>
          {stories.startMenu
            ? <EditorLightbox className="editor-light-box" stories={stories.startMenu} setPreviewImage={setPreviewImage} />
            : <Spinner className='setup__spinner' color="dark" />
          }
        </Col>
        <Col className='promote__wrapper-panel' style={{ marginTop: '30px' }} md={5} lg={5}>
          <Panel  previewImage={previewImage}/>
        </Col>
      </Row>
    </Container >
  )
}

const mapStateToProps = state => ({
  stories: state.stories.stories,
  userLocation: state.user.userLocation,
})

const mapDispatchToProps = dispatch => ({
  getStories: (locationId) => dispatch({ type: GET_STORIES , payload: { locationId }}),
})

export default connect(mapStateToProps, mapDispatchToProps)(Editor);