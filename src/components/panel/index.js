import React from 'react'
import { Col, Row, Button } from 'reactstrap';

import './index.scss';

const Panel = () => (
  <div className='panel'>
    <Row>
      <Col className="d-flex justify-content-end" col={2}>
        <Button block color="warning" className="panel__btn btn-square">Publish Live</Button>
      </Col>
    </Row>
    <Row>
      <Col className='panel__bg-img' col={12}>
        <Col className="d-flex justify-content-center" col={6}>
          <i className="fa fa-plus-square-o panel__icon" />
          <i className="fa fa-arrow-circle-up panel__icon" />
          <i className="fa fa-arrow-circle-down panel__icon" />
          <i style={{ marginLeft: '30px' }} className="fa fa-bars panel__icon" />
          <i className="fa fa-trash-o panel__icon" />
        </Col>
        <Col className="d-flex justify-content-center" col={6}>
          <img alt='panel' src={require('../../assets/panel.png')} />
        </Col>
      </Col>
    </Row>
  </div>
)

export default Panel