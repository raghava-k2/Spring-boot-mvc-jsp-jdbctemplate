import {combineReducers} from 'redux'
import homeReducer from './homeReducer'
import {loginReducer, createUserReducer} from './loginReducer'
import {jobReducer, jobDetailsReducer} from './jobReducer'

const reducerApp = combineReducers({homeReducer, jobReducer, jobDetailsReducer, loginReducer, createUserReducer})

export default reducerApp