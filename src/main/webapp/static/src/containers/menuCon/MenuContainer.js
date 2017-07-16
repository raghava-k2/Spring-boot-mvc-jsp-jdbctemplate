import { connect } from 'react-redux'
import {withRouter} from 'react-router'
import {showMenu} from '../../actions'
import Menu from '../../components/menuCom/Menu'

const mapStateToProps = (state) => {
   return {
       
   }
}
const mapDispatchToProps = (dispatch) => {
    return {
        showMenuDrawer: (status) => {
            dispatch(showMenu(status))
        }
    }
}

const MenuContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu))
export default MenuContainer