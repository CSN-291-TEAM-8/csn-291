import React, { useState } from "react";
import Signup from "./signup";
import Login from "./login";

const Auth = () => {
  const [auth, setAuth] = useState(0);

  const login = () => setAuth(0);
  const signup = () => setAuth(1);

  if (auth) {
    return <Signup login={login} />;
  }
  else {
    return <Login signup={signup} />;
  }
};

export default Auth;