import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

  
  return (
    <div>
      <nav className="navbar mb-3 bg-dark py-2 px-4 navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3" to="/">
            Navbar
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse fs-5" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
            
            </ul>
            <div className="d-flex fs-4" role="search" >
              <Link className="btn btn-outline-success mx-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline-success" to="/register">
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
