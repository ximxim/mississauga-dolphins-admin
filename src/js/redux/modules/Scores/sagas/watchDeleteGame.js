import { call, takeEvery, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getClient } from '../../../../utils/firebase';
import * as scoresModule from '../index';

function deleteGame({ id }) {
    const fClient = getClient();
    const ref = fClient.database().ref(`/Games/${id}`);
    return ref.remove();
}

function breakEventLink({ game }) {
    const fClient = getClient();
    const ref = fClient.database().ref(`/Events/${game.event_id}/game_id`);
    return ref.remove();
}

export function* handleDeleteGame({ payload }) {
    yield call(breakEventLink, payload);
    yield call(deleteGame, payload);
    yield put(scoresModule.deleteGameSuccess(payload));
    toast.success('Successfully deleted game');
}

export default function* watchRequest() {
    yield takeEvery(scoresModule.DELETE_GAME, handleDeleteGame);
}
