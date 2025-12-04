import React, { useState, useEffect } from "react";
import Navbar from "../NavBar/AppNav";
import "./AboutMe.css";
import profilePic from "../../assets/me.png";
import { supabase } from "../supabaseClient";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle, FaGraduationCap, FaTrophy } from "react-icons/fa";
import ScrollStack, { ScrollStackItem } from "../ScrollStack/ScrollStack";

const AboutMe = () => {
 
  const [info, setInfo] = useState({ 
    bio: "", 
    about_summary: "", 
    email: "", 
    phone: "", 
    address: "",
    header_title: "",
    header_subtitle: ""
  });
  
  const [education, setEducation] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
    
      const { data: textData } = await supabase.from('site_content').select('*');
      if (textData) {
        const newInfo = {};
  
        textData.forEach(i => newInfo[i.section_key] = i.content_text);
        setInfo(prev => ({ ...prev, ...newInfo }));
      }

 
      const { data: eduData } = await supabase.from('education').select('*').order('id', { ascending: false });
      if (eduData) setEducation(eduData);


      const { data: achData } = await supabase.from('achievements').select('*');
      if (achData) setAchievements(achData);
    };
    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <section className="aboutme-hero">
        <div className="aboutme-left">
          <img src={profilePic} alt="Profile" />
        </div>

        <div className="aboutme-right">
          <h2>Hello, I’m</h2>
          <h1>{info.header_title || "Roxanne Roxas"}</h1>
          <p className="subtitle">{info.header_subtitle || "Web Developer"}</p>
    
          <div style={{marginBottom: "20px", whiteSpace: "pre-line"}}>
             {info.about_summary || "Loading info..."}
          </div>

          <ul className="personal-info">
            <li><FaEnvelope className="info-icon" /> {info.email}</li>
            <li><FaPhoneAlt className="info-icon" /> {info.phone}</li>
            <li><FaMapMarkerAlt className="info-icon" /> {info.address}</li>
          </ul>
        </div> 

        <div className="scrollstack-wrapper two-columns">
          {/* EDUCATION COLUMN */}
          <div className="scrollstack-column">
            <h3 className="section-title"><FaGraduationCap /> Education</h3>
            <div className="scrollstack-container-wrapper">
              <ScrollStack>
                {education.map((edu, idx) => (
                  <ScrollStackItem key={idx}>
                    <h2 style={{ color: "#a970ff", marginBottom: "0.5rem" }}>{edu.school}</h2>
                    <p style={{ marginBottom: "1rem" }}>{edu.detail}</p>
                    {edu.awards && (
                      <ul style={{ paddingLeft: "1rem", marginTop: "0.5rem" }}>
                        <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                           <FaCheckCircle color="#a970ff" /> {edu.awards}
                        </li>
                      </ul>
                    )}
                  </ScrollStackItem>
                ))}
              </ScrollStack>
            </div>
          </div>

          {/* ACHIEVEMENTS COLUMN */}
          <div className="scrollstack-column">
            <h3 className="section-title"><FaTrophy /> Achievements</h3>
            <div className="scrollstack-container-wrapper">
              <ScrollStack>
                {achievements.map((ach, idx) => (
                  <ScrollStackItem key={idx}>
                     <div style={{ display: "flex", alignItems: "center", gap: "10px", height: "100%" }}>
                        <FaCheckCircle size={24} color="#a970ff" /> 
                        <span style={{ fontSize: "1.2rem", fontWeight: "bold" }}>{ach.title}</span>
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