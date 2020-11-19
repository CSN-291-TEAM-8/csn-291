import React, { useContext,useState } from "react";
import { toast } from "react-toastify";
import { connect } from "../../utils/fetchdata";
import { FormWrapper } from "./Login";
import modify from "../../hooks/Modify";
import { UserContext } from "../../context/UserContext";

import logo from "../../assets/navlogo.png";


const Signup = ({ login }) => {
  const { setUser } = useContext(UserContext);
  const email = modify("");
  const [Sign,ShowSignUpButton] = useState(false);
  const [OTPS,showOTPInput] = useState(false);
  const [OTPB,showOTPButton] = useState(true);
  const fullname = modify("");
  const username = modify("");
  const password = modify("");
  const OTP = modify("");

  const OTPclick = async(e)=>{    
    if(!email.value||!email.value.includes("iitr.ac.in")){
      return toast.error("Please use your institute email id");
    }
    try{
      await connect("/auth/OTPrequest", { email:email.value });
    }
    catch(err){
      return toast.error(err.message);
    }
    showOTPButton(false);
    showOTPInput(true);    
    return toast.success("Enter the 6 digit OTP sent to your email");
  }
  const OTPinput = (e)=>{
   // OTP.onChange(e);
    if(document.getElementById('OTP').value.toString().length===6){
      ShowSignUpButton(true);
    }
    else{
      ShowSignUpButton(false);
    }
    return;
  }
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
    if(username.value==='highlight'){
        return toast.error(
            "This username is not available"
        )
    }
    if(email.value.indexOf("iitr.ac.in")===-1){
      return toast.error(
        "Kindly use your institute email id"
      )
    }

    const body = {
      email: email.value,
      password: password.value,
      username: username.value,
      fullname: fullname.value,
      OTP:OTP.value,
      isStudent:true,
      hostel:"Ravindra bhawan",
      institute_id:"19114042",
    };

    try {
      const { token } = await connect("/auth/signup", { body });
      localStorage.setItem("accesstoken", token);
    } catch (err) {
      return toast.error(err.message);
    }

    const user = await connect("/auth");
    setUser(user.data);
    localStorage.setItem("userdetail", JSON.stringify(user.data));

    fullname.setValue("");
    username.setValue("");
    password.setValue("");
    email.setValue("");
    OTP.setValue("");
  };

  return (
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
        {OTPB&&
        <input
          type="button"
          style={{background:"#00FF10",fontWeight:"bold",color:"#000000",cursor:"pointer"}}
          value="Request OTP"
          onClick={OTPclick}         
        />
        
      }
      {OTPS&&
        <input 
          type="number" 
          min="100000"
          id="OTP"
          placeholder="6-digit OTP"          
          max="999999"
          onChange={OTP.onChange}
          onInput={OTPinput}/>          
      }
      {Sign&&       
        <input type="submit" value="Sign up" className="signup-btn" />
      }
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