import React, {useState} from 'react'
import { Col, Row } from 'reactstrap';

import './index.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as far from "@fortawesome/free-regular-svg-icons";


const Panel = (props) => {
  const [currentPreview, setPreview] = useState(0)

  const handleUp = (e) => {
    setPreview(currentPreview !== 0 ? currentPreview-1 : 0)
  }

  const handleDown = (e) => {
    const lastIndex = props.previewImage.length-1
    setPreview(currentPreview !== lastIndex ? currentPreview+1 : lastIndex)
  }

  const mediaIsArray = Array.isArray(props.previewImage)
  const currentMedia = mediaIsArray ? props.previewImage[currentPreview] : props.previewImage
  const videoLink = currentMedia.indexOf('.mp4') !== -1

  return <div className='panelEditor'>
    <Row>
      <Col className='panelEditor__bg-img' col={12}>
        <Col className="d-flex justify-content-center" col={6}>
          <div style={{ marginRight: '50px' }}>
            <FontAwesomeIcon onClick={handleUp} className='panelEditor__icon' icon={far.faCaretSquareUp} />
            <FontAwesomeIcon onClick={handleDown} className='panelEditor__icon' icon={far.faCaretSquareDown} />
          </div>
        </Col>
        <Col className="d-flex justify-content-center" col={6}>
          <div className="image-holder">
              <img className='panelEditor__phone-img' alt="phone" src={require('../../assets/panel.png')} />
              { currentMedia && (!videoLink
                ? <img className='image-preview' src={currentMedia} alt='phone'/>
                : <video className='image-preview' autoplay>
                  <source src={currentMedia} type="video/mp4" />
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