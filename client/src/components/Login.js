import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


class Login extends Component {

    state = { email: "", password: "", redirectToHome: false, isError: false };

    login = () => {
        this.setState({ isError: false })
        axios.post("http://localhost:5000/login", {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            if (res.status === 200) {
                //res.data is user
                this.setState({ redirectToHome: true });
                this.props.setUser(res.data)
            }
            else {
                this.setState({ isError: true })
                console.log(`error code : ${res.status}`);
            }
        }).catch(err => {
            this.setState({ isError: true })
            console.log(err);
        })
    }
    render() {
        if (this.state.redirectToHome) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <h1>Login page</h1>
                Email: <input onChange={evt => this.setState({ email: evt.target.value })} type="email"></input>
                <br />
                Password: <input onChange={evt => this.setState({ password: evt.target.value })} type="password"></input>
                <br />
                {this.state.isError ? <p style={{ color: "red" }}>Password or Email adress is incorrect</p> : ""}
                <button onClick={this.login}>Login</button>
            </div>
        )
    }
}

export default Login;