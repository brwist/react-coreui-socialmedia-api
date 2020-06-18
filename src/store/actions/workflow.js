import { SET_WORKFLOW, WORKFLOW_ERROR } from '../types/workflow';

export const setWorkflow = workflow => ({
  type: SET_WORKFLOW,
  workflow,
})

export const setWorkflowError = error => {
  return ({
    type: WORKFLOW_ERROR,
    error
  })
}