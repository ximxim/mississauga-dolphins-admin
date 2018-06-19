import { combineReducers } from 'redux';

import scores from './modules/Scores';
import events from './modules/Events';
import players from './modules/Players';
import authUser from './modules/AuthUser';

export default combineReducers({
    authUser,
    scores,
    events,
    players,
});
