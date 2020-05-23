import React from 'react';
import { Col, Row, Button } from 'reactstrap';

import './index.scss';

const img = ['../../assets/man.png', '../../assets/man.png', '../../assets/man.png',
  '../../assets/man.png', '../../assets/man.png', '../../assets/man.png',
  '../../assets/man.png', '../../assets/man.png', '../../assets/man.png',
  '../../assets/man.png', '../../assets/man.png', '../../assets/man.png',
  '../../assets/man.png']

const SocialImg = props => (
  <div className='social-side'>
    {props.children}
    <Row className='social-side__img-wrapper'>
      {img.map(i => (
        <Col className=' d-flex justify-content-center' col={3}>
          <img className='social-side__img' src={require('../../assets/man.png')} alt='img' />
        </Col>
      ))}
    </Row>
  </div>
)

export default SocialImg