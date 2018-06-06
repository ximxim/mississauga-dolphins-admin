import { fork, all } from 'redux-saga/effects';

import watchScoresRequest from './watchScoresRequest';
import watchGameCreate from './watchGameCreate';
import watchUpdateGame from './watchUpdateGame';
import watchFinishGame from './watchFinishGame';
import watchDeleteGame from './watchDeleteGame';

function* rootSaga() {
    yield all([
        fork(watchScoresRequest),
        fork(watchGameCreate),
        fork(watchUpdateGame),
        fork(watchFinishGame),
        fork(watchDeleteGame),
    ]);
}

export default rootSaga;