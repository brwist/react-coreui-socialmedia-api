import React, {useState, useEffect} from 'react'
import { Col, Row } from 'reactstrap';
import { Button } from 'reactstrap'

import './index.scss';


const Panel = (props) => {
  const {
    currentItem
  } =props
  const [currentPreview, setPreview] = useState(currentItem || 0)

  useEffect(() => {
    setPreview(currentItem || 0)
  }, [currentItem, setPreview])

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

  return <div className='panelEditor'>
    <Row>
      <Col className='panelEditor__bg-img' col={12}>
        <Col className="d-flex justify-content-center" col={6}>
          <div className="image-holder">
            <img className='panelEditor__phone-img' alt="phone" src={require('../../assets/panel.png')} />
            { currentMedia && (!videoLink
              ? <img className='image-preview' src={currentMedia} alt='phone'/>
              : <video key={currentMedia} className='image-preview' autoPlay muted loop>
                <source src={currentMedia} type="video/mp4" />
                  Your browser does not support the video tag.
              </video>
            )}
            {currentMedia && <div className="control-arrows">
              <img  onClick={handleUp} src={require('../../assets/arrow_left.gif')} alt=""/>
              <img onClick={handleDown} src={require('../../assets/arrow_right.gif')} alt=""/>
            </div>}
          </div>
        </Col>
        {props.currentTab && <div className='buttons-wrapper'>
          <Button onClick={() => props.nextSteps(props.currentTab)} disabled={props.disableNext} color='warning'>Next</Button>
        </div>}
      </Col>
    </Row>
  </div>
}

export default Panel