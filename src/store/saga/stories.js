import { put, takeLatest } from "redux-saga/effects";
import axios from 'axios';
import * as actions from '../actions/stories'
import * as types from '../types/stories'

export function* getStories(action) {
  try {
    const data = yield axios.get('locn/'+action.payload.locationId+'/lb')
      .then(res => {
        return res.data
      })

    yield put(actions.setStories(data))
  } catch (e) {
    console.log(e)
    yield put(actions.setStoriesError(e))
  }
}


export default function* () {
  yield takeLatest(types.GET_STORIES, getStories)
}