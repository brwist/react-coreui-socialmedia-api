import React, { useState, useEffect } from 'react';
import { Col, FormGroup, InputGroup, Input, InputGroupAddon, InputGroupText } from 'reactstrap'

import PhonePanel from '../../phonePanel/index'
import SocialImg from '../../social-img/index'
import './index.scss';
import Cov from '../../../assets/cov.png'
import phonePanel from '../../../assets/phone_panel.png'

const Covid = ({ setActiveLink, currentCovidStep, currentTab, setCurrentCovidSteps, prevCovidSteps, nextCovidSteps, marTop }) => {
  const img = [Cov, Cov, Cov, Cov, Cov, Cov, Cov, Cov, Cov, Cov]

  useEffect(() => {
    if (currentCovidStep === 0) {
      return setActiveLink('brand')
    } else if (currentCovidStep === 2) {
      return setActiveLink('live')
    }
  }, [currentCovidStep]);

  return (
    <>
      {currentCovidStep === 1 && <>
        <Col md={9} lg={3}>
          <SocialImg marTop={marTop} currentTab={currentTab} prevSteps={prevCovidSteps} isButton={true} gallery={img}>
            <h3 className='covid__template-title'>Select a Template</h3>
            <FormGroup className='covid__input'>
              <InputGroup>
                <Input type="text" id="search" name="search" placeholder="Search" />
                <InputGroupAddon addonType="append">
                  <InputGroupText style={{ background: '#383838' }}>
                    <i style={{ color: 'white' }} className="fas fa-search"></i>
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </FormGroup>
          </SocialImg>
        </Col>
        <Col className='offset-md-3 offset-lg-0' md={9} lg={7}>
          <PhonePanel currentTab={currentTab} img={phonePanel} nextSteps={nextCovidSteps} title={'Template Editor'} />
        </Col>
      </>}
    </>
  )
}

export default Covid;