import React from 'react'

import './index.scss';

const Preview = props => (
  <div className='panel-preview__block'>
    <h3 className='panel-preview__title'>Panel Preview</h3>
    <img className='panel-preview__img' src={require('../../assets/phone.png')} alt='phone' />
  </div>
)

export default Preview