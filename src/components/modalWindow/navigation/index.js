import React from 'react'

import './index.scss';

const Navigation = props => {
  return (
    <div className='panel-navigation'>
      <img className='panel-navigation__logo' src={require('../../../assets/Logo_2.png')} alt='logo' />
      <nav className='panel-navigation__navigation'>
        <p
          className={`panel-navigation__link ${props.activeLink === 'brand' && 'active'}`}
          onClick={() => props.setActiveLink('brand')}
        >
          Branding
          </p>
        <p
          className={`panel-navigation__link ${props.activeLink === 'story' && 'active'}`}
          onClick={() => props.setActiveLink('story')}
        >
          Setup a Story
          </p>
        <p
          className={`panel-navigation__link ${props.activeLink === 'push' && 'active'}`}
          onClick={() => props.setActiveLink('push')}
        >
          Push Live!
          </p>
      </nav>
    </div>
  )
}

export default Navigation