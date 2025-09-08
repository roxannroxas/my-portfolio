import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa";
import "./Header.css";
import profilePic from "../../assets/me.png";

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/about-me");
  };

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-container">
        {/* Left Section - Text */}
        <div className="hero-left">
          <p className="greeting">WELCOME TO MY PORTFOLIO</p>
          <h1 className="name">
            Hi, I’m <span className="highlight">Roxanne Roxas</span>
          </h1>
          <h2 className="title">BSIT 4th Year Student</h2>
          <p className="subtitle">Aspiring IT Professional | Web Developer</p>

          {/* Buttons */}
          <div className="hero-buttons">
            <button className="cta-btn" onClick={handleClick}>
              View About Me
            </button>
            <button className="cta-btn secondary">Hire Me</button>
          </div>

          {/* Social Icons */}
          <div className="social-icons">
            <a href="https://github.com/roxannroxas" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/roxanne-roxas-758977382/" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a href="https://www.facebook.com/rxsroxanne17" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>
            <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=roxanne.roxas@gmail.lcup.edu.ph"
  target="_blank"
  rel="noreferrer"
>
  <FaEnvelope />
</a>

          </div>
        </div>

        {/* Right Section - Image */}
        <div className="hero-right">
          <img src={profilePic} alt="Profile" className="hero-img" />
        </div>
      </div>
    </section>
  );
};

export default Header;
