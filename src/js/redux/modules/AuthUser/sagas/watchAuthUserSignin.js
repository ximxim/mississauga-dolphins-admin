import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

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
        toast.success('LOGIN SUCCESSFUL');
    } else {
        yield put(authUserModule.requestLoginFailure(response));
        toast.error('LOGIN FAILED');
    }
}

export default function* watchRequest() {
    yield takeEvery(authUserModule.REQUEST_LOGIN, handleLogin);
}
