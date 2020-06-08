import React, { useState, useEffect } from 'react';
import { Button, Col } from 'reactstrap';

import './index.scss';
import data from '../../config/stories'

const EditorLightbox = (props) => {
  const [activeItem, setActiveItem] = useState('');
  const [filterItem, setFilterItem] = useState([]);

  useEffect(() => {
    if (activeItem) {
      const filteredData = data.filter(item => item.title === activeItem);
      console.log(filteredData)
      return setFilterItem(filteredData[0].children)
    }
  }, [activeItem]);

  const [activeClothes, setActiveClothes] = useState('');
  const [filterClothes, setFilterClothes] = useState([]);

  useEffect(() => {
    if (activeClothes) {
      const filteredData = filterItem.filter(item => item.title === activeClothes);
      setFilterClothes(filteredData[0].colors);
    }
  }, [activeClothes, filterItem]);

  const [activeColor, setActiveColor] = useState('');
  const [filterColor, setFilterColor] = useState([]);
  const [activeSubColor, setActiveSubColor] = useState('');

  useEffect(() => {
    if (activeColor) {
      const filterData = filterClothes.filter(item => item.title === activeColor);
      setFilterColor(filterData[0].children);
    }
  }, [activeColor, filterClothes])

  const disableClick = () => {
    setActiveItem('');
    setActiveClothes('');
    setFilterItem([]);
    setFilterClothes([]);
    setActiveColor('');
    setFilterColor([]);
    setActiveSubColor('');
  };

  const backArrowBox = () => {
    setActiveClothes('');
    setFilterClothes([]);
  };

  const backArrowClose = () => {
    setActiveItem('');
    setFilterItem([]);
  };

  const backArrowColor = () => {
    setActiveColor('');
    setFilterColor([]);
  };

  const backArrowSubColor = () => {
    setActiveSubColor('');
    setActiveColor('');
    setFilterColor([]);
  };

  return (
    <div className="light-box" color="white" fluid>
      <h3 className='light-box__title'>Live lightbox stories</h3>
      {activeItem === '' && (
        <div className='box-wrapper'>
          {data.map(item => (
            <div key={item.title} class="dropdown">
              <div class="dropbtn">
                <div className="block-circle">
                  <img src={item.icon} alt='icon' />
                </div>
                <span>{item.title}</span>
                <i class="fas fa-chevron-right" onClick={() => setActiveItem(item.title)}></i>
              </div>
            </div>
          ))}
        </div>
      )}
      {filterItem && activeItem !== '' && !activeClothes && (
        <div className='box-wrapper'>
          <div class="dropdown">
            <div class="dropbtn-active">
              <i class="fas fa-chevron-left" onClick={backArrowClose} ></i>
              <span>{activeItem}</span>
              <i class="fas fa-pen"></i>
            </div>
          </div>
          {filterItem.map(item => (
            <div key={item.title} class="dropdown">
              <div class="dropbtn">
                <img src={item.icon} alt='icon' />
                <span>{item.title}</span>
                <i class="fas fa-chevron-right" onClick={() => setActiveClothes(item.title)}></i>
              </div>
            </div>
          ))}
        </div>
      )
      }
      {
        activeClothes === 'All Day Suiting' && (
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
        )
      }
      {
        activeClothes && activeClothes !== 'All Day Suiting' && activeColor === '' && activeSubColor === '' && (
          <div className='box-wrapper'>
            <div class="dropdown">
              <div class="dropbtn-active">
                <i class="fas fa-chevron-left" onClick={backArrowBox} ></i>
                <span>{activeClothes}</span>
                <i class="fas fa-pen"></i>
              </div>
            </div>
            {filterClothes.map(item => (
              <div key={item.title} class="dropdown">
                <div class="dropbtn">
                  <div className="block-circle" style={{ backgroundColor: item.color }}></div>
                  <span>{item.title}</span>
                  <i class="fas fa-chevron-right" onClick={() => setActiveColor(item.title)}></i>
                </div>
              </div>
            ))}
          </div>
        )
      }
      {
        activeColor && activeColor === 'Blue' && (
          <div className='box-wrapper'>
            <div class="dropdown">
              <div class="dropbtn-active">
                <i class="fas fa-chevron-left" onClick={backArrowColor} ></i>
                <span>{activeColor}</span>
                <i class="fas fa-pen"></i>
              </div>
            </div>
            {filterColor.map(item => (
              <div key={item.title} class="dropdown">
                <div class="dropbtn">
                  <div className="block-circle" style={{ backgroundColor: item.color }}></div>
                  <span>{item.title}</span>
                  <i class="fas fa-chevron-right" onClick={() => {
                    setActiveSubColor(item.title);
                    setActiveColor('');
                  }}></i>
                </div>
              </div>
            ))}
          </div>
        )
      }
      {
        (activeColor || activeSubColor) && activeColor !== 'Blue' && (
          <Col>
            <div className='box'>
              <div className='box__title-block'>
                <i class="fas fa-chevron-left" onClick={backArrowSubColor} ></i>
                <h3 className='box__title'>{activeSubColor || activeColor}</h3>
              </div>
              <div className='box__wrapper-buttons'>
                <div className='box__block-up-buttons'>
                  <Button className='box__up-buttons' outline color='dark'>Title</Button>
                  <Button className='box__up-buttons' outline color='dark'>Image Preview</Button>
                  <Button className='box__up-buttons' outline color='dark'>Upload New Media</Button>
                </div>
                <div className='box__block-down-buttons'>
                  <Button onClick={disableClick} className='box__down-buttons' color='secondary'>Disable</Button>
                  <Button className='box__down-buttons' color='warning'>Update</Button>
                </div>
              </div>
            </div>
          </Col>
        )
      }
    </div >
  );
}

export default EditorLightbox