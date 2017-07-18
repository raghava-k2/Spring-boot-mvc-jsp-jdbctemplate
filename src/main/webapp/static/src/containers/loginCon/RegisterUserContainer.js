import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {showDialog, storeRegistDetails, createNewUser} from '../../actions'
import RegisterUser from '../../components/loginCom/RegisterUser'

const mapStateToProps = (state) => {
    console.log(state)
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
            dispatch(createNewUser())
        }
    }
}

const RegisterUserContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterUser))
export default RegisterUserContainer