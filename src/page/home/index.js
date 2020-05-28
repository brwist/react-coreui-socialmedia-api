import React, { Suspense } from 'react';
import * as router from 'react-router-dom';
import {
  AppSidebar,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

import './index.scss';
import navigation from '../../config/nav'
import Modal from '../../components/modalWindow/index'

class Home extends React.Component {
  render() {
    return (
      <AppSidebar fixed display="md">
        <Suspense>
          <AppSidebarNav navConfig={navigation} {...this.props} router={router} />
          {this.props.location.pathname !== '/' && <Modal {...this.props} isOpen={true} />}
        </Suspense>
      </AppSidebar>
    )
  }
}

export default Home; 