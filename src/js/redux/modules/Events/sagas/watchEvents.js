import { fork, all } from 'redux-saga/effects';

import watchEventsRequest from './watchEventsRequest';
import watchAddPlayer from './watchAddPlayer';

function* rootSaga() {
    yield all([fork(watchEventsRequest), fork(watchAddPlayer)]);
}

export default rootSaga;
