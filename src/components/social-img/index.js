import React from 'react';
import { Col, Row } from 'reactstrap';

import './index.scss';


const SocialImg = props => {
  const {
    gallery,
    activeMedia,
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
            <div onClick={handleClick(i)} className={'social-side__img ' + (activeMedia === i && 'selected')}>
              <img src={i} alt='img' />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default SocialImg