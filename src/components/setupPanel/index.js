import React, { useState } from 'react'
import { Col, Row, Button, Form, FormGroup, Label, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShopify } from "@fortawesome/free-brands-svg-icons"

import './index.scss';

const Panel = () => {
  const [connectLink, setConnectLink] = useState('');

  return (
    <div className='panelSetup'>

      <Form>
        <Row>
          <Col className="d-flex justify-content-center" col={2}>
            <Label className="panelSetup__accountSetup"><span>Account Setup</span></Label>
          </Col>
        </Row>
        <FormGroup className="form2">

          <h2>Media Connectors</h2>

          <Button active={connectLink === 'Instagram'} outline block color='dark' className="buttons-three" onClick={() => setConnectLink('Instagram')}>
            <span><i className="fa fa-instagram icons-three" />
              {connectLink === 'Instagram' ? 'Connected' : 'Instagram Connect'}
            </span>
          </Button>
          <Button active={connectLink === 'Google'} outline block color='dark' className="buttons-three" onClick={() => setConnectLink('Google')}>
            <span><i className="fab fa-google-drive icons-three"></i>
              {connectLink === 'Google' ? 'Connected' : 'Google Drive Connect'}
            </span>
          </Button>

          <Button active={connectLink === 'Shopify'} block outline color='dark' className="buttons-three" onClick={() => setConnectLink('Shopify')}>
            <span><FontAwesomeIcon icon={faShopify} className="icons-three" /> </span>
            <span>{connectLink === 'Shopify' ? 'Connected' : 'Shopify Connect'}</span>
          </Button>

        </FormGroup>
      </Form>
    </div>
  )
}

export default Panel