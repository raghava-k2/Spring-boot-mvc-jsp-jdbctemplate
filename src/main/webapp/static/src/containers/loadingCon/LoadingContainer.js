import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import Loading from '../../components/loadingCom/Loading'

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {}
}

const LoadingContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Loading))
export default LoadingContainer