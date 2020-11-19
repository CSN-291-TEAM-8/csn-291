import React, { useContext} from "react";
import { toast } from "react-toastify";
import styled ,{keyframes} from "styled-components";
import { connect } from "../../utils/fetchdata";
import useInput from "../../hooks/Modify";
import { UserContext } from "../../context/UserContext";
import logo from "../../assets/navlogo.png";

const FormStyle = keyframes`
from{
  transform:scale(-1,1);
}
to{
  transform:scale(1,1);
}
`;
export const FormWrapper = styled.div`
  background-color: ${(props) => props.theme.white};
  padding: 1rem;
  width: 350px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin: 10rem auto;
  margin-right: 250px;
  text-align: center;
  padding: 2rem 0;
  float:right;
  animation: ${FormStyle} 1s linear;
  img {
    margin-bottom: 1.5rem;
  }
  input {
    display: block;
    margin: 0 auto;
    margin-bottom: 1rem;
    padding: 0.5rem 1.2rem;
    background: ${(props) => props.theme.white};
    border: 1px solid ${(props) => props.theme.borderColor};
    font-family: "Fira Sans", sans-serif;
    font-size: 1rem;
    border-radius: 4px;
    width: 85%;
  }
  input[type="submit"] {
    background-color: ${(props) => props.theme.blue};
    color: ${(props) => props.theme.white};
    border: 1px solid ${(props) => props.theme.blue};
    cursor: pointer;
  }
  .logo{
    width:200px;
    height:auto;
    margin-bottom:0.3rem;
  }
  p {
    margin-top: 2rem;
  }
  .info{
    font-size:17px;
    margin-bottom:12px;
    font-weight:bold;
  }
  span {
    color: ${(props) => props.theme.blue};
    cursor: pointer;
  }
`;
export const TitleInfo = styled.div`
  float:left;
  .intro{
  margin-top:15rem;
  margin-left:150px;
  font-size:20px;
  }
  h1{
    font-weight:bold;
    color: ${(props) => props.theme.blue};
  }
`;

const Login = ({ signup }) => {
  const { setUser } = useContext(UserContext);
  const email = useInput("");
  const password = useInput("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.value || !password.value) {
      return toast.error("Please fill in both the fields");
    }

    const body = { email: email.value, password: password.value };

    try {
      const { token } = await connect("/auth/login", { body });
      localStorage.setItem("accesstoken", token);
    } catch (err) {
      return toast.error(err.message);
    }

    const user = await connect("/auth/me");
    localStorage.setItem("userdetail", JSON.stringify(user.data));
    setUser(user.data);
    toast.success("Login successful");

    email.setValue("");
    password.setValue("");
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
      <img className="logo" src={logo} alt="logo" />
      <h2 className="info">Login to view all complaints lodged!</h2>
      <form>        
        <input
          type="email"
          placeholder="yourgmail@..iitr.ac.in"
          value={email.value}
          onChange={email.onChange}
        />
        <input
          type="password"
          placeholder="yoursecretpassword"
          value={password.value}
          onChange={password.onChange}
        />
        <input type="submit" value="Log In" className="login-btn" />
      </form>

      <div>
        <p>
          Don't have an account? <span onClick={signup}>Sign up</span>
        </p>
      </div>
    </FormWrapper>
    </div>
  );
};

export default Login;