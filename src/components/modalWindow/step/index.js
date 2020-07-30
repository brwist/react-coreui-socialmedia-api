import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Col } from 'reactstrap'

import Spinner from '../../utils/Spinner';
import './index.scss';
import phonePanel from '../../../assets/phone.png'
import PanelPreview from '../panelPreview/index'
import Panel from '../../../components/editor/index';

import StoryInput from '../../inputs/index'



const Step = ({
  step,
  setActiveLink,
  currentStoryStep,
  currentTab,
  onBoarding,
  setStateId,
  workflowStateID,
  handleStoryStep,
  index,
  stepsLength,
  workflowId,
  previewImage,
  setPreviewImage,
  closeModal,
  locationId }) => {
  const [params, setParams] = useState({})
  const [stepIsSubmitting, setStepSubmit] = useState(false)
  const [previewStep, setPreviewStep] = useState(false)
  const [lastSubmitted, setLastSubmitted] = useState(false)

  useEffect(() => {
    if (currentStoryStep === 0) {
      return setActiveLink(onBoarding ? 'brand' : 'story')
    } else if (currentStoryStep === 2) {
      return setActiveLink('live')
    }
  }, [currentStoryStep, setActiveLink, onBoarding]);

  const handleParamsChange = (name, value, multipleProps=null) => {
    let newParams = {...params}
    if (multipleProps) {
      newParams = {
        ...newParams,
        ...multipleProps
      }
    }
    if (name) {
      newParams[name] = value
    }
    setParams(newParams)
  }

  const isLastStep = index+1 === stepsLength

  const submitStep = (tab) => {
    setStepSubmit(true)
    delete params["SELECT_MENU"]
    axios.post(`locn/${locationId}/workflow/${workflowId}/step/${step.stepID}`, {
      stepOp: step.stepOp,
      workflowStateID: workflowStateID,
      params: params
    }). then(response => {
      setStateId(response.data.workflowStateID)
      setStepSubmit(false)
      if (isLastStep) {
        setLastSubmitted(true)
        setTimeout(() => {
          closeModal()
        }, 700)
      }
      return !isLastStep && handleStoryStep(+1)()
    }, error => {
      console.log(error)
      setStepSubmit(false)
    })
  }

  const handlePreviewStep = useCallback((e) => {
    !lastSubmitted && setPreviewStep(!previewStep)
    isLastStep && setActiveLink(!previewStep ? 'live' : 'story')
  }, [isLastStep, setPreviewStep, setActiveLink, previewStep, lastSubmitted ])

  let stepIsInvalid = false

  for (let workflowInput of step.workflowInputs) {
    if (!workflowInput.optinal && !params[workflowInput.name || workflowInput.type]) {
      stepIsInvalid = true
      continue
    }
  }

  const mediaInput = step.workflowInputs.find(input => input.implType === "MediaInput")

  const nextMethod = mediaInput || lastSubmitted ? handlePreviewStep : submitStep

  if (previewStep || lastSubmitted) {
    return <PanelPreview
      setActiveLink={setActiveLink}
      stepIsSubmitting={stepIsSubmitting}
      lastSubmitted={lastSubmitted}
      img={phonePanel}
      previewImage={previewImage}
      isLastStep={isLastStep}
      handlePreviewStep={handlePreviewStep}
      nextStep={submitStep}
      closeModal={closeModal}
    />
  }

  return (
    !stepIsSubmitting ? <>
      <Col className='covid-wrapper' md={9} lg={4}>
        <div className='social-side'>
          <div>
            <h3 className='covid__template-title'>{step.title}</h3>
            <div dangerouslySetInnerHTML={{__html: step.html}}></div>
            <div>
              {step.workflowInputs.map(input => {
                return <StoryInput {...input} key={input.name} setPreviewImage={setPreviewImage} locationId={locationId} handleParamsChange={handleParamsChange}/>
              })}
            </div>
          </div>
        </div>

      </Col>
      <Col className='phoneSetup offset-md-2 offset-lg-0' md={10} lg={6}>
        <Panel  previewImage={previewImage} currentTab={currentTab} img={phonePanel} disableNext={stepIsInvalid} nextSteps={nextMethod} title={'Template Editor'}/>
      </Col>
    </> : <Spinner className='setup__spinner' color="dark" />
  )
}

export default Step;