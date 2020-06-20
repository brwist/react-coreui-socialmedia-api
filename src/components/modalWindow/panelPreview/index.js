import React from 'react'
import { Col, Button } from 'reactstrap'

import './index.scss';

const PanelPreview = props => {
  return (
    <Col className='push-live' xs={12} md={10} lg={10}>
      <h3 className='push-live__title'>Panel Preview</h3>
      <div className='push-live__page-wrapper'>
        <Button
          color='secondary'
          onClick={() => {
            props.prevSteps(props.currentTab)
            return props.setActiveLink('story')
          }}
          className='push-live__btn'
        >
          Back
        </Button>
        <div className="image-holder">
          <img className='story-right__img' alt="phone" src={props.img} />
          {props.previewImage && <img className='image-preview' alt="phone" src={props.previewImage} />}
        </div>
        <Button color='warning'  onClick={props.closeModal} className='push-live__btn'>Push Live</Button>
      </div>
      <div className='push-live__page-wrapper-small'>
        <img className='push-live__img' alt='phone' src={props.img} />
        <div>
          <Button
            color='secondary'
            onClick={() => {
              props.prevSteps(props.currentTab)
              return props.setActiveLink('story')
            }}
            className='push-live__btn'
          >
            Back
          </Button>
          <Button color='warning' onClick={props.closeModal} className='push-live__btn'>Push Live</Button>
        </div>
      </div>
    </Col>
  )
}

export default PanelPreview