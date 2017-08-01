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
        insertSelectedJobDetails: PropTypes.func.isRequired
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
                        <div className='customadd'>+</div>
                        <div className='customremove'>-</div>
                    </section>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHeaderColumn>Job</TableHeaderColumn>
                                <TableHeaderColumn>GroupName</TableHeaderColumn>
                                <TableHeaderColumn>StartDate</TableHeaderColumn>
                                <TableHeaderColumn>Status</TableHeaderColumn>
                                <TableHeaderColumn>UserName</TableHeaderColumn>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {this
                                .props
                                .jobResults
                                .map((obj, i) => {
                                    return (
                                        <TableRow key={obj}>
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
            </div>
        )
    }
}
export default Scheduler