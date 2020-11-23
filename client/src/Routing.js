import React,{Suspense} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// main route
import Nav from "./components/utility/Nav";
import Container from "./styles/Container";
import Home from "./components/home/Home";
import Dashboard from "./components/dashboard/Dashboard";
import Highlight from "./components/posts/Highlight";
import Notification from "./components/notice/Notification";
import Loader from "./components/utility/Loader";
import Post from "./components/posts/Post";
import EditProfile from "./components/dashboard/EditProfile";
import CreateNew from './components/new/CreateNew';
import ReportPost from "./components/posts/ReportPost";

const Routing = () => {
  return (
    <Router>
      <Suspense fallback={Loader}>
      <Nav />
      <Container>
        <Switch>
          <Route path="/highlight" component={Highlight} />
          <Route path="/accounts/new" component={CreateNew} />
          <Route path="/accounts/notifications" component={Notification} />
          <Route path="/p/:postId" component={Post} />
          <Route path="/report/:postId" component={ReportPost}/>
          <Route path="/accounts/edit" component={EditProfile} />          
          <Route path="/:username" component={Dashboard} />
          <Route path="/" component={Home} />
        </Switch>
      </Container>
      </Suspense>
    </Router>
  );
};

export default Routing;