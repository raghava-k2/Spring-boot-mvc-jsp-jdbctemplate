import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import {showDialog, jobDetails} from '../../actions'
import CreateJob from '../../components/schedulerCom/CreateJob'

const mapStateToProps = (state) => {
    return {jobDetails: state.jobDetailsReducer}
}
const mapDispatchToProps = (dispatch) => {
    return {
        showCreateJobDialog: (status) => {
            dispatch(showDialog(status))
        },
        addJobDetails: (type, value, day) => {
            dispatch(jobDetails(type, value, day))
        }
    }
}

const CreateJobContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateJob))
export default CreateJobContainer