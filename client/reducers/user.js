// User reducer
import axios from 'axios';

// ACTION TYPES
const SET_CURRENT_USER = 'SET_CURRENT_USER';


// ACTION CREATORS
export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

// THUNK
export function verifyUser(credential){
    return function thunk (dispatch) {
        return axios.post('/api/auth', credential)
                .then(res => res.data)
                .then(user => {
                    if (user) {
                        dispatch(setCurrentUser(user));
                    }
                })
                .catch(err => { throw err; });
    };
}


// REDUCER
export default function reducer (state = {}, action) {
    switch (action.type) {

        case SET_CURRENT_USER:
            return action.user;

        default:
            return state;
    }
}
