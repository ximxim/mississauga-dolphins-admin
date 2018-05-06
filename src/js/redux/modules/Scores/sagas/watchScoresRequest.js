import { takeEvery } from 'redux-saga/effects';

import * as scoresModule from '../index';

export function* handleRequest() {
    console.log('REQUESTED SCORES');
}

export default function* watchRequest() {
    yield takeEvery(scoresModule.REQUEST, handleRequest);
}
