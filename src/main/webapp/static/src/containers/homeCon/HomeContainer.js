import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {showMenu} from '../../actions'
import Home from '../../components/homeCom/Home'

const mapStateToProps = (state) => {
    return {homePageData: state.homeReducer}
}
const mapDispatchToProps = (dispatch) => {
    return {
        showMenuDrawer: (status) => {
            dispatch(showMenu(status))
        }
    }
}

const HomeContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))
export default HomeContainer