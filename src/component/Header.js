import React, { Component } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Header extends Component {
  render() {
    return (
      <div>
        <nav
          className="navbar navbar-expand-sm navbar-dark mb-3 py-0"
          style={{ backgroundColor: "#0fc5d0" }}
        >
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">
                Olive Employee List
              </a>
            </div>
            <ul className="nav navbar-nav">
              <li className="active">
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Page 1</a>
              </li>
              <li>
                <a href="#">Page 2</a>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li style={{ marginRight: "1rem" }}>
                <a href="#">
                  <FontAwesomeIcon icon="coffee" />
                  SignUp
                </a>
              </li>
              <li>
                <a href="#">
                  <FontAwesomeIcon icon="apple-alt" />
                  Login
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
export default Header;
