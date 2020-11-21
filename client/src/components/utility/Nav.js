import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ThemeContext } from "../../context/ThemeContext";
import NewPost from "./NewPost";
import Search from "./Search";
import { UserContext } from "../../context/UserContext";
import navlogo from "../../assets/navlogo.png";
import { HomeIcon, HighlightIcon, BellIcon } from "../../Icons";

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: ${(props) => props.theme.white};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding: 1rem 0;
  z-index: 10;
  .nav-logo {
    position: relative;
    top: 6px;
  }
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    width: 930px;
  }
  ul {
    display: flex;
    position: relative;
    top: 3px;
    list-style-type: none;
  }
  li {
    margin-left: 1rem;
  }
  .nav-logo{
    width:200px;
  }
  @media screen and (max-width: 970px) {
    nav {
      width: 90%;
    }
  }
  @media screen and (max-width: 670px) {
    input {
      display: none;
    }
    ul{
      position:fixed;
      top:calc(100% - 42px);
      background-color: ${(props) => props.theme.white};
      border-top: 1px solid ${(props) => props.theme.borderColor};
      justify-content:space-between;
      width:100%;
      padding:2px 5px;
      left:0;
      height:40px;
    }    
      
    
    .nav-logo{
      width:200px;
      margin:auto;
    }
  }
`;

const Nav = () => {
  const { user } = useContext(UserContext);
  const {theme} = useContext(ThemeContext);

  return (
    <NavWrapper>
      <nav>
        <Link to="/">
          <img className="nav-logo" src={navlogo} alt="logo" />
        </Link>
        <Search />
        <ul className="navlink" style={{display:"flex",alignItems:"center"}}>
          <li>
            <Link to="/" >
              <HomeIcon activeClassName="active" theme={theme}/>
            </Link>
          </li>
          <li>
            <NewPost activeClassName="active" theme={theme}/>
          </li>
          <li>
            <Link to="/highlight">
              <HighlightIcon activeClassName="active" theme={theme}/>
            </Link>
          </li>          
          <li>
          <Link to="/accounts/notifications">
            <BellIcon activeClassName="active" theme={theme}/>
            </Link>
          </li>
          <li>
            <Link to={`/${user.username}`}>
              <img
                style={{
                  width: "24px",
                  height: "24px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
                src={user.avatar}
                alt="avatar"
              />
            </Link>
          </li>
        </ul>
      </nav>
    </NavWrapper>
  );
};

export default Nav;