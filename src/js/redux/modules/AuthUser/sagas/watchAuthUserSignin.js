import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import firebase from 'firebase';

import * as authUserModule from '../index';
import { getClient } from '../../../../utils/firebase';

function attemptSignin({ username, password }) {
    const fClient = getClient();
    return fClient
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
            return fClient
                .auth()
                .signInWithEmailAndPassword(username, password)
                .catch(error => error);
        });
}

export function* handleLogin(action) {
    const response = yield call(attemptSignin, action.payload);
    if (response.user) {
        toast.success('Login Successful');
    } else {
        yield put(authUserModule.requestLoginFailure(response));
        toast.error(response.message);
    }
}

export default function* watchRequest() {
    yield takeEvery(authUserModule.REQUEST_LOGIN, handleLogin);
}
