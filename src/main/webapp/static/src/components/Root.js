import React from 'react'
import { Provider } from 'react-redux'
import {
    HashRouter as Router,
    Route
} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Main from './Main'
import Home from '../containers/homeCon/HomeContainer'
import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import './Root.css'
let history = createBrowserHistory()
const Root = ({ store }) => (
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            <Router history={history}>
                <div className='routers'>
                    <Route exact path="/" component={Main} />
                    <Route path="/home" component={Home} />
                </div>
            </Router>
        </MuiThemeProvider>
    </Provider>
)
export default Root