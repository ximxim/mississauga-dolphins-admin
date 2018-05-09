import { call, takeEvery, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getClient } from '../../../../utils/firebase';
import * as scoresModule from '../index';

function finishGame({ id, game }) {
    const fClient = getClient();
    const ref = fClient.database().ref(`/Games/${id}`);
    game.active = false;
    return ref.set(game);
}

export function* handleFinishGame({ payload }) {
    yield call(finishGame, payload);
    const updatedGame = { [payload.id]: payload.game };
    yield put(scoresModule.finishGameSuccess(updatedGame));
    toast.success('Successfully finished game');
}

export default function* watchRequest() {
    yield takeEvery(scoresModule.FINISH_GAME, handleFinishGame);
}
