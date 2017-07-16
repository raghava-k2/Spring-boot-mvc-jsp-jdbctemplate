import React, {Component} from 'react'
import {Table} from 'react-bootstrap'
import util from './util'
class DataGrid extends Component {
    constructor(props, context, queue) {
        super(props, context, queue)
        this.checkGridProp()
    }
    checkGridProp() {
        if (!this.props.hasOwnProperty('columns')) 
            throw new Error('Missing Columns property')
        else if (!this.props.hasOwnProperty('rows')) 
            throw new Error('Missing Rows property')
        return true
    }
    createColumns() {
        if (!this.props.columns || !Array.isArray(this.props.columns)) 
            throw new TypeError('Either columns attribute is undefined or not an Array')
        else {
            let tr = util.creatElement({
                id: this.props.gridId + '_tr',
                type: 'tr'
            })
            this
                .props
                .columns
                .forEach((column, i) => {
                    let th = util.creatElement({
                        id: this.props.gridId + '_th' + i,
                        key: this.props.gridId + '_th' + i,
                        type: 'th'
                    })
                    if (column['type']) {
                        th = util.appedChild(th, util.creatElement(column))
                    } else {
                        th = util.appedChild(th, util.creatElement('span')(column, column.label))
                    }
                    tr = util.appedChild(tr, th)
                }, this)
            return util.creatElement('thead')({
                id: this.props.gridId + '_thead'
            }, tr)
        }
    }
    createRows() {
        return ''
    }
    render() {
        return (
            <Table striped bordered condensed hover responsive>
                {this.createColumns()}
                {this.createRows()}
            </Table>
        )
    }
}
export default DataGrid