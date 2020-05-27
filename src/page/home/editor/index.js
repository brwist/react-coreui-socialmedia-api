import React, { Suspense } from 'react'
import * as router from 'react-router-dom';
import {
  AppSidebar,
  AppSidebarNav2 as AppSidebarNav,
  AppSidebarToggler,
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
            <EditorLightbox className="editor-light-box">
                
            </EditorLightbox>



          </Col>
          <Col md={5} lg={5} xl={7}>
            <Panel />
          </Col>
        </Row>
      </Container >
    )
  }
}

export default Editor 