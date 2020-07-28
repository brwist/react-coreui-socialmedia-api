import { put, takeLatest } from "redux-saga/effects";
import axios from 'axios';
import * as actions from '../actions/menuList'
import * as types from '../types/menuList'

export function* getMenuList(action) {
  try {
    const data = yield axios.get('location/'+action.payload.locationId+'/menu/list')
      .then(res => {
        return res.data
      })

    yield put(actions.setMenuList(data))
  } catch (e) {
    console.log(e)
    yield put(actions.setMenuListError(e))
  }
}


export default function* () {
  yield takeLatest(types.GET_MENU_LIST, getMenuList)
}