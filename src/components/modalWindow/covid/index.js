import React, { useEffect } from 'react';
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
  }, [currentCovidStep, setActiveLink]);

  return (
    <>
      {currentCovidStep === 1 && <>
        <Col className='covid-wrapper' md={9} lg={4}>
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
        <Col className='phoneSetup offset-md-2 offset-lg-0' md={10} lg={6}>
          <PhonePanel currentTab={currentTab} img={phonePanel} prevSteps={prevCovidSteps} nextSteps={nextCovidSteps} title={'Template Editor'} />
        </Col>
      </>}
    </>
  )
}

export default Covid;