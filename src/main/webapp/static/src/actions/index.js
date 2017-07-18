import fetch from 'isomorphic-fetch'
import {ActionUtil} from './actionUtil'
import URL from '../constants/url'
let headers = new Headers();
headers.set('content-type', 'application/json;charset=UTF-8')
export const showMenu = (show) => {
  return {type: 'SHOW_MENU', show}
}

export const showDialog = (show) => {
  return {type: 'SHOW_DIALOG', show}
}

export const jobDetails = (type, value, day) => {
  return {type, value, day}
}

export const storeRegistDetails = (type, value) => {
  return {type, value}
}

const receivePosts = (value, json) => {
  return {value, type: 'RESPONSE_CREATE_USER'}
}

const requestPosts = (value) => {
  return {type: 'REQUEST_CREATE_USER', value}
}

export const createNewUser = () => {
  return (dispatch, getState) => {
    if (ActionUtil.checkValidations(getState().loginReducer) === null) {
      dispatch(requestPosts(true))
      return fetch(URL.createUserUrl, {
        method: 'POST',
        body: JSON.stringify(getState().loginReducer),
        headers: headers
      }).then(response => {
        return response.text()
      }).then(text => {
        dispatch(receivePosts(false))
        dispatch(storeRegistDetails('ADD_ERROR_MSG', text))
      }).catch(response => {
        dispatch(receivePosts(false))
        dispatch(storeRegistDetails('ADD_ERROR_MSG', response.message))
      })
    } else {
      dispatch(storeRegistDetails('ADD_ERROR_MSG', ActionUtil.checkValidations(getState().loginReducer)))
    }
  }
}