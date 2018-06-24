//ACTION
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const REQUEST_LOGIN_SUCCESS = 'REQUEST_LOGIN_SUCCESS';
export const REQUEST_LOGIN_FAILURE = 'REQUEST_LOGIN_FAILURE';
export const REQUEST_SIGNOUT = 'REQUEST_SIGNOUT';

const initialState = {
    uid: null,
    email: null,
    loading: false,
    error: null,
};

//REDUCER
export default function reducer(state = initialState, action) {
    switch (action.type) {
    case REQUEST_LOGIN: {
        return {
            ...state,
            loading: true,
        }
    }
    case REQUEST_LOGIN_SUCCESS: {
        const { email, uid } = action.payload;
        return {
            ...state,
            uid,
            email,
            error: null,
            loading: false,
        };
    }
    case REQUEST_LOGIN_FAILURE: {
        return {
            ...state,
            error: action.payload,
            loading: false,
        }
    }
    case REQUEST_SIGNOUT: {
        return initialState;
    }
    default:
        return state;
    }
}

//ACTION CREATOR
export function requestLogin(payload) {
    return {
        type: REQUEST_LOGIN,
        payload,
    };
}

export function requestLoginSuccess(payload) {
    return {
        type: REQUEST_LOGIN_SUCCESS,
        payload,
    };
}

export function requestLoginFailure(payload) {
    return {
        type: REQUEST_LOGIN_FAILURE,
        payload,
    };
}

export function requestSignOut() {
    return {
        type: REQUEST_SIGNOUT,
    };
}
