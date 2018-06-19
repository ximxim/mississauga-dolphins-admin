//ACTION
export const REQUEST_PLAYERS = 'REQUEST_PLAYERS';
export const REQUEST_PLAYERS_SUCCESS = 'REQUEST_PLAYERS_SUCCESS';
export const REQUEST_PLAYERS_FAILURE = 'REQUEST_PLAYERS_FAILURE';

const initialState = {
    loading: false,
    error: null,
    items: null,
};

//REDUCER
export default function reducer(state = initialState, action) {
    switch (action.type) {
    case REQUEST_PLAYERS: {
        return {
            ...state,
            loading: true,
        }
    }
    case REQUEST_PLAYERS_SUCCESS: {
        return {
            ...state,
            loading: false,
            items: action.payload,
        }
    }
    case REQUEST_PLAYERS_FAILURE: {
        return {
            ...state,
            loading: false,
            error: action.error,
        }
    }
    default:
        return state;
    }
}

//ACTION CREATOR
export function requestPlayers() {
    return {
        type: REQUEST_PLAYERS,
    };
}

export function requestPlayersSuccess(payload) {
    return {
        type: REQUEST_PLAYERS_SUCCESS,
        payload,
    };
}

export function requestPlayersFailure(error) {
    return {
        type: REQUEST_PLAYERS_FAILURE,
        error,
    };
}

