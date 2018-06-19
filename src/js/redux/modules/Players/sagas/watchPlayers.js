import { fork, all } from 'redux-saga/effects';

import watchPlayersRequest from './watchPlayersRequest';

function* rootSaga() {
    yield all([
        fork(watchPlayersRequest),
    ]);
}

export default rootSaga;