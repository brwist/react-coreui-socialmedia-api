import { put, takeLatest } from "redux-saga/effects";
import axios from 'axios';
import * as actions from '../actions/analytics'
import * as types from '../types/analytics'

export function* getAnalytics(action) {
  try {
    const data = yield axios.get('lb/'+action.payload.locationId+'/analytics')
      .then(res => {
        return res.data
      })

    yield put(actions.setAnalytics(data))
  } catch (e) {
    console.log(e)
    yield put(actions.setAnalyticsError(e))
  }
}


export default function* () {
  yield takeLatest(types.GET_ANALYTICS, getAnalytics)
}