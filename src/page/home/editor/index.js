import React, { Suspense } from 'react'
import * as router from 'react-router-dom';
import {
  AppSidebar,
  AppSidebarNav2 as AppSidebarNav,
  AppSidebarHeader,
  AppSidebarForm,
} from '@coreui/react';
import { Col, Container, Row } from 'reactstrap';

import Panel from '../../../components/editor/index';
import EditorLightbox from '../../../components/editorLightbox/index'
import './index.scss';
import navigation from '../../../config/nav'


class Editor extends React.Component {
  state = {
    activeLink: 'image',
  }

  handleChangeActiveLink = (name) => {
    this.setState({
      activeLink: name,
    })
  }

  render() {
    return (
      <Container className='promote' fluid>
        <p block className="title-page">My lightbox</p>
        <Row>
          <Col md={3} lg={2}>
            <AppSidebar fixed display="md">
              <AppSidebarHeader />
              <AppSidebarForm />
              <Suspense>
                <AppSidebarNav navConfig={navigation} {...this.props} router={router} />
              </Suspense>
            </AppSidebar>
          </Col>
          <Col className='d-flex justify-content-center' md={4} lg={5}>
            <EditorLightbox className="editor-light-box" />
          </Col>
          <Col className='promote__wrapper-panel' style={{ marginTop: '30px' }} md={5} lg={5}>
            <Panel />
          </Col>
        </Row>
      </Container >
    )
  }
}

export default Editor 