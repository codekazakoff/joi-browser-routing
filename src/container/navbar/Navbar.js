import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./navar.css";
class Navbar extends Component {
  render() {
    return (
      <>
        <header className="header">
          <div className="container">
            <nav className="nav">
              <ul className="nav__items">
                <li className="nav__item">
                  <Link to="/" className="nav__link">
                    Home
                  </Link>
                </li>
                <li className="nav__item">
                  <Link to="/sign-in" className="nav__link">
                    Sign In
                  </Link>
                </li>
                <li className="nav__item">
                  <Link to="/sign-up" className="nav__link">
                    Sign Up
                  </Link>
                </li>
                <li className="nav__item">
                  <Link to="/form" className="nav__link">
                    Form
                  </Link>
                </li>
                <li className="nav__item">
                  <Link to="/users" className="nav__link">
                    Users
                  </Link>
                </li>
                <li className="nav__item">
                  <Link to="/add" className="nav__link">
                    Add User
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>
      </>
    );
  }
}

export default Navbar;
