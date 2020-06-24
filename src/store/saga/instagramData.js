import { put, takeLatest } from "redux-saga/effects";
import axios from 'axios';
import * as actions from '../actions/instagramData'
import * as types from '../types/instagramData'

export function* getInstagramData(action) {
  try {
    const instagramLink = 'locn/'+action.payload.locationId+'/INSTAGRAM/'
    const data = yield Promise.all([
      axios.get(instagramLink+'STORY'),
      axios.get(instagramLink+'POSTS')
    ]).then(res => {
      return {
        stories: res[0].data,
        posts: res[1].data.posts,
      }
    })
    yield put(actions.setInstgramData(data))


  } catch (e) {
    console.log(e)
    yield put(actions.setInstgramDataError(e))
  }
}


export default function* () {
  yield takeLatest(types.GET_INSTAGRAM_DATA, getInstagramData)
}