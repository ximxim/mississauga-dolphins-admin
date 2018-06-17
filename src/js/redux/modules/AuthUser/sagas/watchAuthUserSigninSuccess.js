import { takeEvery, put } from 'redux-saga/effects';

import * as authUserModule from '../index';
import * as scoresModule from '../../Scores';
import * as eventsModule from '../../Events';

export function* handleLoginSuccess() {
    yield put(scoresModule.requestGames());
    yield put(eventsModule.requestEvents());
}

export default function* watchRequest() {
    yield takeEvery(authUserModule.REQUEST_LOGIN_SUCCESS, handleLoginSuccess);
}
