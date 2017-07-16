import {combineReducers} from 'redux'
import homeReducer from './homeReducer'
import {jobReducer, jobDetailsReducer} from './jobReducer'

const reducerApp = combineReducers({homeReducer, jobReducer, jobDetailsReducer})

export default reducerApp