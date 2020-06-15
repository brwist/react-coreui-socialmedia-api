import { all, put, takeLatest } from "redux-saga/effects";
import axios from 'axios';
import * as actions from '../actions/account'
import * as types from '../types/account'

export function* loginUser() {
  try {
    const data = yield axios.get('https://cors-anywhere.herokuapp.com/https://api-dev.lightboxlive.com/v0/admin/test/auth', {
      headers: {
        "accept": "application/json",
        "XUser": "aditya@lightboxlive.com",
        "XToken": "V2nCtB@x3m",
      },
    })
      .then(res => console.log(res))
    console.log('login')
  } catch (e) {
    console.log(e)
  }
}

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
    console.log('config')
    yield put(actions.setUser(data.data))
    yield put(actions.isLoading(true))
  } catch (e) {
    // window.location.href = 'https://lightboxlive.auth.us-west-2.amazoncognito.com/login?response_type=code&client_id=5nbhcblr12745g4c9lmrg4nhr3&redirect_uri=https://api-dev.lightboxlive.com/aws/auth/login'
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
    yield takeLatest(types.CHANGE_USER, user => changeUser(user)),
    yield takeLatest(types.LOGIN_USER, () => loginUser()),
  ])
}