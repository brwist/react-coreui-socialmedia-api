import { put, takeLatest } from "redux-saga/effects";
import axios from 'axios';
import * as actions from '../actions/instagramAccounts'
import * as types from '../types/instagramAccounts'

export function* getInstagramAccounts(action) {
  try {
    const data = yield axios.get('location/'+action.payload.locationId+'/instagramAccounts')
      .then(res => {
        return res.data
      })

    yield put(actions.setInstagramAccounts(data))
  } catch (e) {
    console.log(e)
    yield put(actions.setInstagramAccountsError(e))
  }
}


export default function* () {
  yield takeLatest(types.GET_INSTAGRAM_ACCOUNTS, getInstagramAccounts)
}