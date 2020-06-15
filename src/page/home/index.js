import React, { Suspense } from 'react';
import { connect } from "react-redux";
import * as router from 'react-router-dom';
import * as types from '../../store/types/account'
import {
  AppSidebar,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

import './index.scss';
import navigation from '../../config/nav'
import Modal from '../../components/modalWindow/index'

class Home extends React.Component {
  componentDidMount() {
    //this.props.getUser();
    this.props.loginUser();
  }

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

const mapStateToProps = state => ({
  user: state.account.user,
})

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch({ type: types.GET_USER }),
  loginUser: () => dispatch({ type: types.LOGIN_USER })
})

export default connect(mapStateToProps, mapDispatchToProps)(Home); 