import URL from '../constants/url'
import {ActionUtil} from './actionUtil'
import * as loading from './loadingAction'

const loginDetails = (type, value) => {
    return {type, value}
}

export const loginUser = () => {
    return (dispatch, getState) => {
        if (ActionUtil.checkLoginValidations(getState().loginReducer) === null) {
            dispatch(loading.loadingRequest(true))
            return fetch(URL.loginUser, {
                method: 'GET',
                auth: {
                    username: getState().loginReducer.userName,
                    password: getState().loginReducer.password
                },
                credentials: 'include'
            }).then(response => {
                return response.text()
            }).then(text => {
                dispatch(loading.loadingRequest(false))
                dispatch(loginDetails('ADD_ERROR_MSG', text))
            }).catch(response => {
                dispatch(loading.loadingRequest(false))
                dispatch(loginDetails('ADD_ERROR_MSG', response.message))
            })
        } else {
            dispatch(loginDetails('ADD_ERROR_MSG', ActionUtil.checkValidations(getState().loginReducer)))
        }
    }
}