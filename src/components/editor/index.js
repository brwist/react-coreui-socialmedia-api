import React from 'react'
import { Col, Row, Button, Label } from 'reactstrap';

import './index.scss';

const Panel = () => (
  <div className='panelEditor'>
    <Row>
      <Col className="d-flex justify-content-left" col={2}>
        <Label block className="panelEditor__my-lightbox">My lightbox</Label>
      </Col>
    </Row>
    <Row>
      <Col className='panelEditor__bg-img' col={12}>
        <Col className="d-flex justify-content-center" col={6}>
          <i className="fa fa-plus-square-o panelEditor__icon" />
          <i className="fa fa-arrow-circle-up panelEditor__icon" />
          <i className="fa fa-arrow-circle-down panelEditor__icon" />
          <i style={{ marginLeft: '30px' }} className="fa fa-bars panelEditor__icon" />
          <i className="fa fa-trash-o panelEditor__icon" />
        </Col>
        <Col className="d-flex justify-content-center" col={6}>
          <img alt='panelEditor' src={require('../../assets/panel.png')} />
        </Col>
      </Col>
    </Row>
  </div>
)

export default Panel