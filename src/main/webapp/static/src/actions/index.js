import fetch from 'isomorphic-fetch'
import { ActionUtil } from './actionUtil'
import URL from '../constants/url'
import { loginUser } from './loginAction'
import * as loading from './loadingAction'
import { searchJob, insertJobDetailsIntoDialog, updateJobDetails, addDeleteList, deleteJobs } from './jobSearchAction'
let headers = new Headers();
headers.set('content-type', 'application/json;charset=UTF-8')

export const showMenu = (show) => {
  return { type: 'SHOW_MENU', show }
}

export const showDialog = (show) => {
  return { type: 'SHOW_DIALOG', show }
}

export const jobDetails = (type, value, day) => {
  return { type, value, day }
}

export const storeRegistDetails = (type, value) => {
  return { type, value }
}

export const schedulerMessage = (value) => {
  return { type: 'ADD_SCHEDULER_MSG', value }
}

export const createNewUser = () => {
  return (dispatch, getState) => {
    if (!ActionUtil.checkValidations(getState().loginReducer)) {
      dispatch(loading.loadingRequest(true))
      return fetch(URL.createUserUrl, {
        method: 'POST',
        body: JSON.stringify(getState().loginReducer),
        headers: headers
      }).then(response => {
        return response.text()
      }).then(text => {
        dispatch(loading.loadingResponse(false))
        dispatch(storeRegistDetails('ADD_ERROR_MSG', text))
      }).catch(response => {
        dispatch(loading.loadingResponse(false))
        dispatch(storeRegistDetails('ADD_ERROR_MSG', response.message))
      })
    } else {
      dispatch(storeRegistDetails('ADD_ERROR_MSG', ActionUtil.checkValidations(getState().loginReducer)))
    }
  }
}

export { loginUser }
export { searchJob, insertJobDetailsIntoDialog, updateJobDetails, addDeleteList, deleteJobs }