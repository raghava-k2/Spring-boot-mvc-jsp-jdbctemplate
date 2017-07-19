import React, {Component} from 'react'
import CircularProgress from 'material-ui/CircularProgress';
import './loading.css'

class Loading extends Component {
    render() {
        let className = 'activeLoading'
        if (!this.props.show) {
            className = 'passiveLoading'
        }
        return (
            <div className={className}>
                {this.props.show && <CircularProgress
                    size={60}
                    thickness={7}
                    style={{
                    display: 'table-cell',
                    'verticalAlign': 'middle'
                }}/>}
            </div>
        )
    }
}
export default Loading