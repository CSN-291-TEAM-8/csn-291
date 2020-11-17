import React, { useContext } from "react";
import { toast } from "react-toastify";
import { connect } from "../../utils/fetchdata";
import { FormWrapper } from "./login";
import modify from "../../hooks/modify";
import { UserContext } from "../../context/UserContext";

import logo from "../../assets/logo.png";
const Signup = ({ login }) => {
  const { setUser } = useContext(UserContext);
  const email = modify("");
  const fullname = modify("");
  const username = modify("");
  const password = modify("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.value || !password.value || !username.value || !fullname.value) {
      return toast.error("Please fill in all the fields");
    }
   

    const re = /^[a-z0-9]+$/i;
    if (re.exec(username.value) === null||username.value.length<6) {
      return toast.error(
        "The username can only contain letter and digits and should be atleast 6 character long, please try again"
      );
    }
    if(password.value.length<6){
        return toast.error(
            "Password should be minimum of 6 characters in length"
        )
    }
    if(username.value=='highlight'){
        return toast.error(
            "This username is not available"
        )
    }

    const body = {
      email: email.value,
      password: password.value,
      username: username.value,
      fullname: fullname.value,
    };

    try {
      const { token } = await connect("/auth/signup", { body });
      localStorage.setItem("accesstoken", token);
    } catch (err) {
      return toast.error(err.message);
    }

    const user = await connect("/auth/me");
    setUser(user.data);
    localStorage.setItem("userdetail", JSON.stringify(user.data));

    fullname.setValue("");
    username.setValue("");
    password.setValue("");
    email.setValue("");
  };

  return (
    <FormWrapper onSubmit={handleLogin}>
      <img src={logo} alt="logo" />

      <form>
        <input
          type="email"
          placeholder="Email"
          value={email.value}
          onChange={email.onChange}
        />
        <input
          type="text"
          placeholder="Full Name"
          value={fullname.value}
          onChange={fullname.onChange}
        />
        <input
          type="text"
          placeholder="Username"
          value={username.value}
          onChange={username.onChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password.value}
          onChange={password.onChange}
        />
        <input type="submit" value="Sign up" className="signup-btn" />
      </form>

      <div>
        <p>
          Already have an account? <span onClick={login}>Login</span>
        </p>
      </div>
    </FormWrapper>
  );
};

export default Signup;