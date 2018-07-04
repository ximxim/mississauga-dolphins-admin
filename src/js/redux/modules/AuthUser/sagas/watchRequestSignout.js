import { takeEvery, call } from 'redux-saga/effects';

import * as authUserModule from '../index';
import { getClient } from '../../../../utils/firebase';

function logout() {
    const fClient = getClient();
    return fClient.auth().signOut();
}

export function* handleLogout() {
    yield call(logout);
}

export default function* watchSignOut() {
    yield takeEvery(authUserModule.REQUEST_SIGNOUT, handleLogout);
}
