import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';



class Register extends Component {

    state = { email: "", password: "", redirectToHome: false, isError: false, isLoggedIn: false };

    register = () => {
        this.setState({ isError: false });
        axios
            .post("http://localhost:5000/register", {
                email: this.state.email,
                password: this.state.password
            })
            .then(res => {
                if (res.status === 201) {
                    this.setState({ redirectToHome: true });
                    this.props.setUser({
                        email: this.state.email,
                        password: this.state.password
                    });
                } else {
                    this.setState({ isError: true });
                    console.log(`error code : ${res.status}`);
                }
            })
            .catch(err => {
                this.setState({ isError: true });
                console.log(err);
            });
    };
    render() {
        if (this.state.redirectToHome) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <h1>Register page</h1>
                Email
                <input
                    onChange={evt => this.setState({ email: evt.target.value })}
                    type="email"
                />
                <br />
                Password
                <input
                    onChange={evt => this.setState({ password: evt.target.value })}
                    type="password"
                />
                <br />
                {this.state.isError ? (<p style={{ color: "red" }}>Register error</p>) : ("")}
                <button onClick={this.register}>
                    Register
                </button>
            </div>
        )
    }
}

export default Register;