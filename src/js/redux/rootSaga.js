import { fork, all } from 'redux-saga/effects';

import watchScores from './modules/Scores/sagas/watchScores';
import watchEvents from './modules/Events/sagas/watchEvents';
import watchAuthUser from './modules/AuthUser/sagas/watchAuthUser';

function* rootSaga() {
    yield all([
        fork(watchScores),
        fork(watchAuthUser),
        fork(watchEvents),
    ]);
}

export default rootSaga;