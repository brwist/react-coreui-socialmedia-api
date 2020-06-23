import React from 'react';
import { Col, Row } from 'reactstrap';

import './index.scss';


const SocialImg = props => {
  const {
    gallery,
    handleClick
  } = props

  return (
    <div className='social-side'>
      <Row>
        <Col col={9}>
          {props.children}
        </Col>
      </Row>
      <Row className='social-side__img-wrapper'>
        {gallery.map((i, index) => (
          <Col key={index} className='d-flex social-side__img-block' col={3}>
            <div  className='social-side__img'>
              <img onClick={handleClick(i)} src={i} alt='img' />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default SocialImg