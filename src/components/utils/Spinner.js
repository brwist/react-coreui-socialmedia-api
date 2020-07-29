import React from 'react';


export default function Spinner (props) {
  return <div className="spinner">
    <img src={require('../../assets/loader.gif')} alt="Loading"/>
  </div>
}