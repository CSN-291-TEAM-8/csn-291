import React, { useContext } from "react";
import { toast } from "react-toastify";
import { connect } from "../../utils/fetchdata";
import { FormWrapper } from "./Login";
import {TitleInfo} from "./Login";
import modify from "../../hooks/Modify";
import { UserContext } from "../../context/UserContext";

import logo from "../../assets/navlogo.png";
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
    if (re.exec(username.value) === null) {
      return toast.error(
        "The username can only contain letter and digits"
      );
    }
    if(username.value.length<6){
       return toast.error(
        "username should be atleast 6 character long, please try again"
       )
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
    if(email.value.indexOf("iitr.ac.in")==-1){
      return toast.error(
        "Kindly use your institute email id"
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
    <div>
      <TitleInfo>
        <div className="intro">
        <h1>Complain Lodger</h1>
        <p>The place where everyone comes with hope of resolving their complains</p>
        </div>
      </TitleInfo>
    <FormWrapper onSubmit={handleLogin}>
      <img src={logo} className="logo" alt="logo" />
      <h2 className="info">Create an account to resolve your complaints easily!</h2>
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
    </div>
  );
};

export default Signup;