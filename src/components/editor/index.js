import React from 'react'
import { Col, Row } from 'reactstrap';

import './index.scss';


const Panel = (props) => {
  const videoLink = props.previewImage.indexOf('.mp4') !== -1

  return <div className='panelEditor'>
    <Row>
      <Col className='panelEditor__bg-img' col={12}>
        <Col className="d-flex justify-content-center" col={6}>
          <div className="image-holder">
              <img className='panelEditor__phone-img' alt="phone" src={require('../../assets/panel.png')} />
              { props.previewImage && (!videoLink
                ? <img className='image-preview' src={props.previewImage} alt='phone'/>
                : <video className='image-preview' autoplay>
                  <source src={props.previewImage} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
              )}
            </div>
        </Col>
      </Col>
    </Row>
  </div>
}

export default Panel