import { combineReducers } from 'redux';

import scores from './modules/Scores';
import events from './modules/Events';
import authUser from './modules/AuthUser';

export default combineReducers({
    authUser,
    scores,
    events,
});
