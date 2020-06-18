import { put, takeLatest } from "redux-saga/effects";
import axios from 'axios';
import * as actions from '../actions/user'
import * as types from '../types/user'

export function* getUserInfo() {
  try {
    const data = yield axios.get('user/info')
      .then(res => {
        return res.data
      })

    yield put(actions.setUserInfo(data))
  } catch (e) {
    console.log(e)
    yield put(actions.setUserInfoError(e))
  }
}


export default function* () {
  yield takeLatest(types.GET_USER_INFO, () => getUserInfo())
}