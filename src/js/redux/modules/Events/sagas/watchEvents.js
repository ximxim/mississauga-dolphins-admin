import { fork, all } from 'redux-saga/effects';

import watchEventsRequest from './watchEventsRequest';

function* rootSaga() {
    yield all([
        fork(watchEventsRequest),
    ]);
}

export default rootSaga;