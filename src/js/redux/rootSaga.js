import { fork, all } from 'redux-saga/effects';

import watchScores from './modules/Scores/sagas/watchScores';
import watchAuthUser from './modules/AuthUser/sagas/watchAuthUser';

function* rootSaga() {
    yield all([
        fork(watchScores),
        fork(watchAuthUser),
    ]);
}

export default rootSaga;