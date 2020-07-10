import React, { Component } from "react";
import * as AllCharts from './container'
import { get, isEmpty, map } from 'lodash'
import { connect } from "react-redux"


class MiddleComponent extends Component {

    setData(data) {
        const list = map(data, (v, k) => {
            return {
                x: k,
                y: v
            }

        })
        let datalist =
        {
            label: 'admin_Data',
            values: list
            // values: [{ x: 'test', y: 3 }]

        }
            ;
        return datalist
    }
    render() {
        const { type, data } = this.props
        const Chart = get(AllCharts, type, "")
        return (
            !isEmpty(data) &&
            <div className="container">
                <Chart setData={this.setData(data.stats)} />
            </div>


        )


    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        data: state.chartData.Data
    }
}
const ChartComponent = connect(mapStateToProps, null)(MiddleComponent);
export default ChartComponent

