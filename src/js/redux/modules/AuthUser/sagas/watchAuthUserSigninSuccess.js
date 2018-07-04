import { takeEvery, put } from 'redux-saga/effects';

import * as authUserModule from '../index';
import * as scoresModule from '../../Scores';
import * as eventsModule from '../../Events';
import * as playersModule from '../../Players';

export function* handleLoginSuccess(action) {
    yield put(scoresModule.requestGames());
    yield put(eventsModule.requestEvents());
    yield put(playersModule.requestPlayers());
}

export default function* watchRequest() {
    yield takeEvery(authUserModule.REQUEST_LOGIN_SUCCESS, handleLoginSuccess);
}
