import React from 'react'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand ms-2" href="/">
        <img className="me-2" src="/assets/icons/icons8-hulk-48.png" width="30" height="30" alt="heroes"/>
            Heroes
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <NavLink 
            activeClassName="active"
            className="nav-link" 
            exact
            to="/marvel"
        >
            Marvel Comics
        </NavLink>    

        <NavLink 
            activeClassName="active"
            className="nav-link" 
            exact
            to="/dc"
        >
            DC Comics
        </NavLink>

        <NavLink 
            activeClassName="active"
            className="nav-link" 
            exact
            to="/search"
        >
            Search
        </NavLink>
      </ul>
    </div>
    <div className="collapse navbar-collapse justify-content-end" id="navbarText">
      <ul className="navbar-nav mb-2 mb-lg-0">
        <button type="button" className="btn btn-danger">
            <NavLink 
                activeClassName="active"
                className="nav-link" 
                exact
                to="/logout"
                style={{color:"white"}}
            >
                Logout
            </NavLink>
            </button>
      </ul>
    </div>
  </div>
</nav>
    )
}