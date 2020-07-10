import React, { Component } from "react";
import ChartComponent from './chartComponent'
import { map } from 'lodash'
class Charts extends Component {


    render() {
        const { settings } = this.props

        return (

            map(settings.type, (type, k) =>
                <div key={k}>
                    <ChartComponent type={type} />
                </div>)


        )
    }

}
export default Charts

