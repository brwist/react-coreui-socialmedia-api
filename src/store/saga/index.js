import { all, fork } from "redux-saga/effects";

import account from './account';
import user from './user';
import workflow from './workflow';
import instagramData from './instagramData';
import shopifyData from './shopifyData';

export default function* rootSaga() {
  yield all([
    fork(account),
    fork(user),
    fork(workflow),
    fork(instagramData),
    fork(shopifyData),
  ])
}