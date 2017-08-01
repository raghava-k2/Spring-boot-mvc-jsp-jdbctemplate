import URL from '../constants/url'
import * as loading from './loadingAction'

const searchDetails = (type, value) => {
    return {type, value}
}

const jobDetails = (type, value) => {
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

export const insertJobDetailsIntoDialog = (index) => {
    return (dispatch, getState) => {
        let data = getState().jobResults[index]
        dispatch(jobDetails('INSERT_DETAILS', {
            jobName: data.jobName,
            jobGrpName: data.jobGroupName,
            startDate: new Date(Date.parse(data.jobDateTime)),
            startTime: new Date(Date.parse(data.jobDateTime)),
            endDate: data.jobEndtime
                ? new Date(Date.parse(data.jobEndtime))
                : null,
            endTime: data.jobEndtime
                ? new Date(Date.parse(data.jobEndtime))
                : null,
            fileSpec: data.glInfo.fileSpec,
            mapName: data.glInfo.mapName,
            payroll: data.glInfo.payroll,
            outputFile: data.glInfo.outputFile,
            outputFileName: data.glInfo.outputFileName,
            week: 'daily',
            days: markDays(data.jobExeDays)
        }))
    }
}
const markDays = (days) => {
    let day = {
        sunday: false,
        monday: false,
        tuesday: false,
        wednesday: false,
        thrusday: false,
        friday: false,
        saturday: false
    };
    days.forEach(function (d) {
        day[Object.keys(day)[d - 1]] = true
    });
    return day;
}