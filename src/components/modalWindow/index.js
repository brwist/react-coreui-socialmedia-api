import React, { useState, useEffect } from 'react'
import { Col, Modal, Row, Container } from 'reactstrap';

import Navigation from './navigation/index'
import Preview from '../preview/index'
import SetupProfile from './setupProfile/index'
import Covid from './covid/index'
import PromoteProduct from './promoteProduct/index'
import PanelPreview from './panelPreview/index'
import './index.scss';
import covPhone from '../../assets/phone_panel.png'
import manPhone from '../../assets/story-preview.png'

const ModalWindow = props => {
  const [activeLink, setActiveLink] = useState(props.activeLink);
  const [currentCovidStep, setCurrentCovidSteps] = useState(1);
  const [currentPromoteStep, setCurrentPromoteStep] = useState(1);

  useEffect(() => {
    if (!props.isOpen) {
      setCurrentCovidSteps(1);
      setCurrentPromoteStep(1);
      setActiveLink('story');
    }
  }, [props.isOpen])

  const prevSteps = link => {
    if (!link) {
      return
    }

    switch (link) {
      case 'COVID Message':
        return setCurrentCovidSteps(prev => prev - 1);
      case 'Promote a Product (Shopify)':
        return setCurrentPromoteStep(prev => prev - 1);

      default:
        return;
    }
  };

  const nextSteps = link => {
    if (!link) {
      return;
    }

    switch (link) {
      case 'COVID Message':
        return setCurrentCovidSteps(prev => prev + 1);
      case 'Promote a Product (Shopify)':
        return setCurrentPromoteStep(prev => prev + 1);

      default:
        return;
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col xs={11}>
          <Modal isOpen={props.isOpen} toggle={props.handleChangeOpen}>
            <Row className='modal-window__main-row'>
              <Col className='navigation-wrapper' xs={12} md={2}>
                <Navigation activeLink={activeLink} />
              </Col>
              {props.story === 'COVID Message' && activeLink === 'story' && (
                <Covid
                  setActiveLink={setActiveLink}
                  currentCovidStep={currentCovidStep}
                  prevCovidSteps={prevSteps}
                  nextCovidSteps={nextSteps}
                  currentTab={props.story}
                  marTop={305}
                />
              )}
              {activeLink === 'live' && props.story === 'COVID Message' && (
                <PanelPreview
                  setActiveLink={setActiveLink}
                  currentTab={props.story}
                  prevSteps={prevSteps}
                  img={covPhone}
                />
              )}
              {props.story === 'Promote a Product (Shopify)' && activeLink === 'story' && (
                <PromoteProduct
                  setActiveLink={setActiveLink}
                  prevPromoteSteps={prevSteps}
                  nextPromoteSteps={nextSteps}
                  currentTab={props.story}
                  currentPromoteStep={currentPromoteStep}
                  marTop={328}
                />
              )
              }
              {props.story === 'Promote a Product (Shopify)' && activeLink === 'live' && (
                <PanelPreview
                  setActiveLink={setActiveLink}
                  currentTab={props.story}
                  prevSteps={prevSteps}
                  img={manPhone}
                />
              )}

              {activeLink === 'brand' && (
                <>
                  <Col className='modal-window__left' xs={12} md={9} lg={5}>
                    <SetupProfile currentTab={props.story} nextSteps={nextSteps} setActiveLink={setActiveLink} />
                  </Col>
                  <Col className='modal-window__right offset-md-2 offset-lg-0' xs={12} md={10} lg={5}>
                    <Preview />
                  </Col>
                </>
              )
              }
            </Row>
          </Modal>
        </Col>
      </Row>
    </Container >
  )
}

export default ModalWindow