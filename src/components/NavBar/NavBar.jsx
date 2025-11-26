import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
      
        <div className="logo">
          <Link to="/">Kirby</Link>
        </div>

     
        <ul className="nav-links">
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/about-me">About Me</NavLink></li>
          <li><NavLink to="/projects">Projects</NavLink></li>
          <li><NavLink to="/skills">Skills</NavLink></li> 
          <li><NavLink to="/contact">Contact</NavLink></li> 
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
