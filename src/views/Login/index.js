import React from "react";
import {Row, Col, Input, Button, Alert} from "antd";
import Cookies from 'js-cookie';

export default class Login extends React.Component{
    state={
        username: "",
        pwd: "",
        error: false
    }
    usernameChange(e){
        this.setState({username: e.target.value})
    }
    passwordChange(e){
        this.setState({pwd: e.target.value})
    }
    submit = () => {
        // ask the server if the username and the password are valid
        fetch("http://localhost:3001/login", {method: "POST",
            body: JSON.stringify(this.state), 
            headers: new Headers({
            'Content-Type': 'application/json'})
        }).then(response => response.json()).then( res => {
            if(res.result === "true"){
                // 15 mins
                var inFifteenMinutes = new Date(new Date().getTime() + 15 * 60 * 1000);
                Cookies.set('token', res.token, {
                    expires: inFifteenMinutes
                });    
                this.props.setlogin(true);
            } else {
                this.setState({error: true});
            }
        })        
    }
    render(){
        return (
            <Row>
                <Col md={8} offset={8}>
                    Username: <Input type="text" value={this.state.username} onChange={this.usernameChange.bind(this)}/>
                    Password: <Input type="password" value={this.state.pwd} onChange={this.passwordChange.bind(this)}/>
                    {this.state.error? <Alert message="Your username or password is wrong" type="error" />: null}
                    <Button type="primary" onClick={this.submit.bind(this)}>Login</Button>
                </Col>
            </Row>
        )
    }
}