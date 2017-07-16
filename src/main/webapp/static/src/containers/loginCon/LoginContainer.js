import { connect } from 'react-redux'
import {withRouter} from 'react-router'
import Login from '../../components/loginCom/Login'

const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const LoginContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
export default LoginContainer