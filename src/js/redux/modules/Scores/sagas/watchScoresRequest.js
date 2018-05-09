import { call, takeEvery, put } from 'redux-saga/effects';

import { getClient } from '../../../../utils/firebase';
import * as scoresModule from '../index';

function getGames() {
    const fClient = getClient();
    const ref = fClient.database().ref('/Games');
    return new Promise(resolve =>
        ref.once('value', snapshot =>
            resolve(snapshot.val()), error => resolve(error)));
}

export function* handleRequest() {
    const response = yield call(getGames);
    yield put(scoresModule.requestGamesSuccess(response));
}

export default function* watchRequest() {
    yield takeEvery(scoresModule.REQUEST_GAMES, handleRequest);
}
