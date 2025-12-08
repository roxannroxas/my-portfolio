import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "./AppNav.css";

const AppNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-container">
        
          <div className="logo">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Kirby<span className="logo-dot">.</span>
            </Link>
          </div>

          <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>

          <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
            <li><NavLink to="/" end onClick={() => setMenuOpen(false)}>Home</NavLink></li>
            <li><NavLink to="/about-me" onClick={() => setMenuOpen(false)}>About Me</NavLink></li>
            <li><NavLink to="/projects" onClick={() => setMenuOpen(false)}>Projects</NavLink></li>
            <li><NavLink to="/skills" onClick={() => setMenuOpen(false)}>Skills</NavLink></li> 
       
            <li>
              <NavLink to="/contact" className="nav-cta" onClick={() => setMenuOpen(false)}>
                Contact Me
              </NavLink>
            </li> 
          </ul>

        </div>
      </nav>
      

      <div 
        className={`nav-overlay ${menuOpen ? "open" : ""}`} 
        onClick={() => setMenuOpen(false)}
      ></div>
    </>
  );
};

export default AppNav;