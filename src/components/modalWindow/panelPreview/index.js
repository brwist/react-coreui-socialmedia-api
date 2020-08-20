import React, {useState} from 'react'
import { Col, Button } from 'reactstrap'

import Spinner from '../../utils/Spinner';
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
  const [currentPreview, setPreview] = useState(0)

  const handleUp = (e) => {
    const lastIndex = props.previewImage.length-1
    setPreview(currentPreview !== 0 ? currentPreview-1 : lastIndex)
  }

  const handleDown = (e) => {
    const lastIndex = props.previewImage.length-1
    setPreview(currentPreview !== lastIndex ? currentPreview+1 : 0)
  }

  const mediaIsArray = Array.isArray(props.previewImage)
  const currentMedia = mediaIsArray ? props.previewImage[currentPreview] : props.previewImage
  const videoLink = currentMedia && currentMedia.indexOf('.mp4') !== -1


  return (
    <Col className='push-live' xs={12} md={10} lg={10}>
      {!stepIsSubmitting && lastSubmitted && <h3 className='push-live__title'>Complete!</h3>}
      {stepIsSubmitting
        ? <Spinner className='setup__spinner' color="dark" />
        : <div className='push-live__page-wrapper'>
          {!lastSubmitted ? <Button
            color='secondary'
            onClick={() => {
              handlePreviewStep()
            }}
            className='push-live__btn'
          >
            Back
          </Button> : <div />}
          <div style={{display: 'flex'}}>
            {!lastSubmitted && <div>
              <div className="image-holder">
                <img className='panelEditor__phone-img' alt="phone" src={require('../../../assets/panel.png')} />
                { currentMedia && (!videoLink
                  ? <img className='image-preview' src={currentMedia} alt='phone'/>
                  : <video key={currentMedia} className='image-preview' autoPlay muted loop>
                    <source src={currentMedia} type="video/mp4" />
                      Your browser does not support the video tag.
                  </video>
                )}
                {currentMedia && <div className="control-arrows">
                  <img  onClick={handleUp} src={require('../../../assets/arrow_left.gif')} alt=""/>
                  <img onClick={handleDown} src={require('../../../assets/arrow_right.gif')} alt=""/>
                </div>}
              </div>
            </div>}

          </div>
          <Button color='warning'  onClick={!lastSubmitted ? nextStep : closeModal} className='push-live__btn'>{lastSubmitted ? 'Close' : isLastStep ? 'Push Live' : 'Next'}</Button>
        </div>
      }
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