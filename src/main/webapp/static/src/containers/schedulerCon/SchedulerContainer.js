import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { showDialog, searchJob, insertJobDetailsIntoDialog, addDeleteList, deleteJobs, schedulerMessage } from '../../actions'
import Scheduler from '../../components/schedulerCom/Scheduler'

const mapStateToProps = (state) => {
    return { createJobData: state.jobReducer, jobResults: state.jobResults, deleteList: state.deleteList, schedulerInfo: state.schedulerData, loadingStatus: state.loadingStatus }
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
        },
        insertIntoDeleteList: (value, size) => {
            dispatch(addDeleteList(value, size))
        },
        deleteJob: () => {
            dispatch(deleteJobs())
        },
        schedulerData: (value) => {
            dispatch(schedulerMessage(value))
        }
    }
}

const SchedulerContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Scheduler))
export default SchedulerContainer