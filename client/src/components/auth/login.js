import React, { useState } from "react";
import {Redirect,} from 'react-router-dom';
import Navbar from "./navbar_auth.jsx";
const Login = ()=> {
    
    const [user,setState] = useState({
        username : "",
        password : "",
        loggedIn : false
    });

    const handleChange = (e) => {
        
        
        const {name,value} = e.target;

        setState((preValue) => {
            //console.log(preValue);
            return {
                ...preValue,
                [name] : value
            };
        });
    }

    const onsubmit = (e) => {
        e.preventDefault();
        
        if(user.username==="shub" && user.password==="123"){
            setState({
                loggedIn : true
            });
        }
    };

    
    return (
        <>
          <Navbar/> 
        <div className="d-flex justify-content-center mt-5">
            <form onSubmit={onsubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter username" 
                        name = "username"
                        onChange = {handleChange}
                        value = {user.username}
                        required/>       
                </div>

                <div className ="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Enter password" 
                        name = "password"
                        onChange = {handleChange}
                        value = {user.password}
                        required/>
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input 
                            type="checkbox" 
                            className="custom-control-input" 
                            id="customCheck1" 
                            name = "remember-me"

                            />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <div>
                <button type="submit" className="btn btn-primary btn-block" onClick={onsubmit}>Submit</button>
                {(user.loggedIn)?<Redirect to="/home"/>:<Redirect to ="/sign-in"/>}
                </div>
                <p className="forgot-password text-center mt-2">
                    <a href="#"><u>Forgot password?</u></a>
                </p>
            </form>
        </div>
        </>
    );
    
}

export default Login;