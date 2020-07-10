import React, { Component } from "react";
import { BarChart } from "react-d3-components";
import { isEmpty } from 'lodash'


// d3.svg.axis()
class MyBarChart extends Component {


    render() {
        const { setData } = this.props
        console.log(setData);
        return (
            !isEmpty(setData) && <BarChart
                data={setData}
                width={300}
                height={300}
                margin={{ top: 10, bottom: 50, left: 50, right: 10 }}
            />
        );
    }

}
export default MyBarChart


