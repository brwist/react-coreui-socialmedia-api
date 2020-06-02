import React, { useState, useEffect } from 'react'
import { Button, Col, Modal, Row, Container } from 'reactstrap';

import Navigation from './navigation/index'
import Preview from '../preview/index'
import SetupProfile from './setupProfile/index'
import Covid from './covid/index'
import './index.scss';

const ModalWindow = props => {
  const [activeLink, setActiveLink] = useState(props.activeLink);
  const [currentCovidStep, setCurrentCovidSteps] = useState(1);

  const prevCovidSteps = () => setCurrentCovidSteps(prev => prev - 1);
  const nextCovidSteps = () => setCurrentCovidSteps(prev => prev + 1);

  return (
    <Container fluid>
      <Row>
        <Col xs={11}>
          <Modal isOpen={props.isOpen} toggle={props.handleChangeOpen}>
            <Row className='modal-window__main-row'>
              <Col className='navigation-wrapper' xs={12} md={3} lg={2}>
                <Navigation activeLink={activeLink} setActiveLink={name => setActiveLink(name)} />
              </Col>
              {props.story === 'COVID Message' && activeLink === 'story' && (
                <Covid
                  setActiveLink={setActiveLink}
                  currentCovidStep={currentCovidStep}
                  setCurrentCovidSteps={setCurrentCovidSteps}
                  prevCovidSteps={prevCovidSteps}
                  nextCovidSteps={nextCovidSteps}
                />
              )}
              {activeLink === 'brand' && (
                <>
                  <Col className='modal-window__left' xs={12} md={9} lg={5}>
                    <SetupProfile nextCovidSteps={nextCovidSteps} setActiveLink={name => setActiveLink(name)} />
                  </Col>
                  <Col className='modal-window__right offset-md-3 offset-lg-0' xs={12} md={9} lg={5}>
                    <Preview />
                  </Col>
                </>
              )
              }
              {activeLink === 'live' && (
                <Col className='push-live' md={9} lg={10}>
                  <h3 className='push-live__title'>Panel Preview</h3>
                  <div className='push-live__page-wrapper'>
                    <Button
                      color='secondary'
                      onClick={() => {
                        prevCovidSteps()
                        return setActiveLink('story')
                      }}
                      className='push-live__btn'
                    >
                      Back
                    </Button>
                    <img className='push-live__img' alt='phone' src={require('../../assets/phone_panel.png')} />
                    <Button color='warning' className='push-live__btn'>Push Live</Button>
                  </div>
                  <div className='push-live__page-wrapper-small'>
                    <img className='push-live__img' alt='phone' src={require('../../assets/phone_panel.png')} />
                    <div>
                      <Button
                        color='secondary'
                        onClick={() => {
                          prevCovidSteps()
                          return setActiveLink('story')
                        }}
                        className='push-live__btn'
                      >
                        Back
                    </Button>
                      <Button color='warning' className='push-live__btn'>Push Live</Button>
                    </div>
                  </div>
                </Col>
              )}
            </Row>
          </Modal>
        </Col>
      </Row>
    </Container >
  )
}

export default ModalWindow