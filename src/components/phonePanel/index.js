import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as far from "@fortawesome/free-regular-svg-icons";
import { Button } from 'reactstrap'

import './index.scss'

library.add(far.faCaretSquareDown, far.faCaretSquareUp, far.faPlusSquare, far.faCopy);

const PhonePanel = props => {
  return (
    <div style={{height: '100%', display: 'flex', justifyContent: 'center'}} className='story-right'>
      <div className='story-right'>
        <h3 className='story-right__title'>{props.title}</h3>
        <div className='story-right__wrapper'>
          <div className='story-right__img-nav-block'>
            <img className='story-right__img' alt="phone" src={props.img} />
            <div className='story-right__nav-wrapper'>
              <FontAwesomeIcon icon={far.faPlusSquare} />
              <FontAwesomeIcon icon={far.faCaretSquareUp} />
              <FontAwesomeIcon icon={far.faCaretSquareDown} />
            </div>
          </div>
          <div className='story-right__additional'>
            <div className='story-right__additional-icons'>
              <FontAwesomeIcon icon={far.faCopy} />
              <i className="fa fa-trash-o" />
            </div>
            <div className='story-right__buttons-wrapper'>
              <Button className='story-right__back' onClick={() => props.prevSteps(props.currentTab)} variant='secondary'>Back</Button>
              <Button onClick={() => props.nextSteps(props.currentTab)} disabled={props.disableNext} color='warning'>Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhonePanel