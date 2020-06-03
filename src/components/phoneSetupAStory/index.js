import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as far from "@fortawesome/free-regular-svg-icons";
import { Button } from 'reactstrap'

import './index.scss'

library.add(far.faCaretSquareDown, far.faCaretSquareUp, far.faPlusSquare, far.faCopy);

const PhoneSetupAStory = props => {
  return (
    <div className='storySetup-right'>
      <h3 className='storySetup-right__title'>Story Preview</h3>
      <div className='storySetup-right__wrapper'>
        <img className='storySetup-right__img' alt="phone" src={require('../../assets/phone.png')} />
        <div className='storySetup-right__nav-wrapper'>
          <FontAwesomeIcon icon={far.faPlusSquare} />
          <FontAwesomeIcon icon={far.faCaretSquareUp} />
          <FontAwesomeIcon icon={far.faCaretSquareDown} />
        </div>
        <div className='storySetup-right__additional'>
          <div>
            <FontAwesomeIcon icon={far.faCopy} />
            <i className="fa fa-trash-o" />
          </div>
          <Button color='warning'>Next</Button>
        </div>
      </div>
    </div>
  )
}

export default PhoneSetupAStory