import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Col, Container, Row } from 'reactstrap';

import './index.scss';

const EditorLightbox = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(prevState => !prevState);

  return (
    <div className="light-box">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} >
      <DropdownToggle caret className="drops">
        Dropdown
        </DropdownToggle>
      <DropdownMenu>
      <DropdownToggle caret>
        Dropdown
        </DropdownToggle>
        <DropdownItem>Some Action</DropdownItem>
        <DropdownItem disabled>Action (disabled)</DropdownItem>
        <DropdownItem divider />
        <DropdownItem>Foo Action</DropdownItem>
        <DropdownItem>Bar Action</DropdownItem>
        <DropdownItem>Quo Action</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    </div>
  );
}

export default EditorLightbox