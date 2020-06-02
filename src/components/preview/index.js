import React from 'react'

import './index.scss';

const Preview = props => (
  <div>
    <h3>Panel Preview</h3>
    <img className='panel-preview__img' src={require('../../assets/phone.png')} alt='phone' />
  </div>
)

export default Preview