import { all, fork } from "redux-saga/effects";

import account from './account';
import user from './user';

export default function* rootSaga() {
  yield all([
    fork(account),
    fork(user),
  ])
}