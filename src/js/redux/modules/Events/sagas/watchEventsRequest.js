import { call, takeEvery, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getClient } from '../../../../utils/firebase';
import * as eventsModule from '../index';

function getGames() {
    const fClient = getClient();
    const ref = fClient.database().ref('/Events');
    return new Promise(resolve =>
        ref.once('value', snapshot =>
            resolve(snapshot.val()), error => resolve(error)));
}

export function* handleRequest() {
    const response = yield call(getGames);
    if (response.code) {
        yield put(eventsModule.requestEventsFailure(response));
        toast.error(`EVENTS DATA: ${response.code}`);
    } else {
        yield put(eventsModule.requestEventsSuccess(response));
    }
}

export default function* watchRequest() {
    yield takeEvery(eventsModule.REQUEST_EVENTS, handleRequest);
}
