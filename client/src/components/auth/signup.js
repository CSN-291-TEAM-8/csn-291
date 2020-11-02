import React, { useState } from "react";
import Navbar from './navbar_auth.jsx'
const SignUp = () => {
    const [user,setState] = useState({
        username :"",
        emailaddress :"",
        password :""
    });

    const handleChange = (e) => {
        const {name,value} = e.target;

        setState((preValue) => {
            return {
                ...preValue,
                [name] : value
            };
            
        });
    }

    const onSubmit = (e) => {
        e.preventDefult();
    }

    
        return (
            <>
            <Navbar/>
            <div className="d-flex justify-content-center mt-5">
                <form className="needs-validation">
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Enter Username" 
                        name = "username"
                        onChange = {handleChange}
                        value = {user.username}
                        required/>
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input 
                        type="email" 
                        className="form-control" 
                        placeholder="Enter email"
                        name = "emailaddress"
                        onChange = {handleChange}
                        value = {user.emailaddress}
                        required/>
                    </div>

                    <div className="form-group">
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

                    <button type="submit" className="btn btn-primary btn-block" onClick={onSubmit}>Sign Up</button>
                    <p className="forgot-password text-center mt-2">
                        Already registered? <a href="#"><u>sign in</u></a>
                    </p>
                </form>
            </div>
            </>
        );
    
}

export default SignUp;