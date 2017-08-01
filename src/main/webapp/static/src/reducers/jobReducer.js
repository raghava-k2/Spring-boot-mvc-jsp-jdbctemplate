const setDays = (state, day, action) => {
    Object
        .keys(state.days)
        .forEach((key) => {
            if (key === day) 
                state.days[key] = action
        })
    return Object.assign({}, state)
}

export const jobReducer = (state = {
    show: false
}, action) => {
    switch (action.type) {
        case 'SHOW_DIALOG':
            return {show: action.show}
        default:
            return state
    }
}

export const jobDetailsReducer = (state = {
    jobName: '',
    jobGrpName: '',
    startDate: null,
    startTime: null,
    endDate: null,
    endTime: null,
    fileSpec: '',
    mapName: '',
    payroll: '',
    outputFile: '',
    outputFileName: '',
    week: 'daily',
    days: {
        sunday: true,
        monday: true,
        tuesday: true,
        wednesday: true,
        thrusday: true,
        friday: true,
        saturday: true
    }
}, action) => {
    switch (action.type) {
        case 'ADD_JOB_DETAILS':
            return Object.assign({}, state, {jobName: action.value})
        case 'ADD_JOB_GRP_DETAILS':
            return Object.assign({}, state, {jobGrpName: action.value})
        case 'ADD_START_DATE_DETAILS':
            return Object.assign({}, state, {startDate: action.value})
        case 'ADD_START_TIME_DETAILS':
            return Object.assign({}, state, {startTime: action.value})
        case 'ADD_END_DATE_DETAILS':
            return Object.assign({}, state, {endDate: action.value})
        case 'ADD_END_TIME_DETAILS':
            return Object.assign({}, state, {endTime: action.value})
        case 'ADD_FILE_SPEC_DETAILS':
            return Object.assign({}, state, {fileSpec: action.value})
        case 'ADD_MAP_DETAILS':
            return Object.assign({}, state, {mapName: action.value})
        case 'ADD_PAYROLL_DETAILS':
            return Object.assign({}, state, {payroll: action.value})
        case 'ADD_OUTPUT_FILE_DETAILS':
            return Object.assign({}, state, {outputFile: action.value})
        case 'ADD_OUTPUT_FILE_NAME_DETAILS':
            return Object.assign({}, state, {outputFileName: action.value})
        case 'ADD_WEEK_DETAILS':
            return Object.assign({}, state, {week: action.value})
        case 'ADD_DAYS_DETAILS':
            return setDays(state, action.day, action.value)
        case 'INSERT_DETAILS':
            return Object.assign({}, state, action.value)
        default:
            return state
    }
}

export const jobResults = (state = [], action) => {
    switch (action.type) {
        case 'ADD_JOB_RESULT':
            return Object.assign([], state, action.value)
        default:
            return state
    }
}