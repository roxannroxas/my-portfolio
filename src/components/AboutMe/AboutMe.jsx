import React from "react";
import Navbar from "../NavBar/NavBar";
import "./AboutMe.css";
import profilePic from "../../assets/me.png";

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
              <strong>Email:</strong> roxanne.roxas@email.lcup.edu.ph
            </li>
            <li>
              <strong>Phone:</strong> +63 960 390 4241
            </li>
            <li>
              <strong>Address:</strong> Bulacan, City of Malolos, Philippines
            </li>
          </ul>

    
          <div className="info-sections two-columns">
            
            <div className="info-section">
              <h2>
                <i className="section-icon fas fa-graduation-cap"></i>Education
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
                            <i className="list-icon fas fa-award"></i>
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
                <i className="section-icon fas fa-trophy"></i>Achievements &
                Certifications
              </h2>
              <div className="cards-grid">
                <div className="card">
                  <ul>
                    {achievementsData.map((achievement, index) => (
                      <li key={index}>
                        <i className="list-icon fas fa-check-circle"></i>
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
