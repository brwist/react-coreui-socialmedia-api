import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Spinner } from 'reactstrap'

import PhonePanel from '../../phonePanel/index'
import './index.scss';
import phonePanel from '../../../assets/phone.png'

import StoryInput from '../../inputs/index'



const Step = ({
  step,
  setActiveLink,
  currentStoryStep,
  currentTab,
  prevModalSteps,
  nextModalSteps,
  setStateId,
  workflowStateID,
  handleStoryStep,
  index,
  stepsLength,
  workflowId,
  previewImage,
  setPreviewImage,
  locationId }) => {
  const [params, setParams] = useState({})
  const [stepIsSubmitting, setStepSubmit] = useState(false)

  useEffect(() => {
    if (currentStoryStep === 0) {
      return setActiveLink('brand')
    } else if (currentStoryStep === 2) {
      return setActiveLink('live')
    }
  }, [currentStoryStep, setActiveLink]);

  const handleParamsChange = (name, value) => {
    setParams({
      ...params,
      [name]: value
    })
  }

  const submitStep = (tab) => {
    setStepSubmit(true)
    axios.post(`locn/${locationId}/workflow/${workflowId}/step/${step.stepID}`, {
      stepOp: step.stepOp,
      workflowStateID: workflowStateID,
      params: params
    }). then(response => {
      setStateId(response.data.workflowStateID)
      setStepSubmit(false)
      return index+1 === stepsLength ? nextModalSteps(tab) : handleStoryStep(+1)()
    }, error => {
      console.log(error)
      setStepSubmit(false)
    })

  }

  let stepIsInvalid = false

  for (let workflowInput of step.workflowInputs) {
    if (!workflowInput.optinal && !params[workflowInput.name]) {
      stepIsInvalid = true
      continue
    }
  }

  const nextMethod = submitStep
  const prevMethod = index === 0 ? prevModalSteps : handleStoryStep(-1)

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
        <PhonePanel previewImage={previewImage} currentTab={currentTab} img={phonePanel} disableNext={stepIsInvalid} prevSteps={prevMethod} nextSteps={nextMethod} title={'Template Editor'} />
      </Col>
    </> : <Spinner className='setup__spinner' color="dark" />
  )
}

export default Step;