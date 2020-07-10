import React, { Component } from "react";
import { PieChart } from "react-d3-components";
import { isEmpty } from 'lodash'


// d3.svg.axis()
class MyPieChart extends Component {

    render() {
        const { setData } = this.props
        console.log(setData);
        return (
            !isEmpty(setData) && <PieChart
                data={setData}
                width={200}
                height={200}
                margin={{ top: 10, bottom: 10, left: 50, right: 10 }}
            />
        );
    }

}


export default MyPieChart
