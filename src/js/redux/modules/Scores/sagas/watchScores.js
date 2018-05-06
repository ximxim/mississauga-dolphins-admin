import { fork, all } from 'redux-saga/effects';

import watchScoresRequest from './watchScoresRequest';

function* rootSaga() {
    yield all([
        fork(watchScoresRequest),
    ]);
}

export default rootSaga;