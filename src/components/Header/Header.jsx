import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaLinkedin, FaFacebook, FaEnvelope } from "react-icons/fa";
import { ReactTyped } from "react-typed"; 
import "./Header.css";
import profilePic from "../../assets/me.png";
import resumePDF from "../../assets/resume.pdf"; 
import MetaBalls from "../MetaBalls/MetaBalls";

const Header = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/about-me");
  };

  const handleResumeClick = () => {
    window.open(resumePDF, "_blank");
  };

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      
      <div className="hero-container">
        <div className="hero-left">
          <p className="greeting">WELCOME TO MY PORTFOLIO</p>

          <h1 className="name">
            <ReactTyped
              strings={[
                "Hi, I’m <span class='highlight'>Roxanne Roxas</span>",
              ]}
              typeSpeed={70}
              backSpeed={40}
              backDelay={1500}
              showCursor={true}
              cursorChar="|"
              loop={true}
              contentType="html"
            />
          </h1>

          <h2 className="title">BSIT 4th Year Student</h2>
          <p className="subtitle">Aspiring IT Professional | Web Developer</p>

          <div className="hero-buttons">
            <button className="cta-btn" onClick={handleClick}>
              View About Me
            </button>
            <button className="cta-btn secondary" onClick={handleResumeClick}>
              My Resume
            </button>
          </div>

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
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=roxanne.roxas@gmail.lcup.edu.ph" target="_blank" rel="noreferrer">
              <FaEnvelope />
            </a>
          </div>
        </div>

<div className="hero-right">

  <div className="hero-blob-bg">
    <MetaBalls
      color="#bd73ff"     
      cursorBallColor="#bd73ff"
      cursorBallSize={2}
  ballCount={15}
  animationSize={30}
  enableMouseInteraction={true}
  enableTransparency={true}
  hoverSmoothness={0.05}
  clumpFactor={1}
  speed={0.3}          
    />
  </div>


  <img src={profilePic} alt="Profile" className="hero-img" />
</div>
      </div>
    </section>
  );
};

export default Header;