import URL from '../constants/url'
import * as loading from './loadingAction'

const searchDetails = (type, value) => {
    return {type, value}
}

const preparequeryStrng = (params, username) => {
    let param = new URLSearchParams();
    param.append('userName', username
        ? params.username
        : '')
    param.append('grpName', params.grpName
        ? params.grpName
        : '')
    param.append('jobName', params.jobName
        ? params.jobName
        : '')
    param.append('status', params.status
        ? params.status
        : '')
    return param.toString();
}

export const searchJob = (params) => {
    return (dispatch, getState) => {
        console.log(getState())
        dispatch(loading.loadingRequest(true))
        return fetch(URL.searchJob + '?' + preparequeryStrng(params, getState().loginReducer.userName), {
            method: 'GET',
            auth: {
                username: getState().loginReducer.userName,
                password: getState().loginReducer.password
            },
            credentials: 'include'
        }).then(response => {
            return response.json()
        }).then(json => {
            dispatch(loading.loadingRequest(false))
            dispatch(searchDetails('ADD_JOB_RESULT', json))
        }).catch(response => {
            dispatch(loading.loadingRequest(false))
            console.log(response)
        })
    }
}