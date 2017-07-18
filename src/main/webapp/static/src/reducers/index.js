import {combineReducers} from 'redux'
import homeReducer from './homeReducer'
import {loginReducer, loadingStatus} from './loginReducer'
import {jobReducer, jobDetailsReducer} from './jobReducer'

const reducerApp = combineReducers({homeReducer, jobReducer, jobDetailsReducer, loginReducer, loadingStatus})

export default reducerApp