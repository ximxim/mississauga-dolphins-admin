import { fork, all } from 'redux-saga/effects';

import watchAuthUserSignin from './watchAuthUserSignin';
import watchAuthUserSigninSuccess from './watchAuthUserSigninSuccess';
import watchRequestSignout from './watchRequestSignout';

function* rootSaga() {
    yield all([
        fork(watchAuthUserSignin),
        fork(watchAuthUserSigninSuccess),
        fork(watchRequestSignout),
    ]);
}

export default rootSaga;