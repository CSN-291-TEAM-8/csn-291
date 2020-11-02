import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, NavLink } from "react-router-dom";

import Login from "./components/auth/login.js";
import SignUp from "./components/auth/signup.js";
import Home from "./components/home/home.js";
import Dashboard from "./components/dashboard/dashboard.js"
function App() {
  return (
  <Router>
    <div className="App">
      <div>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path="/sign-in" component={Login} />
            <Route exact path="/sign-up" component={SignUp} />
            <Route exact path="/home" component={Home}/>
            <Route exact path="/dashboard" component={Dashboard}/>
          </Switch>
      </div>
      
    </div>
  </Router>
  );
}

export default App;