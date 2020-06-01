import React from 'react'
import { faPlusSquare, faCaretSquareUp, faCaretSquareDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'reactstrap'

import './index.scss'

const PhonePanel = props => {
  return (
    <div className='story-right'>
      <h3 className='story-right__title'>{props.title}</h3>
      <div className='story-right__wrapper'>
        <img className='story-right__img' alt="phone" src={require('../../assets/phone_panel.png')} />
        <div className='story-right__nav-wrapper'>
          <FontAwesomeIcon icon={faPlusSquare} />
          <FontAwesomeIcon icon={faCaretSquareUp} />
          <FontAwesomeIcon icon={faCaretSquareDown} />
        </div>
        <div className='story-right__additional'>
          <div>
            <i class="fas fa-copy"></i>
            <i className="fa fa-trash-o" />
          </div>
          <Button color='warning'>Next</Button>
        </div>
      </div>
    </div>
  )
}

export default PhonePanel