import React, { useEffect, useState } from 'react'
import { Col, Button } from 'reactstrap';
import PhonePanel from '../../phonePanel/index'
import SetupAStory from './../setupAStory/index'
import phonePanel from '../../../assets/phone.png'
import SocialImg from '../../social-img/index'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShopify } from "@fortawesome/free-brands-svg-icons"

import manImg from '../../../assets/man.png';
import storyPreview from '../../../assets/story-preview.png';
import './index.scss'

const PromoteProduct = ({ prevPromoteSteps, nextPromoteSteps, setActiveLink, currentTab, currentPromoteStep, marTop }) => {

  const [activeSocialNetwork, setSocialNetwork] = useState('instagram');

  const setNetwork = network => setSocialNetwork(network)

  const img = [manImg, manImg, manImg, manImg, manImg, manImg, manImg, manImg, manImg, manImg]

  useEffect(() => {
    if (currentPromoteStep === 0) {
      return setActiveLink('brand')
    } else if (currentPromoteStep === 3) {
      return setActiveLink('live')
    }
  }, [currentPromoteStep]);

  return (
    <>
      {currentPromoteStep === 1 && (
        <>
          <Col className='modal-window__left' xs={12} md={9} lg={4}>
            <SetupAStory currentTab={currentTab} prevPromoteSteps={prevPromoteSteps} setActiveLink={setActiveLink} />
          </Col>
          <Col className=' offset-md-3 offset-lg-0 phoneSetup' xs={12} md={9} lg={6}>
            {/* <PhoneSetupAStory /> */}
            <PhonePanel currentTab={currentTab} img={phonePanel} nextSteps={nextPromoteSteps} title={'Template Editor'} />
          </Col>
        </>
      )}
      {currentPromoteStep === 2 && (
        <>
          <Col md={9} lg={3}>
            <SocialImg marTop={marTop} currentTab={currentTab} prevSteps={prevPromoteSteps} isButton={true} gallery={img}>
              <h3 className='covid__template-title'>Select a Product or collection</h3>
              <div className='promote-product__wrapper-btn'>
                <Button
                  className='promote-product__btn'
                  active={activeSocialNetwork === 'instagram'}
                  outline color='dark'
                  onClick={() => setNetwork('instagram')}
                >
                  <i className="fa fa-instagram icons" />
                Instagram
              </Button>
                <Button
                  className='promote-product__btn'
                  outline
                  color='dark'
                  active={activeSocialNetwork === 'shopify'}
                  onClick={() => setNetwork('shopify')}
                >
                  <FontAwesomeIcon icon={faShopify} className="icons" />
                Shopify
              </Button>
              </div>
            </SocialImg>
          </Col>
          <Col>
            <PhonePanel currentTab={currentTab} img={storyPreview} nextSteps={nextPromoteSteps} title={'Story Preview'} />
          </Col>
        </>
      )}
    </>
  )
}

export default PromoteProduct