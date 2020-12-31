import React  from 'react';
import {Link, NavLink } from 'react-router-dom';


const Nav = () =>{
 return (
  <>
    <nav className="navbar navbar-expand-sm navbar-dark bg-info">
    <Link className="navbar-brand" to="/react">React Crud</Link >
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item ">
          <NavLink className="nav-link"  exact to="/">Home</NavLink>
        </li>
        <li className="nav-item ">
          <NavLink className="nav-link"  exact to="/projects">Project</NavLink>
        </li>
      </ul>
    </div>
  </nav>

  </>
 );
};

export default Nav;