import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {showDialog, storeRegistDetails} from '../../actions'
import RegisterUser from '../../components/loginCom/RegisterUser'

const mapStateToProps = (state) => {
    console.log('inside cntainer state ', state)
    return {userDetails: state.loginReducer}
}
const mapDispatchToProps = (dispatch) => {
    return {
        showCreateJobDialog: (status) => {
            dispatch(showDialog(status))
        },
        storeUserData: (action, value) => {
            dispatch(storeRegistDetails(action, value))
        },
        createUser: () => {
            console.log('inside register component')
        }
    }
}

const RegisterUserContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterUser))
export default RegisterUserContainer