import { combineReducers } from 'redux';

import scores from './modules/Scores';
import authUser from './modules/AuthUser';

export default combineReducers({
    authUser,
    scores,
});
