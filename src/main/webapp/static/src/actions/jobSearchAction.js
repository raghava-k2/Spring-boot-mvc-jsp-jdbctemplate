import fetch from 'isomorphic-fetch'
import axios from 'axios'
import URL from '../constants/url'
import * as loading from './loadingAction'
let headers = new Headers();
headers.set('content-type', 'application/json;charset=UTF-8')

const searchDetails = (type, value) => {
    return { type, value }
}

const jobDetails = (type, value) => {
    return { type, value }
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
            isUpdate: true,
            clientId: data.clientId,
            jobId: data.jobId,
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

export const updateJobDetails = (updateOrCreate) => {
    return (dispatch, getState) => {
        dispatch(loading.loadingRequest(true))
        return axios({
            method: 'post',
            url: (updateOrCreate
                ? URL.updateJob
                : URL.createJob),
            data: JSON.stringify(createData(getState().jobDetailsReducer, getState().loginReducer.userName)),
            headers: {
                'content-type': 'application/json;charset=UTF-8'
            },
            auth: {
                username: getState().loginReducer.userName,
                password: getState().loginReducer.password
            },
            withCredentials: true
        }).then(response => {
            dispatch(loading.loadingRequest(false))
            dispatch(jobDetails('ADD_MSG', response.data.msg))
        }).catch(response => {
            dispatch(loading.loadingRequest(false))
            console.log(response)
        })
    }
}

const createData = (data, userNm) => {
    return {
        userName: userNm,
        clientId: data.clientId,
        jobId: data.jobId,
        jobName: data.jobName,
        jobDescription: (data.jobName + data.jobGrpName),
        jobGroupName: data.jobGrpName,
        jobDateTime: getDate(data.startDate, data.startTime),
        jobEndtime: getDate(data.endDate, data.endTime),
        glInfo: {
            fileSpec: data.fileSpec,
            mapName: data.mapName,
            payroll: data.payroll,
            outputFile: data.outputFile,
            outputFileName: data.outputFileName
        },
        jobExeDays: getDays(data.days),
        jobExeMonths: []
    }
}

const getDate = (date, time) => {
    if (date && time) {
        let d = new Date()
        if (time)
            d.setTime(time.getTime())
        else
            d.setTime(0)
        d.setDate(date.getDate())
        d.setMonth(date.getMonth())
        d.setYear(date.getYear())
        return d.toString()
    }
    return null
}
const getDays = (days) => {
    return Object
        .keys(days)
        .map((day, i) => {
            if (days[day])
                return (i + 1)
            else
                return null
        })
        .filter((o, i) => {
            if (o)
                return true;
            else
                return false;
        }
        )
}

export const addDeleteList = (value, size) => {
    return { type: 'ADD_JOB_ID', value, size }
}

const schedulerMessage = (value) => {
    return { type: 'ADD_SCHEDULER_MSG', value }
}

export const deleteJobs = () => {
    return (dispatch, getState) => {
        dispatch(loading.loadingRequest(true))
        return axios({
            method: 'post',
            url: URL.deleteJob,
            data: JSON.stringify(getState().deleteList),
            headers: {
                'content-type': 'application/json;charset=UTF-8'
            },
            auth: {
                username: getState().loginReducer.userName,
                password: getState().loginReducer.password
            },
            withCredentials: true
        }).then(response => {
            dispatch(loading.loadingRequest(false))
            dispatch(schedulerMessage(response.data.msg))
            dispatch(addDeleteList('all'))
        }).catch(response => {
            dispatch(loading.loadingRequest(false))
            dispatch(schedulerMessage("Error occured while deleting"))
        })
    }
}