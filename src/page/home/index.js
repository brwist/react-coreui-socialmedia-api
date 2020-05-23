import React, { Suspense } from 'react';
import * as router from 'react-router-dom';
import {
  AppSidebar,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

import './index.scss';
import navigation from '../../config/nav'

class Home extends React.Component {
  render() {
    return (
      <AppSidebar fixed display="md">
        <Suspense>
          <AppSidebarNav navConfig={navigation} {...this.props} router={router} />
        </Suspense>
      </AppSidebar>
    )
  }
}

export default Home; 