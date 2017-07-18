import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FieldGroup from '../util/util'
import {Button, Well} from 'react-bootstrap'

export default class RegisterUser extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        userDetails: PropTypes.object.isRequired,
        showCreateJobDialog: PropTypes.func.isRequired,
        storeUserData: PropTypes.func.isRequired,
        createUser: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.handleClose = this
            .handleClose
            .bind(this)
        this.handleSubmit = this
            .handleSubmit
            .bind(this)
    }

    handleClose() {
        this
            .props
            .showCreateJobDialog(false)
        this
            .props
            .storeUserData('CLEAR_DATA', false)
    }

    handleSubmit() {
        this
            .props
            .createUser()
    }

    storeUserInfo(action, value) {
        this
            .props
            .storeUserData(action, value)
    }

    render() {
        const actions = [< FlatButton label = "Cancel" primary = {
                true
            }
            onTouchTap = {
                this.handleClose
            } />];

        return (
            <div className='registeruser'>
                <Dialog
                    title="Create New User"
                    actions={actions}
                    modal={false}
                    open={this.props.show}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}>
                    <div className='register'>
                        <form
                            onSubmit={e => {
                            e.preventDefault();
                            this.handleSubmit(e)
                        }}>{this.props.userDetails.errorMsg && <Well
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
                            <FieldGroup
                                id='cnfpwd'
                                type='password'
                                label='Confirm Password'
                                placeholder='Password'
                                value={this.props.userDetails.confPassword}
                                onChange={(e, v) => this.storeUserInfo('ADD_CONF_PASSWORD', e.target.value)}/>
                            <FieldGroup
                                id='email'
                                type='email'
                                label='Email'
                                placeholder='Enter Email Id'
                                value={this.props.userDetails.email}
                                onChange={(e, v) => this.storeUserInfo('ADD_EMAIL_ID', e.target.value)}/>
                            <Button type="submit" bsStyle="primary">
                                Submit</Button>
                        </form>
                    </div>
                </Dialog>
            </div>
        );
    }
}