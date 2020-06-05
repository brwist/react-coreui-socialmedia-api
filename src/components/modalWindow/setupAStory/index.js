import React from 'react'
import { Button, Col, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShopify } from "@fortawesome/free-brands-svg-icons"

import './index.scss';

const SetupAStory = props => {
  return (
    <>
      <Row style={{ width: '100%' }}>
        <Col style={{ padding: 0, marginLeft: '50px' }}>
          <div className='setup-story'>
            <div className='setup-story__block'>
              <h3 className='setup-story__title'>Connect Shopify & IG</h3>
              <h6>Marketing Message</h6>
              <div className='setup-story__buttons-block'>
                <Col style={{ padding: '0' }} xs={12}>
                  <Button block className="btnSetupAStory">
                    <i className="fa fa-instagram icons" />
                     Instagram Connect
                  </Button>
                  <Button block className="btnSetupAStory">
                    <FontAwesomeIcon icon={faShopify} className="icons" />
                    Shopify Connect
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
    </>
  )
}

export default SetupAStory;