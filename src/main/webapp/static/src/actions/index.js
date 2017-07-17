import fetch from 'isomorphic-fetch'
let headers = new Headers();
headers.append('Authorization', 'Basic ' +btoa('raghava:raghava'));
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
  console.log(json)
  return {
    value,
    type: 'RESPONSE_CREATE_USER',
    data: json
      .data
      .children
      .map(child => child.data),
    receivedAt: Date.now()
  }
}

const requestPosts = (value) => {
  return {type: 'REQUEST_CREATE_USER', value}
}

export const createNewUser = () => {
  return (dispatch, getState) => {
    console.log('inbside dispatch action', getState())
    dispatch(requestPosts(true))
    return fetch(`http://localhost:8080/jobdetails`, {
        headers: headers
      })
      .then(response => response.json())
      .then(json => dispatch(receivePosts(false, json)))
  }
}