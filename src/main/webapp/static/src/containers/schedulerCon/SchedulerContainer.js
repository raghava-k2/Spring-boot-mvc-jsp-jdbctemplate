import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {showDialog, searchJob, insertJobDetailsIntoDialog} from '../../actions'
import Scheduler from '../../components/schedulerCom/Scheduler'

const mapStateToProps = (state) => {
    return {createJobData: state.jobReducer, jobResults: state.jobResults}
}
const mapDispatchToProps = (dispatch) => {
    return {
        showCreateJobDialog: (status) => {
            dispatch(showDialog(status))
        },
        searchJob: (params) => {
            dispatch(searchJob(params))
        },
        insertSelectedJobDetails: (index) => {
            dispatch(insertJobDetailsIntoDialog(index))
        }
    }
}

const SchedulerContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Scheduler))
export default SchedulerContainer