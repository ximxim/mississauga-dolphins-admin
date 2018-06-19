import { call, takeEvery, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getClient } from '../../../../utils/firebase';
import * as playersModule from '../index';

function getPlayers() {
    const fClient = getClient();
    const ref = fClient.database().ref('/Players');
    return new Promise(resolve =>
        ref.once('value', snapshot =>
            resolve(snapshot.val()), error => resolve(error)));
}

export function* handleRequest() {
    const response = yield call(getPlayers);
    if (response.code) {
        yield put(playersModule.requestPlayersFailure(response));
        toast.error(`PLAYERS DATA: ${response.code}`);
    } else {
        yield put(playersModule.requestPlayersSuccess(response));
    }

}

export default function* watchRequest() {
    yield takeEvery(playersModule.REQUEST_PLAYERS, handleRequest);
}
