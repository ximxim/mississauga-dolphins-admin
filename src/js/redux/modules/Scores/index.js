//ACTION
export const REQUEST = 'REQUEST';

const initialState = {};

//REDUCER
export default function reducer(state = initialState, action) {
    switch (action.type) {
    case REQUEST: {
        return {
            ...state,
        };
    }
    default:
        return state;
    }
}

//ACTION CREATOR
export function request() {
    return {
        type: REQUEST,
    };
}
