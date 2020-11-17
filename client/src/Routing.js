import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// main route
import Nav from "./components/utility/Nav";
import Container from "./styles/Container";
import Home from "./components/home/home";
import Dashboard from "./components/dashboard/dashboard";
import Highlight from "./components/posts/highlight";
import Notice from "./components/notice/notification";
import DetailedPost from "./components/posts/post";
import EditProfile from "./components/dashboard/EditProfile";
import NewPost from './components/new/create';

const Routing = () => {
  return (
    <Router>
      <Nav />
      <Container>
        <Switch>
          <Route path="/highlight" component={Highlight} />
          <Route path="/accounts/new" component={NewPost} />
          <Route path="/p/:postId" component={DetailedPost} />
          <Route path="/accounts/edit" component={EditProfile} />
          <Route path="/accounts/notice" component={Notice} />
          <Route path="/:username" component={Dashboard} />
          <Route path="/" component={Home} />
        </Switch>
      </Container>
    </Router>
  );
};

export default Routing;