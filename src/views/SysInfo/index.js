import React from "react";
import axios from "axios"
import Charts from "../Charts/index"
import { setData } from '../../actions/setData';
import { connect } from 'react-redux';
import { Button } from "antd"
class Info extends React.Component {

    settings = () => {
        const sett = {
            type: ["MyPieChart", "MyBarChart"],
        }
        return sett
    }
    getData = () => {
        return (axios.get('http://localhost:3001/admin')
            .then(resp => {
                const d = resp.data
                this.props.setData(d)
            })
            .catch(error => {
                console.log(error);
            }))
    }
    render() {

        return (
            <div>
                <h2>System info</h2>
                <Charts settings={this.settings()} />
                <Button onClick={this.getData.bind(this)}>Show Stats</Button>

            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setData: (d) => {
            dispatch(setData(d))
        }
    }
}
const SysInfo = connect(null, mapDispatchToProps)(Info);
export default SysInfo