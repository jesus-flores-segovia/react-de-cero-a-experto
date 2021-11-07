import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { logout } from '../../actions/authActions';
import { AuthContext } from '../../auth/AuthContext'

export const Navbar = () => {

  const {user, dispatch} = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    history.replace("/login");
  };

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
        <ul className="navbar-nav mb-2 mb-lg-0 align-items-center">
        {user.name &&
          <span className="nav-item text-info me-3">You're logged as {user.name}</span>
        }
          <button type="button" className="btn btn-danger" style={{color:"white", textDecoration:"none"}} onClick={handleLogout}>
            Logout
          </button>
        </ul>
      </div>
    </div>
  </nav>
  )
}