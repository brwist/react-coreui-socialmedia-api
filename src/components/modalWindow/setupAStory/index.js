import React, { useState } from 'react'
import { Button, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShopify } from "@fortawesome/free-brands-svg-icons"

import './index.scss';

const SetupAStory = props => {
  const [activeConnect, setActiveConnect] = useState('');

  return (
    <Row className='setup-story-wrapper'>
      <Col className='setup-story-block'>
        <div className='setup-story'>
          <div className='setup-story__block'>
            <h3 className='setup-story__title'>Connect Shopify & IG</h3>
            <h6>Marketing Message</h6>
            <div className='setup-story__buttons-block'>
              <Col style={{ padding: '0' }} xs={12}>
                <Button active={activeConnect === 'Instagram'} onClick={() => setActiveConnect('Instagram')} color='dark' outline block className="btnSetupAStory">
                  <i className="fa fa-instagram icons" />
                  {activeConnect === 'Instagram' ? 'Connected' : 'Instagram Connect'}
                </Button>
                <Button active={activeConnect === 'Shopify'} onClick={() => setActiveConnect('Shopify')} color='dark' outline block className="btnSetupAStory">
                  <FontAwesomeIcon icon={faShopify} className="icons" />
                  {activeConnect === 'Shopify' ? 'Connected' : ' Shopify Connect'}
                </Button>
              </Col>
            </div>
          </div>
          <Button
            variant='secondary'
            onClick={() => props.prevPromoteSteps(props.currentTab)}
            block
            className='setup-story__btn'
          >
            Back
            </Button>
        </div>
      </Col>
    </Row>
  )
}

export default SetupAStory;