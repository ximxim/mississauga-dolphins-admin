import { CREATE_GAME_SUCCESS, DELETE_GAME_SUCCESS } from '../Scores';

//ACTION
export const REQUEST_EVENTS = 'REQUEST_EVENTS';
export const REQUEST_EVENTS_SUCCESS = 'REQUEST_EVENTS_SUCCESS';
export const REQUEST_EVENTS_FAILURE = 'REQUEST_EVENTS_FAILURE';
export const ADD_PLAYER = 'ADD_PLAYER';
export const ADD_PLAYER_SUCCESS = 'ADD_PLAYER_SUCCESS';
export const ADD_PLAYER_FAILURE = 'ADD_PLAYER_FAILURE';
export const DELETE_PLAYER = 'DELETE_PLAYER';
export const DELETE_PLAYER_SUCCESS = 'DELETE_PLAYER_SUCCESS';
export const DELETE_PLAYER_FAILURE = 'DELETE_PLAYER_FAILURE';

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
            };
        }
        case REQUEST_EVENTS_SUCCESS: {
            return {
                ...state,
                loading: false,
                items: action.payload,
            };
        }
        case REQUEST_EVENTS_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.error,
            };
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
                    },
                },
            };
        }
        case DELETE_GAME_SUCCESS: {
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.game.event_id]: {
                        ...state.items[action.payload.game.event_id],
                        game_id: null,
                    },
                },
            };
        }
        case ADD_PLAYER: {
            return {
                ...state,
                loading: true,
            };
        }
        case ADD_PLAYER_SUCCESS: {
            return {
                ...state,
                loading: false,
                items: {
                    ...state.items,
                    [action.payload.eventId]: {
                        ...state.items[action.payload.eventId],
                        players: action.payload.players,
                    },
                },
            };
        }
        case ADD_PLAYER_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
        }
        case DELETE_PLAYER: {
            return {
                ...state,
                loading: true,
            };
        }
        case DELETE_PLAYER_SUCCESS: {
            return {
                ...state,
                loading: false,
                items: {
                    ...state.items,
                    [action.payload.eventId]: {
                        ...state.items[action.payload.eventId],
                        players: action.payload.players,
                    },
                },
            };
        }
        case DELETE_PLAYER_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            };
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

export function addPlayer(payload) {
    return {
        type: ADD_PLAYER,
        payload,
    };
}

export function addPlayerSuccess(payload) {
    return {
        type: ADD_PLAYER_SUCCESS,
        payload,
    };
}

export function addPlayerFailure(error) {
    return {
        type: ADD_PLAYER_FAILURE,
        error,
    };
}

export function deletePlayer(payload) {
    return {
        type: DELETE_PLAYER,
        payload,
    };
}

export function deletePlayerSuccess(payload) {
    return {
        type: DELETE_PLAYER_SUCCESS,
        payload,
    };
}

export function deletePlayerFailure(error) {
    return {
        type: DELETE_PLAYER_FAILURE,
        error,
    };
}
