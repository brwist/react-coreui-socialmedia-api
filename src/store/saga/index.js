import { all, fork } from "redux-saga/effects";

import connection from './connection';

export default function* rootSaga() {
  yield all([
    fork(connection),
  ])
}