import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {showDialog} from '../../actions'
import Login from '../../components/loginCom/Login'

const mapStateToProps = (state) => {
    return {createJobData: state.jobReducer, loadingStatus: state.createUserReducer}
}
const mapDispatchToProps = (dispatch) => {
    return {
        showCreateJobDialog: (status) => {
            dispatch(showDialog(status))
        }
    }
}

const LoginContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
export default LoginContainer