import React from "react";
import Navbar from "../NavBar/NavBar";
import "./AboutMe.css";
import profilePic from "../../assets/me.png";

const AboutMe = () => {
  return (
    <>
      <Navbar />
      <section className="aboutme-hero">
        {/* Image on Left */}
        <div className="aboutme-left">
          <img src={profilePic} alt="Roxanne Roxas" />
        </div>

        {/* Text on Right */}
        <div className="aboutme-right">
          <h2>Hello, I’m</h2>
          <h1>Roxanne Roxas</h1>
          <p className="subtitle">
            BSIT 4th Year Student | Web Developer | IT Enthusiast
          </p>

          {/* Personal Info */}
          <ul className="personal-info">
            <li><strong>Email:</strong> roxanne.roxas@email.lcup.edu.ph</li>
            <li><strong>Phone:</strong> +63 960 390 4241</li>
            <li><strong>Address:</strong> Bulacan, City of Malolos, Philippines</li>
          </ul>

          {/* Education & Achievements Two-Column Layout */}
          <div className="info-sections two-columns">
            {/* Education */}
            <div className="info-section">
              <h2><i className="section-icon fas fa-graduation-cap"></i>Education</h2>
              <div className="cards-grid">
                <div className="card">
                  <p><strong>La Consolacion University Philippines</strong></p>
                  <p>Bachelor of Science in Information Technology (4th Year)</p>
                  <ul>
                    <li><i className="list-icon fas fa-award"></i>Dean's Lister – 1st, 2nd, 3rd Year</li>
                  </ul>
                </div>
                <div className="card">
                  <p><strong>Senior High School</strong></p>
                  <p>With Honors (Grade 11–12)</p>
                </div>
                <div className="card">
                  <p><strong>Junior High School</strong></p>
                  <p>With Honors (Grade 7–10)</p>
                </div>
                <div className="card">
                  <p><strong>Elementary</strong></p>
                  <p>With Honors (Grade 3–6)</p>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="info-section">
              <h2><i className="section-icon fas fa-trophy"></i>Achievements & Certifications</h2>
              <div className="cards-grid">
                <div className="card">
                  <ul>
                    <li><i className="list-icon fas fa-file-excel"></i>Microsoft Excel 2019 Associate Certification</li>
                    <li><i className="list-icon fas fa-award"></i>Dean's Lister Awards</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutMe;
