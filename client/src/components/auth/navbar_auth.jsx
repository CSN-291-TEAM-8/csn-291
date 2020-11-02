import React from 'react';
import {NavLink} from 'react-router-dom';
const Navbar = () => {
    return (
        <>
        <div className="container-fluid nav-bg">
        <div className="row">
          <div className="col-12 mx-auto">
                   
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item active">
                    <NavLink exact activeClassName="menu-active" className="nav-link" to="/sign-in">Login <span className="sr-only">(current)</span></NavLink>
                  </li>
                  <li className="nav-item active">
                    <NavLink exact activeClassName="menu-active" className="nav-link" to="/sign-up">Sign up <span className="sr-only">(current)</span></NavLink>
                  </li>
                                
                </ul>
                                
              </div>
            </nav>
          </div>
        </div>
      </div>
      </>
      
    );
}
export default Navbar;
