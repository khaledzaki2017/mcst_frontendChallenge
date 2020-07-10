import React from "react";
import { Row, Col, Input, Button, Alert } from "antd";
import Cookies from 'js-cookie';
import { withRouter } from 'react-router';
import "../../styles/loginPage.css"
import Redirect from "react-router-dom/Redirect";
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            pwd: "",
            error: false
        }
    }

    // componentDidMount() {
    //     const location = {
    //         pathname: '/login',
    //         state: { from: { pathname: '/' } }
    //     }
    //     this.props.history.push(location);


    // }
    usernameChange(e) {
        this.setState({ username: e.target.value })
    }
    passwordChange(e) {
        this.setState({ pwd: e.target.value })
    }
    submit = () => {
        // ask the server if the username and the password are valid
        fetch("http://localhost:3001/login", {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(response => response.json()).then(res => {
            console.log("hereeeeeeeeeeee", res);
            if (res.result === "true") {
                // 10 mins
                var intenMinutes = new Date(new Date().getTime() + 10 * 60 * 1000);
                Cookies.set('token', res.token, {
                    expires: intenMinutes
                });
                this.props.setlogin(true);
                this.props.history.push('/')
            }

            else {
                this.setState({ error: true });
            }
        })

    }
    render() {
        return (
            <div class="wrapper fadeInDown">
                <div id="formContent">
                    {/* <!-- Tabs Titles --> */}
                    <h2 class="active"> Sign In </h2>
                    {/* <!-- Icon --> */}
                    <div class="fadeIn first">
                        <img src="https://pbs.twimg.com/profile_images/1178183552481005568/FtNUU9Bs_400x400.jpg" id="icon" alt="MCST LOGO" />
                    </div>
                    {/* <!-- Login Form --> */}

                    <Row>
                        <Col md={8} offset={8}>
                            Email: <Input class="fadeIn second" type="email" value={this.state.username} onChange={this.usernameChange.bind(this)} />
                            Password: <Input class="fadeIn third" type="password" value={this.state.pwd} onChange={this.passwordChange.bind(this)} />
                            {this.state.error ? <Alert message="Your username or password is wrong" type="error" /> : null}
                            <Button class="fadeIn fourth" type="primary" onClick={this.submit.bind(this)}>Login</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
export default withRouter(Login)
