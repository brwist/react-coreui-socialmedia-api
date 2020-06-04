import React from 'react';
import { Col, Row, Button } from 'reactstrap';

import './index.scss';
import man from '../../assets/man.png'

const img = [man, man, man, man, man, man, man, man, man];

const SocialImg = props => {
  const gallery = props.gallery || img;

  return (
    <div className='social-side'>
      {props.children}
      <Row className='social-side__img-wrapper'>
        {gallery.map((i, index) => (
          <Col key={index} className=' d-flex justify-content-center' col={3}>
            <img className='social-side__img' src={i} alt='img' />
          </Col>
        ))}
      </Row>
      {props.isButton && <Button onClick={() => props.prevSteps(props.currentTab)} className='social-side__btn' variant='secondary'>Back</Button>}
    </div>
  )
}

export default SocialImg