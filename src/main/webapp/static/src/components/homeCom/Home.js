import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Route } from 'react-router-dom'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Menu from '../../containers/menuCon/MenuContainer'
import Scheduler from '../../containers/schedulerCon/SchedulerContainer'
import Footer from '../../components/footerCom/Footer'

class Home extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        homePageData: PropTypes.object.isRequired,
        showMenuDrawer: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.showMenu = this
            .showMenu
            .bind(this)
    }
    showMenu() {
        this.props.showMenuDrawer(true)
    }
    render() {
        return (
            <div className='home'>
                <AppBar
                    title="GLI"
                    iconElementRight={< Logged />}
                    onLeftIconButtonTouchTap={this.showMenu}/>
                <Menu show={this.props.homePageData.show} />
                <Route path={`${this.props.match.url}/scheduler`} component={Scheduler} />
                <Footer />
            </div>
        )
    }
}

const Logged = (props) => (
    <IconMenu
        {...props}
        iconButtonElement={<IconButton> <MoreVertIcon /> </IconButton>}
        targetOrigin={{
                horizontal: 'right',
                vertical: 'top'
            }}
            anchorOrigin={{
                horizontal: 'right',
                vertical: 'top'
            }}>
        <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" />
    </IconMenu>
);
Logged.muiName = 'IconMenu';

export default Home