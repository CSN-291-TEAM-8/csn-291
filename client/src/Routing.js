import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// main route
import Nav from "./components/utility/Nav";
import Container from "./styles/Container";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Highlight from "./components/posts/Highlight";
//import Notification from "./components/notice/Notification";
import Post from "./components/posts/Post";
import EditProfile from "./components/dashboard/EditProfile";
import createNew from './components/new/CreateNew';

const Routing = () => {
  return (
    <Router>
      <Nav />
      <Container>
        <Switch>
          <Route path="/highlight" component={Highlight} />
          <Route path="/accounts/new" component={createNew} />
          <Route path="/p/:postId" component={Post} />
          <Route path="/accounts/edit" component={EditProfile} />          
          <Route path="/:username" component={Dashboard} />
          <Route path="/" component={Home} />
        </Switch>
      </Container>
    </Router>
  );
};

export default Routing;