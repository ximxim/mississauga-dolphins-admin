import { call, takeEvery, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getClient } from '../../../../utils/firebase';
import * as scoresModule from '../index';

function createGame({ game, id }) {
    const fClient = getClient();
    const ref = fClient.database().ref(`/Games/${id}`);
    return ref.set(game);
}

export function* handleCreateGame({ payload }) {
    yield call(createGame, payload);
    const updatedGame = { [payload.id]: payload.game };
    yield put(scoresModule.updateGameSuccess(updatedGame));
    toast.success('Successfully updated game');
}

export default function* watchRequest() {
    yield takeEvery(scoresModule.UPDATE_GAME, handleCreateGame);
}
