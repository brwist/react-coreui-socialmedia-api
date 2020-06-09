import React, { Suspense } from 'react';
import { connect } from "react-redux";
import * as router from 'react-router-dom';
import {
  AppSidebar,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

import './index.scss';
import navigation from '../../config/nav'
import Modal from '../../components/modalWindow/index'

class Home extends React.Component {
  // componentDidMount() {
  //   this.props.test();
  // }

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

const mapDispatchToProps = dispatch => ({
  test: () => dispatch({ type: 'TEST' })
})

export default connect(null, mapDispatchToProps)(Home); 