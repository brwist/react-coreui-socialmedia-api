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
        {gallery && gallery.map((i, index) => {
          const videoLink = i.indexOf('.mp4') !== -1

          return <Col key={index} className='d-flex social-side__img-block' col={3}>
            <div onClick={handleClick(i)} className={'social-side__img ' + (activeMedia === i && 'selected')}>
          { !videoLink
            ? <img src={i} alt='img'/>
            : <video width="320" height="240">
              <source src={i} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
          }
          </div>
          </Col>
        })}
      </Row>
    </div>
  )
}

export default SocialImg