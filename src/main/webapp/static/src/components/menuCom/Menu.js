import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

export default class Menu extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        showMenuDrawer: PropTypes.func.isRequired
    }
    constructor(props) {
        super(props);
        this.handleClose = this
            .handleClose
            .bind(this)
    }
    handleClose() {
        this
            .props
            .showMenuDrawer(false)
    }
    render() {
        return (
            <div>
                <Drawer
                    docked={false}
                    width={200}
                    open={this.props.show}
                    onRequestChange={(open) => this.handleClose()}>
                    <MenuItem onTouchTap={this.handleClose}>
                        <Link to='/home'>
                            Home
                        </Link>
                    </MenuItem>
                    <MenuItem onTouchTap={this.handleClose}>
                        <Link to={`${this.props.match.url}/scheduler`}>
                            Scheduler
                        </Link>
                    </MenuItem>
                </Drawer>
            </div>
        );
    }
}