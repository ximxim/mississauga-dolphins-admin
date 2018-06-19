//ACTION
export const REQUEST_GAMES = 'REQUEST_GAMES';
export const REQUEST_GAMES_SUCCESS = 'REQUEST_GAMES_SUCCESS';
export const REQUEST_GAMES_FAILURE = 'REQUEST_GAMES_FAILURE';
export const CREATE_GAME = 'CREATE_GAME';
export const CREATE_GAME_SUCCESS = 'CREATE_GAME_SUCCESS';
export const CREATE_GAME_FAILURE = 'CREATE_GAME_FAILURE';
export const UPDATE_GAME = 'UPDATE_GAME';
export const UPDATE_GAME_SUCCESS = 'UPDATE_GAME_SUCCESS';
export const UPDATE_GAME_FAILURE = 'UPDATE_GAME_FAILURE';
export const FINISH_GAME = 'FINISH_GAME';
export const FINISH_GAME_SUCCESS = 'FINISH_GAME_SUCCESS';
export const FINISH_GAME_FAILURE = 'FINISH_GAME_FAILURE';
export const DELETE_GAME = 'DELETE_GAME';
export const DELETE_GAME_SUCCESS = 'DELETE_GAME_SUCCESS';
export const DELETE_GAME_FAILURE = 'DELETE_GAME_FAILURE';

const initialState = {
    loading: false,
    error: null,
    games: null,
};

//REDUCER
export default function reducer(state = initialState, action) {
    switch (action.type) {
    case REQUEST_GAMES: {
        return {
            ...state,
            loading: true,
        }
    }
    case REQUEST_GAMES_SUCCESS: {
        return {
            ...state,
            loading: false,
            games: action.payload,
        }
    }
    case REQUEST_GAMES_FAILURE: {
        return {
            ...state,
            loading: false,
            error: action.error,
        }
    }
    case CREATE_GAME: {
        return {
            ...state,
            loading: true,
        };
    }
    case CREATE_GAME_SUCCESS: {
        return {
            ...state,
            loading: false,
            games: {
                ...state.games,
                ...action.payload,
            }
        };
    }
    case CREATE_GAME_FAILURE: {
        return {
            ...state,
            loading: false,
            error: action.payload,
        };
    }
    case UPDATE_GAME: {
        return {
            ...state,
            loading: true,
        };
    }
    case FINISH_GAME: {
        return {
            ...state,
            loading: true,
        };
    }
    case UPDATE_GAME_SUCCESS : {
        return {
            ...state,
            loading: false,
            games: {
                ...state.games,
                [action.payload.id]: {
                    ...action.payload.game,
                },
            }
        };
    }
    case FINISH_GAME_SUCCESS : {
        return {
            ...state,
            loading: false,
            games: {
                ...state.games,
                [action.payload.id]: {
                    ...action.payload.game,
                },
            }
        };
    }
    case UPDATE_GAME_FAILURE: {
        return {
            ...state,
            loading: false,
            error: action.error,
        };
    }
    case DELETE_GAME_SUCCESS: {
        return {
            ...state,
            games: {
                ...state.games,
                ...delete state.games[action.payload.id]
            }
        }
    }
    default:
        return state;
    }
}

//ACTION CREATOR
export function requestGames() {
    return {
        type: REQUEST_GAMES,
    };
}

export function requestGamesSuccess(payload) {
    return {
        type: REQUEST_GAMES_SUCCESS,
        payload,
    };
}

export function requestGamesFailure(error) {
    return {
        type: REQUEST_GAMES_FAILURE,
        error,
    };
}

export function createGame(payload) {
    return {
        type: CREATE_GAME,
        payload,
    };
}

export function createGameSuccess(payload) {
    return {
        type: CREATE_GAME_SUCCESS,
        payload,
    };
}

export function createGameFailure(error) {
    return {
        type: CREATE_GAME_FAILURE,
        error,
    };
}

export function updateGame(payload) {
    return {
        type: UPDATE_GAME,
        payload,
    };
}

export function updateGameSuccess(payload) {
    return {
        type: UPDATE_GAME_SUCCESS,
        payload,
    };
}

export function updateGameFailure(error) {
    return {
        type: UPDATE_GAME_FAILURE,
        error,
    };
}

export function finishGame(payload) {
    return {
        type: FINISH_GAME,
        payload,
    };
}

export function finishGameSuccess(payload) {
    return {
        type: FINISH_GAME_SUCCESS,
        payload,
    };
}

export function deleteGame(payload) {
    return {
        type: DELETE_GAME,
        payload,
    };
}

export function deleteGameSuccess(payload) {
    return {
        type: DELETE_GAME_SUCCESS,
        payload,
    };
}

export function deleteGameFailure(error) {
    return {
        type: DELETE_GAME_FAILURE,
        error,
    };
}
