import React from 'react'
import { Col, Row } from 'reactstrap';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as far from "@fortawesome/free-regular-svg-icons";

import './index.scss';

library.add(far.faCaretSquareDown, far.faCaretSquareUp, far.faPlusSquare, far.faCopy);

const Panel = () => (
  <div className='panelEditor'>
    <Row>
      <Col className='panelEditor__bg-img' col={12}>
        <Col className="d-flex justify-content-center" col={6}>
          <div style={{ marginRight: '50px' }}>
            <FontAwesomeIcon style={{ marginRight: '20px' }} className='panelEditor__icon' icon={far.faPlusSquare} />
            <FontAwesomeIcon className='panelEditor__icon' icon={far.faCaretSquareUp} />
            <FontAwesomeIcon className='panelEditor__icon' icon={far.faCaretSquareDown} />
          </div>
          <FontAwesomeIcon className='panelEditor__icon' icon={far.faCopy} />
          <i className="fa fa-trash-o panelEditor__icon" />
        </Col>
        <Col className="d-flex justify-content-center" col={6}>
          <img className='panelEditor__phone-img' alt='panelEditor' src={require('../../assets/panel.png')} />
        </Col>
      </Col>
    </Row>
  </div>
)

export default Panel