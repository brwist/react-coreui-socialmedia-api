import React, { Suspense, useEffect } from 'react';
import { connect } from "react-redux";
import * as router from 'react-router-dom';
import * as types from '../../store/types/account'
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
  } = props

  useEffect(() => {
    loginUser();
  }, [loginUser])

  if (!locations || userInfoIsLoading) return <Spinner className='setup__spinner' color="dark" />

  const locationWithUncompletedOnboarding = locations.find(location => location.locnConfig.onboardingComplete === false)
  const onboardingWF = locationWithUncompletedOnboarding && locationWithUncompletedOnboarding.locnConfig.onboardingWF


  return (
    <AppSidebar fixed display="md">
      <Suspense>
        <AppSidebarNav navConfig={navigation} router={router} />
        {locationWithUncompletedOnboarding && <ModalWindow story="storySteps" onBoarding="true" workflowId={onboardingWF} locationId={locationWithUncompletedOnboarding.id} activeLink="story" isOpen={onboardingWF} />}
      </Suspense>
    </AppSidebar>
  )
}

const mapStateToProps = state => ({
  userInfo: state.user.userInfo,
  userInfoIsLoading: state.user.isLoading,
})

const mapDispatchToProps = dispatch => ({
  loginUser: () => dispatch({ type: types.LOGIN_USER })
})

export default connect(mapStateToProps, mapDispatchToProps)(Home); 