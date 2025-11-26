import React from "react";
import Navbar from "../NavBar/NavBar";
import "./AboutMe.css";
import profilePic from "../../assets/me.png";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaGraduationCap,
  FaTrophy,
} from "react-icons/fa";
import ScrollStack, { ScrollStackItem } from "../ScrollStack/ScrollStack";

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
        </div> 




        <div className="scrollstack-wrapper two-columns">
          

          <div className="scrollstack-column">
            <h3 className="section-title">
              <FaGraduationCap /> Education
            </h3>
            
            <div className="scrollstack-container-wrapper">
              <ScrollStack>
                {educationData.map((edu, idx) => (
                  <ScrollStackItem key={idx}>
                    <h2 style={{ color: "#a970ff", marginBottom: "0.5rem" }}>
                      {edu.school}
                    </h2>
                    <p style={{ marginBottom: "1rem" }}>{edu.detail}</p>
                    {edu.awards && (
                      <ul style={{ paddingLeft: "1rem", marginTop: "0.5rem" }}>
                        {edu.awards.map((award, i) => (
                          <li key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <FaCheckCircle color="#a970ff" /> {award}
                          </li>
                        ))}
                      </ul>
                    )}
                  </ScrollStackItem>
                ))}
              </ScrollStack>
            </div>
          </div>

          <div className="scrollstack-column">
            <h3 className="section-title">
              <FaTrophy /> Achievements & Certifications
            </h3>
            
            <div className="scrollstack-container-wrapper">
              <ScrollStack>
                {achievementsData.map((ach, idx) => (
                  <ScrollStackItem key={idx}>
                     <div style={{ display: "flex", alignItems: "center", gap: "10px", height: "100%" }}>
                        <FaCheckCircle size={24} color="#a970ff" /> 
                        <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{ach}</span>
                     </div>
                  </ScrollStackItem>
                ))}
              </ScrollStack>
            </div>
          </div>

        </div>

      </section>
    </>
  );
};

export default AboutMe;