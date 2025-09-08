import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

const About = () => {
  const navigate = useNavigate();

  const goToProjects = () => {
    navigate("/projects");
  };

  return (
    <section id="about" className="about-section">
      <div className="about-box">
        <h2 className="section-title">Who Am I?</h2>
        <p>
          I am Roxanne Roxas, a 4th Year BSIT student passionate about
          technology and web development. My journey in IT has taught me to
          create meaningful projects, learn continuously, and adapt to new
          technologies.
        </p>
        <p>
          I enjoy building projects that help others and showcase my skills.
          My goal is to become a professional developer who can create real
          solutions that make a difference.
        </p>

        <button className="projects-btn" onClick={goToProjects}>
          Show My Projects
        </button>
      </div>
    </section>
  );
};

export default About;
