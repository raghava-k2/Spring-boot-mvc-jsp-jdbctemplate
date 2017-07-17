export const loginReducer = (state = {
    userName: '',
    password: '',
    confPassword: '',
    emailId: ''
}, action) => {
    switch (action.type) {
        case 'ADD_USER_NAME':
            return Object.assign({}, state, {userName: action.value})
        case 'ADD_PASSWORD':
            return Object.assign({}, state, {password: action.value})
        case 'ADD_CONF_PASSWORD':
            return Object.assign({}, state, {confPassword: action.value})
        case 'ADD_EMAIL_ID':
            return Object.assign({}, state, {emailId: action.value})
        default:
            return state
    }
}

export const createUserReducer = (state = {
    isFetching: false
}, action) => {
    switch (action.type) {
        case 'REQUEST_CREATE_USER':
            return Object.assign({}, state, {isFetching: action.value})
        case 'RESPONSE_CREATE_USER':
            return Object.assign({}, state, {
                isFetching: action.value
            }, {
                data: action.data,
                receivedAt: action.receivedAt
            })
        default:
            return state
    }
}