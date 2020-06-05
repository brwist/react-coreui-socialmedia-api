import React, { useState, useEffect } from 'react';
import { Button, Col } from 'reactstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faDumpster, faEye, faArrowRight } from '@fortawesome/free-solid-svg-icons';

import './index.scss';
import data from '../../config/stories'

const EditorLightbox = (props) => {
  const [activeItem, setActiveItem] = useState(null);
  const [activeClothes, setActiveClothes] = useState('')
  const [filterData, setFilterData] = useState([])

  useEffect(() => {
    if (activeItem) {
      const filteredData = data.filter(item => item.title === activeItem);
      return setFilterData(filteredData[0].children)
    }
  }, [activeItem])

  const disableClick = () => {
    setActiveItem(null);
    setActiveClothes('');
    setFilterData([]);
  }

  const backArrowBox = () => setActiveClothes('');

  const backArrowClose = () => setActiveItem(null);

  return (
    <div className="light-box" color="white" fluid>
      {activeItem === null && (
        <div className='box-wrapper'>
          {data.map(item => (
            <div class="dropdown">
              <div class="dropbtn">
                <div className="block-circle">
                  <div className="little-block-circle">
                  </div>
                </div>
                <span>{item.title}</span>
                <i class="fas fa-chevron-right" onClick={() => setActiveItem(item.title)}></i>
              </div>
            </div>
          ))}
        </div>
      )}
      {filterData && activeItem !== null && !activeClothes && (
        <div className='box-wrapper'>
          <div class="dropdown">
            <div class="dropbtn-active">
              <i class="fas fa-chevron-left" onClick={backArrowClose} ></i>
              <span>{activeItem}</span>
              <i class="fas fa-pen"></i>
            </div>
          </div>
          {filterData.map(item => (
            <div class="dropdown">
              <div class="dropbtn">
                <div className="block-circle">
                  <div className="little-block-circle">
                  </div>
                </div>
                <span>{item.title}</span>
                <i class="fas fa-chevron-right" onClick={() => setActiveClothes(item.title)}></i>
              </div>
            </div>
          ))}
        </div>
      )}
      {activeClothes && (
        <Col>
          <div className='box'>
            <div className='box__title-block'>
              <i class="fas fa-chevron-left" onClick={backArrowBox} ></i>
              <h3 className='box__title'>{activeClothes}</h3>
            </div>
            <div className='box__wrapper-buttons'>
              <div className='box__block-up-buttons'>
                <Button className='box__up-buttons' outline color='dark'>Title</Button>
                <Button className='box__up-buttons' outline color='dark'>Image Preview</Button>
                <Button className='box__up-buttons' outline color='dark'>Update Preview</Button>
              </div>
              <div className='box__block-down-buttons'>
                <Button onClick={disableClick} className='box__down-buttons' color='secondary'>Disable</Button>
                <Button className='box__down-buttons' color='warning'>Update</Button>
              </div>
            </div>
          </div>
        </Col>
      )}
    </div >
  );
}

export default EditorLightbox