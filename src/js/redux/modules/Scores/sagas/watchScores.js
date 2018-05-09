import { fork, all } from 'redux-saga/effects';

import watchScoresRequest from './watchScoresRequest';
import watchGameCreate from './watchGameCreate';
import watchUpdateGame from './watchUpdateGame';
import watchFinishGame from './watchFinishGame';

function* rootSaga() {
    yield all([
        fork(watchScoresRequest),
        fork(watchGameCreate),
        fork(watchUpdateGame),
        fork(watchFinishGame),
    ]);
}

export default rootSaga;