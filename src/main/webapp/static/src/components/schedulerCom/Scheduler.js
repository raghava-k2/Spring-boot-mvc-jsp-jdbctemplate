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
        showCreateJobDialog: PropTypes.func.isRequired
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

    handleDialog(e) {
        e.preventDefault()
        this
            .props
            .showCreateJobDialog(true)
    }
    handleSubmit(e) {
        console.log(this)
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
                            {[1, 2, 3, 4, 5].map((obj, i) => {
                                return (
                                    <TableRow key={obj}>
                                        <TableRowColumn>
                                            <a href='' onClick={this.handleDialog}>{obj}</a>
                                        </TableRowColumn>
                                        <TableRowColumn>
                                            group{obj}
                                        </TableRowColumn>
                                        <TableRowColumn>{new Date().toLocaleDateString()}</TableRowColumn>
                                        <TableRowColumn>status{obj}</TableRowColumn>
                                        <TableRowColumn>username{obj}</TableRowColumn>
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