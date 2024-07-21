

import { FETCH_USER_LOGIN_SUCCESS } from '../action/userAction';
const INITIAL_STATE = {
    account: {
        access_token: '',
        refreshToken: '',
        userName: '',
        image: '',
        role: ''
    },
    isAuthenticated: false
};
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:

            return {
                ...state,
                account: {
                    access_token: action?.payload?.DT?.access_token,
                    refreshToken: action?.payload?.DT?.refreshToken,
                    userName: action?.payload?.DT?.userName,
                    image: action?.payload?.DT?.image,
                    role: action?.payload?.DT?.role
                },
                isAuthenticated: true
            };


        default: return state;
    }
};

export default userReducer;