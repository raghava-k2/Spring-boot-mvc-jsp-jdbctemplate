import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {showDialog, storeRegistDetails, loginUser} from '../../actions'
import Login from '../../components/loginCom/Login'

const mapStateToProps = (state) => {
    return {createJobData: state.jobReducer, loadingStatus: state.loadingStatus, userDetails: state.loginReducer}
}
const mapDispatchToProps = (dispatch) => {
    return {
        showCreateJobDialog: (status) => {
            dispatch(showDialog(status))
        },
        storeUserData: (action, value) => {
            dispatch(storeRegistDetails(action, value))
        },
        login: () => {
            dispatch(loginUser())
        }
    }
}

const LoginContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
export default LoginContainer