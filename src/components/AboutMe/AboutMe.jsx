import React from "react";
import Navbar from "../NavBar/NavBar";
import "./AboutMe.css";
import profilePic from "../../assets/me.png";
import { FaGraduationCap, FaAward, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle, FaTrophy } from "react-icons/fa";

const AboutMe = () => {
  const educationData = [
    {
      school: "La Consolacion University Philippines",
      detail: "Bachelor of Science in Information Technology (4th Year)",
      awards: ["Dean's Lister – 1st, 2nd, 3rd Year"],
    },
    {
      school: "Senior High School",
      detail: "With Honors (Grade 11–12)",
    },
    {
      school: "Junior High School",
      detail: "With Honors (Grade 7–10)",
    },
    {
      school: "Elementary",
      detail: "With Honors (Grade 3–6)",
    },
  ];

  const achievementsData = [
    "Microsoft Excel 2019 Associate Certification",
    "Dean's Lister Awards",
  ];

  return (
    <>
      <Navbar />
      <section className="aboutme-hero">
        <div className="aboutme-left">
          <img src={profilePic} alt="Roxanne Roxas" />
        </div>

        <div className="aboutme-right">
          <h2>Hello, I’m</h2>
          <h1>Roxanne Roxas</h1>
          <p className="subtitle">
            BSIT 4th Year Student | Web Developer | IT Enthusiast
          </p>

          <ul className="personal-info">
            <li>
              <FaEnvelope className="info-icon" /> roxanne.roxas@email.lcup.edu.ph
            </li>
            <li>
              <FaPhoneAlt className="info-icon" /> +63 960 390 4241
            </li>
            <li>
              <FaMapMarkerAlt className="info-icon" /> Bulacan, City of Malolos, Philippines
            </li>
          </ul>

          <div className="info-sections two-columns">
            <div className="info-section">
              <h2>
                <FaGraduationCap className="section-icon" /> Education
              </h2>
              <div className="cards-grid">
                {educationData.map((edu, index) => (
                  <div key={index} className="card">
                    <p>
                      <strong>{edu.school}</strong>
                    </p>
                    <p>{edu.detail}</p>
                    {edu.awards && (
                      <ul>
                        {edu.awards.map((award, i) => (
                          <li key={i}>
                            <FaAward className="list-icon" />
                            {award}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="info-section">
              <h2>
                <FaTrophy className="section-icon" /> Achievements & Certifications
              </h2>
              <div className="cards-grid">
                <div className="card">
                  <ul>
                    {achievementsData.map((achievement, index) => (
                      <li key={index}>
                        <FaCheckCircle className="list-icon" />
                        {achievement}
                      </li>
                    ))}
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
