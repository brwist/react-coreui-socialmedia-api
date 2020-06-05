import React from 'react';
import {  Button, Form, FormGroup, Label, Input } from 'reactstrap';

import './index.scss';

const Overview = props => {

  return (
    <div className='overview'>
      <h2>Account overview</h2>
      <Form>
        <FormGroup>
          Upload Brand Logo

          <Input type="file" name="" id="" />

        </FormGroup>

        <FormGroup>
          <Label for="exampleAddress2">Brand Name</Label>
          <Input type="text" name="address2" id="exampleAddress2" placeholder="Enter your brand name" />
        </FormGroup>

        <FormGroup>
          <Input type="select" name="select" id="exampleSelect">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </FormGroup>


        <FormGroup>
          <Label for="exampleEmail">Reset Password</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="Enter your email address" />
        </FormGroup>

        <Button className="btn_overview">Save</Button>
      </Form>
    </div>
  );
}

export default Overview