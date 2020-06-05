import React from 'react'
import { Col, Row, Button, Form, FormGroup, Label, } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShopify } from "@fortawesome/free-brands-svg-icons"

import './index.scss';

const Panel = () => (
  <div className='panelSetup'>

    <Form>
      <Row>
        <Col className="d-flex justify-content-center" col={2}>
          <Label className="panelSetup__accountSetup"><span>Account Setup</span></Label>
        </Col>
      </Row>
      <FormGroup className="form2">

        <h2>Media Connectors</h2>

        <Button block className="buttons-three">
          <span><i className="fa fa-instagram icons-three" />
              Instagram Connect
              </span>
        </Button>
        <Button block className="buttons-three">
          <span><i className="fab fa-google-drive icons-three"></i>
               Google Drive Connect
               </span>
        </Button>

        <Button block className="buttons-three">
          <span><FontAwesomeIcon icon={faShopify} className="icons-three" /> </span>
          <span>Shopify Connect</span>
        </Button>

      </FormGroup>
    </Form>
  </div>
)

export default Panel