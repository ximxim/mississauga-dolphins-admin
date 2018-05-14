import { call, takeEvery, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import moment from 'moment';

import { getClient } from '../../../../utils/firebase';
import * as scoresModule from '../index';

function createGame(game) {
    const fClient = getClient();
    const ref = fClient.database().ref('/Games');
    game.created_at = moment().format();
    game.updated_at = moment().format();
    game.active = true;
    return ref.push(game);
}

export function* handleCreateGame({ payload }) {
    const response = yield call(createGame, payload);
    if (response) {
        const newGame = { [response.key]: payload };
        yield put(scoresModule.createGameSuccess(newGame));
        toast.success('Successfully created game');
    }
}

export default function* watchRequest() {
    yield takeEvery(scoresModule.CREATE_GAME, handleCreateGame);
}
