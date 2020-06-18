import { put, takeLatest } from "redux-saga/effects";
import axios from 'axios';
import * as actions from '../actions/workflow'
import * as types from '../types/workflow'

export function* getWorkflow(action) {
  try {
    const data = yield axios.get('workflow/'+action.payload.workflowId)
      .then(res => {
        return res.data
      })

    yield put(actions.setWorkflow(data))
  } catch (e) {
    console.log(e)
    yield put(actions.setWorkflowError(e))
  }
}


export default function* () {
  yield takeLatest(types.GET_WORKFLOW, getWorkflow)
}