import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button, Well} from 'react-bootstrap'
import RegisterUser from '../../containers/loginCon/RegisterUserContainer'
import Loading from '../../components/loadingCom/Loading'
import FieldGroup from '../util/util'
import './login.css'
class Login extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        createJobData: PropTypes.object.isRequired,
        showCreateJobDialog: PropTypes.func.isRequired,
        loadingStatus: PropTypes.object.isRequired,
        userDetails: PropTypes.object.isRequired,
        storeUserData: PropTypes.func.isRequired,
        login: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props)
        this.registerUser = this
            .registerUser
            .bind(this)
    }

    registerUser(e) {
        e.preventDefault()
        this
            .props
            .showCreateJobDialog(true)
    }

    storeUserInfo(action, value) {
        this
            .props
            .storeUserData(action, value)
    }

    render() {
        if (this.props.userDetails.errorMsg === 'success') 
            this.props.history.push('/home')
        return (
            <div className='login'>
                <form
                    onSubmit={e => {
                    e.preventDefault();
                    this
                        .props
                        .login();
                }}>
                    {this.props.userDetails.errorMsg && <Well
                        style={{
                        color: 'indianred'
                    }}>{this.props.userDetails.errorMsg}</Well>
}
                    <FieldGroup
                        id='user'
                        type='text'
                        label='User'
                        placeholder='Enter UserName'
                        value={this.props.userDetails.userName}
                        onChange={(e, v) => this.storeUserInfo('ADD_USER_NAME', e.target.value)}/>
                    <FieldGroup
                        id='pwd'
                        type='password'
                        label='Password'
                        placeholder='Enter Password'
                        value={this.props.userDetails.password}
                        onChange={(e, v) => this.storeUserInfo('ADD_PASSWORD', e.target.value)}/>
                    <Button type="submit" bsStyle="primary">
                        Submit</Button>
                    <a
                        href=""
                        onClick={this.registerUser}
                        style={{
                        float: 'right'
                    }}>Register here</a>
                </form>
                <RegisterUser show={this.props.createJobData.show}/>
                <Loading show={this.props.loadingStatus.isFetching}/>
            </div>

        )
    }
}
export default Login