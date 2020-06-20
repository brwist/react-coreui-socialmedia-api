import React, { useState, useEffect } from 'react'
import { Col, Modal, Row, Container } from 'reactstrap';

import { connect } from "react-redux";

import { Spinner } from 'reactstrap';

import Navigation from './navigation/index'
import Preview from '../preview/index'
import SetupProfile from './setupProfile/index'
import Step from './step/index'
import PanelPreview from './panelPreview/index'
import './index.scss';
import covPhone from '../../assets/phone_panel.png'

import { GET_WORKFLOW } from '../../store/types/workflow'


const ModalWindow = props => {
  const [activeLink, setActiveLink] = useState(props.activeLink);
  const [currentStoryStep, setStorySteps] = useState(0);
  const [workflowStateID, setStateId] = useState('');
  const [storyStep, setStoryStep] = useState(0);
  const [previewImage, setPreviewImage] = useState('');

  const {
    workflowId,
    getWorkflowById,
    workflow,
    workflowIsLoading,
    locationId
  } = props

  useEffect(() => {
    if (!props.isOpen) {
      setActiveLink('story');
    }
  }, [props.isOpen])

  useEffect(() => {
    getWorkflowById(workflowId);
  }, [getWorkflowById, workflowId])

  const prevSteps = link => {
    if (!link) {
      return
    }
    return setStorySteps(prev => prev - 1);
  };

  const nextSteps = link => {
    if (!link) {
      return;
    }
    return setStorySteps(prev => prev + 1);
  }

  if (!workflow.steps || workflowIsLoading) return props.isOpen && <Spinner className='setup__spinner' color="dark" />

  const handleStoryStep = (move) => (tab) => {
    setStoryStep(storyStep+move)
  }

  const stepsLength = workflow.steps.length

  return (
    <Container fluid>
      <Row>
        <Col xs={11}>
          <Modal isOpen={props.isOpen} toggle={props.handleChangeOpen}>
            <Row className='modal-window__main-row'>
              <Col className='navigation-wrapper' xs={12} md={2}>
                <Navigation activeLink={activeLink} />
              </Col>

              {props.story === 'storySteps' && activeLink === 'story' && workflow.steps.map((step, index) => {
                return storyStep === index && <Step
                  setActiveLink={setActiveLink}
                  currentStoryStep={currentStoryStep}
                  step={step}
                  key={step.stepID}
                  index={index}
                  workflowId={workflow.id}
                  workflowStateID={workflowStateID}
                  locationId={locationId}
                  stepsLength={stepsLength}
                  prevModalSteps={prevSteps}
                  nextModalSteps={nextSteps}
                  handleStoryStep={handleStoryStep}
                  setStateId={setStateId}
                  setPreviewImage={setPreviewImage}
                  previewImage={previewImage}
                  currentTab={props.story}
                  marTop={305}
                />
              })}


              {activeLink === 'live' && props.story === 'storySteps' && (
                <PanelPreview
                  setActiveLink={setActiveLink}
                  currentTab={props.story}
                  prevSteps={prevSteps}
                  closeModal={props.handleChangeOpen}
                  img={covPhone}
                  previewImage={previewImage}
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
              )}
            </Row>
          </Modal>
        </Col>
      </Row>
    </Container >
  )
}

const mapStateToProps = state => ({
  workflow: state.workflow.workflow,
  workflowIsLoading: state.workflow.isLoading,
})

const mapDispatchToProps = dispatch => ({
  getWorkflowById: (workflowId) => dispatch({ type: GET_WORKFLOW , payload: { workflowId }}),
})

export default connect(mapStateToProps, mapDispatchToProps)(ModalWindow);