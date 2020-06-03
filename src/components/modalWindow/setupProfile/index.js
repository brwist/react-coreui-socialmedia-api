import React from 'react'
import { Button, Col, Row, FormGroup, Label, Input } from 'reactstrap';
import TimezonePicker from 'react-bootstrap-timezone-picker';

import './index.scss';

const SetupProfile = props => {
  return (
    <Row>
      <Col>
        <div className='setup-profile'>
          <div className='setup-profile__block'>
            <h3 className='setup-profile__title'>Setup your profile & branding</h3>
            <form className='setup-profile__form'>
              <Col xs={12}>
                <FormGroup className='setup-profile__form-group'>
                  <Label className='setup-profile__label' htmlFor="file">Upload brand Logo</Label>
                  <Input className='setup-profile__file' type="file" id="file" name="file-input" />
                </FormGroup>
                <FormGroup className='setup-profile__form-group'>
                  <Label className='setup-profile__label' htmlFor="name">Brand name</Label>
                  <Input placeholder='Enter your brand name' className='setup-profile__input' type="text" id="name" />
                </FormGroup>
                <FormGroup className='setup-profile__form-group'>
                  <Label className='setup-profile__label' htmlFor="inst">Selected Time Zone</Label>
                  <TimezonePicker
                    absolute={false}
                    defaultValue="Europe/Moscow"
                    placeholder="Select timezone..."
                  //   onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup className='setup-profile__form-group'>
                  <Label className='setup-profile__label' htmlFor="inst">Instagram URL</Label>
                  <Input placeholder='https://www.instagram.com/example/' className='setup-profile__input' type="text" id="inst" />
                </FormGroup>
              </Col>
            </form>
          </div>
          <Button
            onClick={() => {
              props.nextSteps(props.currentTab)
              props.setActiveLink('story')
              return;
            }}
            block
            color="warning"
            className='setup-profile__button'
          >Next</Button>
        </div>
      </Col>
    </Row>
  )
}

export default SetupProfile