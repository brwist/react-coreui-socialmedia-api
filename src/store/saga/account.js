import { all, put, takeLatest } from "redux-saga/effects";
import axios from 'axios';
import * as actions from '../actions/account'
import * as types from '../types/account'

export function* getUser() {
  try {
    const data = yield axios.get('https://cors-anywhere.herokuapp.com/https://api-dev.lightboxlive.com/v0/admin/account/config', {
      headers: {
        "accept": "application/json",
        "XUser": "aditya@lightboxlive.com",
        "XToken": "V2nCtB@x3m",
      },
    })
      .then(res => res)
    yield put(actions.setUser(data.data))
    yield put(actions.isLoading(true))
  } catch (e) {
    console.log(e)
  }
}

export function* changeUser({ user }) {
  try {
    yield axios.post('https://cors-anywhere.herokuapp.com/https://api-dev.lightboxlive.com/v0/admin/account/config', user, {
      headers: {
        "accept": "application/json",
        "XUser": "aditya@lightboxlive.com",
        "XToken": "V2nCtB@x3m",
      },
    })
      .then(res => res)
  } catch (e) {
    console.log(e)
  }
}

export default function* () {
  yield all([
    yield takeLatest(types.GET_USER, () => getUser()),
    yield takeLatest(types.CHANGE_USER, user => changeUser(user))
  ])
}