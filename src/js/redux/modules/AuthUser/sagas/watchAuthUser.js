import { fork, all } from 'redux-saga/effects';

import watchAuthUserSignin from './watchAuthUserSignin';

function* rootSaga() {
    yield all([
        fork(watchAuthUserSignin),
    ]);
}

export default rootSaga;