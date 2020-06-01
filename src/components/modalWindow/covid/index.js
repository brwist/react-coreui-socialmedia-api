import React from 'react';
import { Col } from 'reactstrap'

import PhonePanel from '../../phonePanel/index'
import './index.scss';

const Covid = props => {
  return (
    <>
      <Col lg={4}>
        <p>test</p>
      </Col>
      <Col lg={6}>
        <PhonePanel title={'Template Editor'} />
      </Col>
    </>
  )
}

export default Covid;