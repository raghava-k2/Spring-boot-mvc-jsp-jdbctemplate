export const loadingResponse = (value, json) => {
    return {value, type: 'REQUEST_IS_RECEIVED'}
}

export const loadingRequest = (value) => {
    return {type: 'REQUEST_IS_PROCESSING', value}
}
