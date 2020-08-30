import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Logout from './components/Logout'

class App extends Component {
  state = { user: null};
  setUser = user =>{
    this.setState({user : user});
  }
  render(){
    return (
      <div className="App">
     <BrowserRouter>
          <Link to="/">Home</Link>
          {!this.state.user ? <Link to="/Login">Login</Link> : "" }
          {!this.state.user ? <Link to="/Register">Register</Link> : "" }
          {this.state.user ? <Link to="/Page1">Page1</Link> : "" }
           {this.state.user ? <Link to="/Page2">Page2</Link> : "" }
           {this.state.user ? <Link to="/Logout">Logout</Link> : "" }
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Login" render= { () => <Login setUser={this.setUser}/>} />
            <Route exact path="/Register" render= { () => <Register setUser={this.setUser}/>} />
            <Route exact path="/Page1" component={Page1} />
            <Route exact path="/Page2" component={Page2} />
            <Route exact path="/Logout" render= { () => <Logout setUser={this.setUser}/>} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
