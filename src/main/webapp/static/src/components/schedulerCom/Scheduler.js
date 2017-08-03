import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {Label} from 'react-bootstrap'
import CreateJob from '../../containers/schedulerCon/CreateJobContainer'
import './scheduler.css'

class Scheduler extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        createJobData: PropTypes.object.isRequired,
        showCreateJobDialog: PropTypes.func.isRequired,
        jobResults: PropTypes.array.isRequired,
        searchJob: PropTypes.func.isRequired,
        insertSelectedJobDetails: PropTypes.func.isRequired,
        deleteList: PropTypes.array.isRequired,
        insertIntoDeleteList: PropTypes.func.isRequired,
        schedulerInfo: PropTypes.object.isRequired,
        deleteJob: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props)
        this.handleDialog = this
            .handleDialog
            .bind(this)
        this.handleSubmit = this
            .handleSubmit
            .bind(this)
        this.addSearchValues = this
            .addSearchValues
            .bind(this)
        this.handleAdd = this
            .handleAdd
            .bind(this)
        this.handleDelete = this
            .handleDelete
            .bind(this)
        this.isSelected = this
            .isSelected
            .bind(this)
        this.handleRowSelection = this
            .handleRowSelection
            .bind(this)
    }

    handleDialog(e, index) {
        e.preventDefault()
        this
            .props
            .showCreateJobDialog(true)
        this
            .props
            .insertSelectedJobDetails(index)
    }
    handleSubmit(e) {
        this
            .props
            .searchJob(this)
    }

    addSearchValues(data) {
        Object.assign(this, data)
    }

    handleAdd(e) {
        e.preventDefault();
        this
            .props
            .showCreateJobDialog(true)
    }

    handleDelete(e) {
        e.preventDefault();
        this
            .props
            .deleteJob()
    }

    isSelected(id) {
        return (this.props.deleteList.indexOf(id) !== -1)
    }

    handleRowSelection(id) {
        this
            .props
            .insertIntoDeleteList((id.length === 0
                ? 'notall'
                : id), this.props.jobResults.length)
    }

    render() {
        return (
            <div className='scheduler'>
                <Paper zDepth={1}>
                    <Label>Job Scheduler/Monitor</Label>
                    <Paper zDepth={1}>
                        <TextField
                            hintText="UserName"
                            style={{
                            display: 'inline-block'
                        }}
                            underlineShow={false}
                            onChange={(e, v) => this.addSearchValues({'userName': v})}/>
                        <TextField
                            hintText="GroupName"
                            style={{
                            display: 'inline-block'
                        }}
                            underlineShow={false}
                            onChange={(e, v) => this.addSearchValues({'grpName': v})}/>
                        <TextField
                            hintText="JobName"
                            style={{
                            display: 'inline-block'
                        }}
                            underlineShow={false}
                            onChange={(e, v) => this.addSearchValues({'jobName': v})}/>
                        <TextField
                            hintText="Status"
                            style={{
                            display: 'inline-block'
                        }}
                            underlineShow={false}
                            onChange={(e, v) => this.addSearchValues({'status': v})}/>
                        <RaisedButton
                            label="Search"
                            primary={true}
                            onTouchTap={this.handleSubmit}
                            style={{
                            display: 'inline-block'
                        }}/>
                        <Divider/>
                    </Paper>
                    <section
                        style={{
                        marginLeft: '20px',
                        marginTop: '10px'
                    }}>
                        <div className='customadd' onClick={this.handleAdd}>+</div>
                        <div className='customremove' onClick={this.handleDelete}>-</div>
                    </section>
                    <Table onRowSelection={this.handleRowSelection} multiSelectable={true}>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>Job</TableHeaderColumn>
                                <TableHeaderColumn>GroupName</TableHeaderColumn>
                                <TableHeaderColumn>StartDate</TableHeaderColumn>
                                <TableHeaderColumn>Status</TableHeaderColumn>
                                <TableHeaderColumn>UserName</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody stripedRows={true}>
                            {this
                                .props
                                .jobResults
                                .map((obj, i) => {
                                    return (
                                        <TableRow key={obj.jobId} selected={this.isSelected(i)}>
                                            <TableRowColumn>
                                                <a href='' onClick={e => this.handleDialog(e, i)}>{obj.jobName}</a>
                                            </TableRowColumn>
                                            <TableRowColumn>
                                                {obj.jobGroupName}
                                            </TableRowColumn>
                                            <TableRowColumn>{obj.jobDateTime}</TableRowColumn>
                                            <TableRowColumn>{obj.status}</TableRowColumn>
                                            <TableRowColumn>{obj.userName}</TableRowColumn>
                                        </TableRow>
                                    )
                                })}

                        </TableBody>
                    </Table>
                </Paper>
                <CreateJob show={this.props.createJobData.show}/>
                <Snackbar
                    open={this.props.schedulerInfo.msg.length > 0}
                    message={this.props.schedulerInfo.msg}
                    autoHideDuration={2000}/>
            </div>
        )
    }
}
export default Scheduler