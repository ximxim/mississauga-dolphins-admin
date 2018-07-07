import { call, takeEvery, put, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { getClient } from '../../../../utils/firebase';
import * as eventsModule from '../index';
import { getEventPlayers } from '../../../selectors';

function addPlayer({ players, id }) {
    const fClient = getClient();
    const ref = fClient.database().ref(`/Events/${id}`);
    return new Promise(resolve => {
        ref.update({ players }, res => resolve(res));
    });
}

export function* handleAddPlayer({ payload }) {
    const { eventId, playerId } = payload;
    const players = yield select(getEventPlayers, eventId);
    const isNew = !players.find(id => id == playerId);

    if (isNew) {
        players.push(playerId);
        const response = yield call(addPlayer, { id: eventId, players });
        if (response instanceof Error) {
            yield put(eventsModule.addPlayerFailure(response));
            toast.error('Unable to add player. Try again.');
        } else {
            yield put(eventsModule.addPlayerSuccess({ eventId, players }));
            toast.success('Successfully added a player');
        }
    } else {
        toast.info('This player is already added');
    }
}

export default function* watchAddPlayer() {
    yield takeEvery(eventsModule.ADD_PLAYER, handleAddPlayer);
}
