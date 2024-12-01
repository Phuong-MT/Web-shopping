import actionTypes from './actionTypes'
import {apiLogin } from '../../service/admin'

export const login = (payload) => async (dispatch) => {
    try {
        const response = await apiLogin(payload)
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                data: response.data.token
            })
        } else {
            dispatch({
                type: actionTypes.LOGIN_FAIL,
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

export const logout = () => ({
    type: actionTypes.LOGOUT
})