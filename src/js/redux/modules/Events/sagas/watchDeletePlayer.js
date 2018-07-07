import { call, takeEvery, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import _ from 'lodash';

import { getClient } from '../../../../utils/firebase';
import * as eventsModule from '../index';
import { getEventPlayers } from '../../../selectors';

function deletePlayer({ players, id }) {
    const fClient = getClient();
    const ref = fClient.database().ref(`/Events/${id}`);
    return new Promise(resolve => {
        ref.update({ players }, res => resolve(res));
    });
}

export function* handleDeletePlayer({ payload }) {
    const { eventId, playerId } = payload;
    const players = yield select(getEventPlayers, eventId);
    _.remove(players, player => player === playerId);
    const response = yield call(deletePlayer, { id: eventId, players });

    if (response instanceof Error) {
        yield put(eventsModule.deletePlayerFailure(response));
        toast.error('Unable to remove player. Try again.');
    } else {
        yield put(eventsModule.deletePlayerSuccess({ eventId, players }));
        toast.success('Successfully removed a player');
    }
}

export default function* watchAddPlayer() {
    yield takeEvery(eventsModule.DELETE_PLAYER, handleDeletePlayer);
}
