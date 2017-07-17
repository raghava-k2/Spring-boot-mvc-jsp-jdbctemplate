import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button} from 'react-bootstrap'
import RegisterUser from '../../containers/loginCon/RegisterUserContainer'
import FieldGroup from '../util/util'
import './login.css'
class Login extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        createJobData: PropTypes.object.isRequired,
        showCreateJobDialog: PropTypes.func.isRequired
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
    render() {
        return (
            <div className='login'>
                <form
                    onSubmit={e => {
                    e.preventDefault();
                    this
                        .props
                        .history
                        .push('/home')
                }}>
                    <FieldGroup
                        id='user'
                        type='text'
                        label='User'
                        placeholder='Enter UserName'
                        onChange={e => this.user = e.target.value}/>
                    <FieldGroup
                        id='pwd'
                        type='password'
                        label='Password'
                        placeholder='Enter Password'
                        onChange={e => this.pwd = e.target.value}/>
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
            </div>

        )
    }
}
export default Login