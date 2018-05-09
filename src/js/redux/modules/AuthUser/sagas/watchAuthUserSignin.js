import { takeEvery, call, put } from 'redux-saga/effects';

import * as authUserModule from '../index';
import { getClient } from '../../../../utils/firebase';

function attemptSignin({ username, password }) {
    const fClient = getClient();
    return fClient.auth().signInWithEmailAndPassword(username, password).catch(error => error);
}

export function* handleLogin(action) {
    const response = yield call(attemptSignin, action.payload);
    if (response.uid) {
        yield put(authUserModule.requestLoginSuccess(response));
        action.payload.history.push('/scores');
    } else {
        yield put(authUserModule.requestLoginFailure(response));
    }
}

export default function* watchRequest() {
    yield takeEvery(authUserModule.REQUEST_LOGIN, handleLogin);
}
