import { CREATE_GAME_SUCCESS, DELETE_GAME_SUCCESS } from '../Scores';

//ACTION
export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export const REQUEST_EVENTS_SUCCESS = 'REQUEST_EVENTS_SUCCESS';
export const REQUEST_EVENTS_FAILURE = 'REQUEST_EVENTS_FAILURE';

const initialState = {
    loading: false,
    error: null,
    items: null,
};

//REDUCER
export default function reducer(state = initialState, action) {
    switch (action.type) {
    case REQUEST_EVENTS: {
        return {
            ...state,
            loading: true,
        }
    }
    case REQUEST_EVENTS_SUCCESS: {
        return {
            ...state,
            loading: false,
            items: action.payload,
        }
    }
    case REQUEST_EVENTS_FAILURE: {
        return {
            ...state,
            loading: false,
            error: action.payload,
        }
    }
    case CREATE_GAME_SUCCESS: {
        const gameId = Object.keys(action.payload)[0];
        const eventId = action.payload[gameId].event_id;
        return {
            ...state,
            items: {
                ...state.items,
                [eventId]: {
                    ...state.items[eventId],
                    game_id: gameId,
                }
            }
        }
    }
    case DELETE_GAME_SUCCESS: {
        return {
            ...state,
            items: {
                ...state.items,
                [action.payload.game.event_id]: {
                    ...state.items[action.payload.game.event_id],
                    game_id: null,
                }
            }
        }
    }
    default:
        return state;
    }
}

//ACTION CREATOR
export function requestEvents() {
    return {
        type: REQUEST_EVENTS,
    };
}

export function requestEventsSuccess(payload) {
    return {
        type: REQUEST_EVENTS_SUCCESS,
        payload,
    };
}

export function requestEventsFailure(error) {
    return {
        type: REQUEST_EVENTS_FAILURE,
        error,
    };
}

