import React from 'react'
import { Col, Button, Spinner } from 'reactstrap'

import './index.scss';

const PanelPreview = props => {
  const {
    handlePreviewStep,
    nextStep,
    lastSubmitted,
    closeModal,
    stepIsSubmitting,
    isLastStep
  } =props
  const videoLink = props.previewImage.indexOf('.mp4') !== -1

  if (lastSubmitted) {
  }

  return (
    <Col className='push-live' xs={12} md={10} lg={10}>
      {!stepIsSubmitting && <h3 className='push-live__title'>{!lastSubmitted ? 'Panel Preview' : 'Done!'}</h3>}
      <div className='push-live__page-wrapper'>
        {!lastSubmitted ? <Button
          color='secondary'
          onClick={() => {
            handlePreviewStep()
          }}
          className='push-live__btn'
        >
          Back
        </Button> : <div />}
        {stepIsSubmitting
          ? <Spinner className='setup__spinner' color="dark" />
          :<div className="image-holder">
          {!lastSubmitted && <div>
              <img className='story-right__img' alt="phone" src={props.img} />
              { props.previewImage && (!videoLink
                ? <img className='image-preview' src={props.previewImage} alt='phone'/>
                : <video className='image-preview' autoplay>
                  <source src={props.previewImage} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
              )}
              </div>
            }

          </div>
        }

        <Button color='warning'  onClick={!lastSubmitted ? nextStep : closeModal} className='push-live__btn'>{lastSubmitted ? 'Close' : isLastStep ? 'Push Live' : 'Next'}</Button>
      </div>
      <div className='push-live__page-wrapper-small'>
        <img className='push-live__img' alt='phone' src={props.img} />
        <div>
          <Button
            color='secondary'
            onClick={handlePreviewStep}
            className='push-live__btn'
          >
            Back
          </Button>
          <Button color='warning' onClick={!lastSubmitted ? nextStep : closeModal} className='push-live__btn'>{isLastStep ? 'Push Live' : 'Next'}</Button>
        </div>
      </div>
    </Col>
  )
}

export default PanelPreview