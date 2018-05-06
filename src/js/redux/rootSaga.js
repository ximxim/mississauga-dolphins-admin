import { fork, all } from 'redux-saga/effects';

import watchScores from './modules/Scores/sagas/watchScores';

function* rootSaga() {
    yield all([
        fork(watchScores),
    ]);
}

export default rootSaga;