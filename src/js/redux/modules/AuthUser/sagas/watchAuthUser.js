import { fork, all } from 'redux-saga/effects';

import watchAuthUserSignin from './watchAuthUserSignin';
import watchAuthUserSigninSuccess from './watchAuthUserSigninSuccess';

function* rootSaga() {
    yield all([
        fork(watchAuthUserSignin),
        fork(watchAuthUserSigninSuccess),
    ]);
}

export default rootSaga;