import actionTypes from './actionTypes'
import {apiLoginAdmin } from '../../service/admin'

export const loginadmin = (payload) => async (dispatch) => {
    try {
        const response = await apiLoginAdmin(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS_ADMIN,
                data: response.data.token
            })
        } else {
            dispatch({
                type: actionTypes.LOGIN_FAIL_ADMIN,
                data: response.data.msg
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.LOGIN_FAIL,
            data: null
        })
    }
}

export const logoutadmin = () => ({
    type: actionTypes.LOGOUT_ADMIN
})