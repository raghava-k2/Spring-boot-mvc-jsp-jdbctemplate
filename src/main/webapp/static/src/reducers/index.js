import {combineReducers} from 'redux'
import homeReducer from './homeReducer'
import {loginReducer, loadingStatus} from './loginReducer'
import {jobReducer, jobDetailsReducer, jobResults, deleteList, schedulerData} from './jobReducer'

const reducerApp = combineReducers({
    homeReducer,
    jobReducer,
    jobDetailsReducer,
    loginReducer,
    loadingStatus,
    jobResults,
    deleteList,
    schedulerData
})

export default reducerApp