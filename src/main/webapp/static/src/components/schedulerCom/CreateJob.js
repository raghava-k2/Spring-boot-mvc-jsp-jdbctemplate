import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {List} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import './createJob.css'

export default class CreateJob extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        jobDetails: PropTypes.object.isRequired,
        showCreateJobDialog: PropTypes.func.isRequired,
        addJobDetails: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.handleClose = this
            .handleClose
            .bind(this)
        this.handleSubmit = this
            .handleSubmit
            .bind(this)
        this.styles = {
            root: {
                display: 'block'
            }
        }
        this.state = {
            fileSpec: 1
        }
    }

    handleClose() {
        this
            .props
            .showCreateJobDialog(false)
    }

    handleSubmit() {
        this
            .props
            .showCreateJobDialog(false)
    }
    handleChange(selectedList, value, day) {
        this
            .props
            .addJobDetails(selectedList, value, day)
    }

    render() {
        const actions = [ < FlatButton label = "Cancel" primary = {
                true
            }
            onTouchTap = {
                this.handleClose
            } />, < FlatButton label = "Submit" primary = {
                true
            }
            keyboardFocused = {
                true
            }
            onTouchTap = {
                this.handleSubmit
            } />
        ];

        return (
            <div className='jobDialog'>
                <Dialog
                    title="Create Job"
                    actions={actions}
                    modal={false}
                    open={this.props.show}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}>
                    <div style={this.styles.root}>
                        <Tabs >
                            <Tab label="Job">
                                <section className='jobSection'>
                                    <List>
                                        <Subheader>Job Details</Subheader>
                                        <TextField
                                            hintText="ex:orpan job"
                                            errorText="This field is required"
                                            floatingLabelText="Enter Job Name"
                                            onChange={(e, v) => this.handleChange('ADD_JOB_DETAILS', v)}
                                            value={this.props.jobDetails.jobName}/>
                                        <TextField
                                            hintText="ex:daily runs"
                                            errorText="This field is required"
                                            floatingLabelText="Enter Job Group Name"
                                            onChange={(e, v) => this.handleChange('ADD_JOB_GRP_DETAILS', v)}
                                            value={this.props.jobDetails.jobGrpName}/>
                                        <br/>
                                        <DatePicker
                                            hintText="StartDate"
                                            container="inline"
                                            style={{
                                            display: 'inline-block'
                                        }}
                                            formatDate={(d) => d.toLocaleDateString()}
                                            onChange={(e, v) => this.handleChange('ADD_START_DATE_DETAILS', v)}
                                            value={this.props.jobDetails.startDate}/>
                                        <TimePicker
                                            hintText="StartTime"
                                            autoOk={true}
                                            onChange={(e, v) => this.handleChange('ADD_START_TIME_DETAILS', v)}
                                            value={this.props.jobDetails.startTime}
                                            style={{
                                            display: 'inline-block'
                                        }}/>
                                        <DatePicker
                                            hintText="EndDate"
                                            container="inline"
                                            style={{
                                            display: 'inline-block'
                                        }}
                                            formatDate={(d) => d.toLocaleDateString()}
                                            onChange={(e, v) => this.handleChange('ADD_END_DATE_DETAILS', v)}
                                            value={this.props.jobDetails.endDate}/>
                                        <TimePicker
                                            hintText="EndTime"
                                            autoOk={true}
                                            onChange={(e, v) => this.handleChange('ADD_END_TIME_DETAILS', v)}
                                            value={this.props.jobDetails.endTime}
                                            style={{
                                            display: 'inline-block'
                                        }}/>
                                    </List>
                                </section>
                            </Tab>
                            <Tab label="Filters">
                                <section className='filterSection'>
                                    <List
                                        style={{
                                        display: 'inline-block',
                                        'borderRightStyle': 'insert'
                                    }}>
                                        <Subheader>Recurrence Pattern</Subheader>
                                        <RadioButtonGroup
                                            name="shipSpeed"
                                            defaultSelected="not_light"
                                            valueSelected={this.props.jobDetails.week}
                                            onChange={(e, v) => this.handleChange('ADD_WEEK_DETAILS', v)}
                                            style={{
                                            'paddingLeft': '18px'
                                        }}>
                                            <RadioButton value="daily" label="Daily"/>
                                            <RadioButton value="weekly" label="Weekly"/>
                                            <RadioButton value="monthly" label="Monthly"/>
                                            <RadioButton value="yearly" label="Yearly"/>
                                        </RadioButtonGroup>
                                    </List>
                                    <List
                                        style={{
                                        display: 'inline-block',
                                        width: '460px'
                                    }}>
                                        <Checkbox
                                            label='Sunday'
                                            checked={this.props.jobDetails.days.sunday}
                                            onCheck={(e, v) => this.handleChange('ADD_DAYS_DETAILS', v, 'sunday')}/>
                                        <Checkbox
                                            label='Monday'
                                            checked={this.props.jobDetails.days.monday}
                                            onCheck={(e, v) => this.handleChange('ADD_DAYS_DETAILS', v, 'monday')}/>
                                        <Checkbox
                                            label='Tuesday'
                                            checked={this.props.jobDetails.days.tuesday}
                                            onCheck={(e, v) => this.handleChange('ADD_DAYS_DETAILS', v, 'tuesday')}/>
                                        <Checkbox
                                            label='Wednesday'
                                            checked={this.props.jobDetails.days.wednesday}
                                            onCheck={(e, v) => this.handleChange('ADD_DAYS_DETAILS', v, 'wednesday')}/>
                                        <Checkbox
                                            label='Thrusday'
                                            checked={this.props.jobDetails.days.thrusday}
                                            onCheck={(e, v) => this.handleChange('ADD_DAYS_DETAILS', v, 'thrusday')}/>
                                        <Checkbox
                                            label='Friday'
                                            checked={this.props.jobDetails.days.friday}
                                            onCheck={(e, v) => this.handleChange('ADD_DAYS_DETAILS', v, 'friday')}/>
                                        <Checkbox
                                            label='Saturday'
                                            checked={this.props.jobDetails.days.saturday}
                                            onCheck={(e, v) => this.handleChange('ADD_DAYS_DETAILS', v, 'saturday')}/>
                                    </List>
                                </section>
                            </Tab>
                            <Tab label="RunTime Parameters">
                                <section className='runtimeSection'>
                                    <List>
                                        <Subheader>RunTime Inputs</Subheader>
                                        <SelectField
                                            floatingLabelText="File Spec Name"
                                            value={this.props.jobDetails.fileSpec}
                                            onChange={(e, i, v) => {
                                            this.handleChange('ADD_FILE_SPEC_DETAILS', v)
                                        }}>
                                            <MenuItem value={'QB custom1'} primaryText="QB custom1"/>
                                            <MenuItem value={'File spec1'} primaryText="File spec1"/>
                                            <MenuItem value={'File spec2'} primaryText="File Spec2"/>
                                            <MenuItem value={'File spec3'} primaryText="File Spec3"/>
                                            <MenuItem value={'File spec4'} primaryText="File Spec4"/>
                                        </SelectField>
                                        <SelectField
                                            floatingLabelText="Map Name"
                                            value={this.props.jobDetails.mapName}
                                            onChange={(e, i, v) => this.handleChange('ADD_MAP_DETAILS', v)}>
                                            <MenuItem value={'Map1'} primaryText="Map1"/>
                                            <MenuItem value={'Map2'} primaryText="Map2"/>
                                            <MenuItem value={'Map3'} primaryText="Map3"/>
                                            <MenuItem value={'Map4'} primaryText="Map4"/>
                                            <MenuItem value={'Map5'} primaryText="Map5"/>
                                        </SelectField>
                                        <SelectField
                                            floatingLabelText="Payroll File"
                                            value={this.props.jobDetails.payroll}
                                            onChange={(e, i, v) => this.handleChange('ADD_PAYROLL_DETAILS', v)}>
                                            <MenuItem value={'Payroll1'} primaryText="Payroll1"/>
                                            <MenuItem value={'Payroll2'} primaryText="Payroll2"/>
                                            <MenuItem value={'Payroll3'} primaryText="Payroll3"/>
                                            <MenuItem value={'Payroll4'} primaryText="Payroll4"/>
                                            <MenuItem value={'Payroll5'} primaryText="Payroll5"/>
                                        </SelectField>
                                        <SelectField
                                            floatingLabelText="Outfull File format"
                                            value={this.props.jobDetails.outputFile}
                                            onChange={(e, i, v) => this.handleChange('ADD_OUTPUT_FILE_DETAILS', v)}>
                                            <MenuItem value={'CSV'} primaryText="CSV"/>
                                            <MenuItem value={'IIF'} primaryText="IIF"/>
                                            <MenuItem value={'XML'} primaryText="XML"/>
                                        </SelectField>
                                        <TextField
                                            hintText="ex:outputfile.csv"
                                            errorText="This field is required"
                                            floatingLabelText="Enter OutputFile Name"
                                            value={this.props.jobDetails.outputFileName}
                                            onChange={(e, v) => this.handleChange('ADD_OUTPUT_FILE_NAME_DETAILS', v)}/>
                                    </List>
                                </section>
                            </Tab>
                        </Tabs>
                    </div>
                </Dialog>
            </div>
        );
    }
}