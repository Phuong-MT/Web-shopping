import actionTypes from "../actions/actionTypes";

const initState = {
    isAdmin: false,
    token: null,
    msg: '',
    update: false
}

const adminReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_SUCCESS_ADMIN:
            return {
                ...state,
                isAdmin: true,
                token: action.data,
                msg: ''
            }
        case actionTypes.LOGIN_FAIL_ADMIN:
            return {
                ...state,
                isAdmin: false,
                msg: action.data,
                token: null,
                update: !state.update
            }
        case actionTypes.LOGOUT_ADMIN:
            return {
                ...state,
                isAdmin: false,
                token: null,
                msg: ''
            }

        default:
            return state;
    }
}

export default adminReducer