import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem,  Button, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faDumpster, faEye} from '@fortawesome/free-solid-svg-icons';

import './index.scss';

const EditorLightbox = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <div className="light-box" color="white" fluid>
    <Dropdown isOpen={dropdownOpen} toggle={toggle} >
      <Label className="stories">Live lightbox stories</Label>
      <DropdownToggle caret className="drops" color="white">
          <FontAwesomeIcon icon = {faArrowLeft} className="icons"/>
           <span>Brand Stories</span>
           <Button color="success" className="btn1"><p>Active</p></Button>{' '}
           <Button color="danger" className="btn1"><p><FontAwesomeIcon icon = {faDumpster}></FontAwesomeIcon></p></Button>{' '}
           <Button color="warning" className="btn1"><p>+200 <FontAwesomeIcon icon = {faEye}></FontAwesomeIcon> </p></Button>{' '}
        </DropdownToggle>

        <DropdownToggle caret className="drops" color="white">
          <FontAwesomeIcon icon = {faArrowLeft} className="icons"/>
           <span>Best Sellers</span>
           
        </DropdownToggle>

        <DropdownToggle caret className="drops" color="white">
          <FontAwesomeIcon icon = {faArrowLeft} className="icons"/>
           <span>New Arrivals</span>
          
        </DropdownToggle>

        <DropdownToggle caret className="drops" color="white">
          <FontAwesomeIcon icon = {faArrowLeft} className="icons"/>
           <span>Find your Fit</span>
          
        </DropdownToggle>

        <DropdownToggle caret className="drops" color="white">
          <FontAwesomeIcon icon = {faArrowLeft} className="icons"/>
           <span>Seasonal Looks</span>
          
        </DropdownToggle>
        
      <DropdownMenu>
      <DropdownItem className="dropItem">
        <DropdownToggle caret  color="white" className="dropsIt">
          <FontAwesomeIcon icon = {faArrowLeft} className="light-box__icon"/>
           <span>Brand Stories</span>
           
        </DropdownToggle>
      </DropdownItem>
      <DropdownItem className="dropItem">
        <DropdownToggle caret  color="white" className="dropsIt">
          <FontAwesomeIcon icon = {faArrowLeft} className="light-box__icon"/>
           <span>Brand Stories</span>
           
        </DropdownToggle>
      </DropdownItem>  
         
      
        {/* <DropdownToggle caret className="drops dropItem" color="white">
          <FontAwesomeIcon icon = {faArrowLeft} className="light-box__icon"/>
           <span>Brand Stories</span>
           <Button color="success" className="btn1"><p>Active</p></Button>{' '}
           <Button color="danger" className="btn1"><p><FontAwesomeIcon icon = {faDumpster}></FontAwesomeIcon></p></Button>{' '}
           <Button color="warning" className="btn1"><p>+200 <FontAwesomeIcon icon = {faEye}></FontAwesomeIcon> </p></Button>{' '}
       

        </DropdownToggle> */}
        
      </DropdownMenu>
    </Dropdown>
    </div>
  );
}

export default EditorLightbox