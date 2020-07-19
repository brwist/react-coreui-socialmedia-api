import React, {useState} from 'react'
import { Col, Button, Spinner } from 'reactstrap'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as far from "@fortawesome/free-regular-svg-icons";

import './index.scss';

library.add(far.faCaretSquareDown, far.faCaretSquareUp);


const PanelPreview = props => {
  const {
    handlePreviewStep,
    nextStep,
    lastSubmitted,
    closeModal,
    stepIsSubmitting,
    isLastStep
  } =props
  const [currentPreview, setPreview] = useState(0)

  const handleUp = (e) => {
    setPreview(currentPreview !== 0 ? currentPreview-1 : 0)
  }

  const handleDown = (e) => {
    const lastIndex = props.previewImage.length-1
    setPreview(currentPreview !== lastIndex ? currentPreview+1 : lastIndex)
  }

  const mediaIsArray = Array.isArray(props.previewImage)
  const currentMedia = mediaIsArray ? props.previewImage[currentPreview] || '' : props.previewImage
  const videoLink = currentMedia.indexOf('.mp4') !== -1

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
          : <div style={{display: 'flex'}}>
            {!lastSubmitted && <div>
              <div className="image-holder">
                <img className='story-right__img' alt="phone" src={props.img} />
                { currentMedia && (!videoLink
                  ? <img className='image-preview' src={currentMedia} alt='phone'/>
                  : <video className='image-preview' autoplay>
                    <source src={currentMedia} type="video/mp4" />
                      Your browser does not support the video tag.
                  </video>
                )}
              </div>
              <div className='story-right__nav-wrapper'>
                <FontAwesomeIcon onClick={handleUp} icon={far.faCaretSquareUp} />
                <FontAwesomeIcon onClick={handleDown} icon={far.faCaretSquareDown} />
              </div>
            </div>}

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