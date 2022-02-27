import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import '../styles/navbar.css';
class Navbar extends Component {
  state = {};
  render() {
    const { user } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
        <div className="container nav" style={{fontSize:25+'px',fontFamily:'Courgette,cursive'}}>
          <Link  className="nav-item nav-link " to="/" style={{ color: "#d2f5e3" }}>
       Cook<i className='fas fa-book-open  mx-1' style={{color:'#FFA500'}} ></i>Book
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            <li className="nav-item navbutton">
                <NavLink className="nav-item nav-link" to="/">
                 | Home |
                </NavLink>
              </li>
                 {user && (
                   <React.Fragment>
              <li className="nav-item navbutton">
                <NavLink className="nav-item nav-link" to="/myfavorties">
                 My Favorites Recipes |
                </NavLink>
              </li>
           
                <li className="nav-item navbutton">
                  <NavLink className="nav-item nav-link" to="/my-recipes">
                    My cookbook |
                  </NavLink>
                </li>
                </React.Fragment>
              )}
            </ul>
            <ul className="navbar-nav ml-auto">
              {!user && (
                <React.Fragment>
                  <li className="nav-item navbutton">
                    <NavLink className="nav-item nav-link" to="/signin">
                      Signin 
                    </NavLink>
                  </li>
                  <li className="nav-item navbutton">
                    <NavLink className="nav-item nav-link" to="/signup">
                      Signup
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                  <li className="nav-item navbutton">
                    <NavLink className="nav-item nav-link" to="/logout">
                      Logout
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
