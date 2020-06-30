import React from 'react'

import './index.scss';

const Navigation = props => {
  return (
    <div className='panel-navigation'>
      <img className='panel-navigation__logo' src={require('../../../assets/Logo_2.png')} alt='logo' />
      <nav className='panel-navigation__navigation'>
        {props.onBoarding && <p
          className={`panel-navigation__link ${props.activeLink === 'brand' && 'active'}`}
        >
          Branding
          </p>}
        <p
          className={`panel-navigation__link ${props.activeLink === 'story' && 'active'}`}
        >
          Setup a Story
          </p>
        <p
          className={`panel-navigation__link ${props.activeLink === 'live' && 'active'}`}
        >
          Push Live!
          </p>
      </nav>
    </div>
  )
}

export default Navigation