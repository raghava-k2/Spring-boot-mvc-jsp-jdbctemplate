import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import reducerApp from '../reducers'

const configStore = () => {
    return createStore(reducerApp, applyMiddleware(thunk))
}
export default configStore
