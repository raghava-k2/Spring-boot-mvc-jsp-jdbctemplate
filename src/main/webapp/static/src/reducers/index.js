import {combineReducers} from 'redux'
import homeReducer from './homeReducer'
import loginReducer from './loginReducer'
import {jobReducer, jobDetailsReducer} from './jobReducer'

const reducerApp = combineReducers({homeReducer, jobReducer, jobDetailsReducer, loginReducer})

export default reducerApp