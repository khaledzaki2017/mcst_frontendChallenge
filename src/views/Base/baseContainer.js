import React from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import Frame from '../Frame/index';
import Login from '../Login/index';
import Welcome from '../Welcome/index';
import { login } from '../../actions/auth';
class Base extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showLogin: true,
            showWelcome: true
        }
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.login) {
            this.setState({ showWelcome: false, showLogin: false });
        } else {
            this.setState({ showWelcome: false, showLogin: true });
        }
    }
    componentWillMount() {
        let token = Cookies.get("token");
        if (!token) {
            this.setState({ showWelcome: false })
            this.props.setlogin(false);
            return;
        }
        let data = { token: token };
        // ask the server if the token is valid
        fetch("http://localhost:3001/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => response.json()).then(res => {
            if (res.result === "true") {
                this.setState({ showWelcome: false, showLogin: false });
                this.props.setlogin(true);
            } else {
                this.setState({ showWelcome: false, showLogin: true });
                this.props.setlogin(false);
            }
        })
    }
    render() {
        return (<div style={{ height: "100%" }}>
            {this.state.showWelcome ? <Welcome /> : this.state.showLogin ? <Login {...this.props} /> : <Frame {...this.props} />}
        </div>)
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        login: state.auth.login
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setlogin: (flag) => {
            dispatch(login(flag))
        }
    }
}
const BaseContainer = connect(mapStateToProps, mapDispatchToProps)(Base);
export default BaseContainer