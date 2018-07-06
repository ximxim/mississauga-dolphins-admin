import { call, takeEvery, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import moment from 'moment';

import { getClient } from '../../../../utils/firebase';
import * as scoresModule from '../index';

function createGame({ game, id }) {
    const fClient = getClient();
    const ref = fClient.database().ref(`/Games/${id}`);
    game.updated_at = moment().format();
    return ref.update(game);
}

export function* handleCreateGame({ payload }) {
    yield call(createGame, payload);
    yield put(scoresModule.updateGameSuccess(payload));
    toast.success('Successfully updated game');
}

export default function* watchRequest() {
    yield takeEvery(scoresModule.UPDATE_GAME, handleCreateGame);
}
