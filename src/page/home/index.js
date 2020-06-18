import React, { Suspense, useEffect } from 'react';
import { connect } from "react-redux";
import * as router from 'react-router-dom';
import * as types from '../../store/types/account'
import { GET_USER_INFO } from '../../store/types/user'
import {
  AppSidebar,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';
import { Spinner } from 'reactstrap';

import './index.scss';
import navigation from '../../config/nav'
import ModalWindow from '../../components/modalWindow/index'

function Home (props) {
  const {
    userInfo: {
      locations
    },
    userInfoIsLoading,
    loginUser,
    getUserInfo,
  } = props

  useEffect(() => {
    loginUser();
  }, [loginUser])

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo])

  if (!locations || userInfoIsLoading) return <Spinner className='setup__spinner' color="dark" />

  const locationWithUncompletedOnboarding = locations.find(location => location.locnConfig.onboardingComplete === false)
  const onboardingWF = locationWithUncompletedOnboarding && locationWithUncompletedOnboarding.locnConfig.onboardingWF


  return (
    <AppSidebar fixed display="md">
      <Suspense>
        <AppSidebarNav navConfig={navigation} {...props} router={router} />
        <ModalWindow story="storySteps" workflowId={onboardingWF} locationId={locationWithUncompletedOnboarding.id} activeLink="story" isOpen={onboardingWF} />
      </Suspense>
    </AppSidebar>
  )
}

const mapStateToProps = state => ({
  user: state.account.user,
  userInfo: state.user.userInfo,
  userInfoIsLoading: state.user.isLoading,
})

const mapDispatchToProps = dispatch => ({
  getUser: () => dispatch({ type: types.GET_USER }),
  getUserInfo: () => dispatch({ type: GET_USER_INFO }),
  loginUser: () => dispatch({ type: types.LOGIN_USER })
})

export default connect(mapStateToProps, mapDispatchToProps)(Home); 