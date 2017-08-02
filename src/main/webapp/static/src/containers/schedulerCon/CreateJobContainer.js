import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {showDialog, jobDetails, updateJobDetails} from '../../actions'
import CreateJob from '../../components/schedulerCom/CreateJob'

const mapStateToProps = (state) => {
    return {jobDetails: state.jobDetailsReducer}
}
const mapDispatchToProps = (dispatch) => {
    return {
        showCreateJobDialog: (status) => {
            dispatch(showDialog(status))
            dispatch(jobDetails('CLEAR_VALUES'))
        },
        addJobDetails: (type, value, day) => {
            dispatch(jobDetails(type, value, day))
        },
        updateJob: (flag) => {
            dispatch(updateJobDetails(flag))
        }
    }
}

const CreateJobContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateJob))
export default CreateJobContainer