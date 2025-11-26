import React from "react";
import "./Skills.css";
// Ensure this path is correct relative to Skills.jsx
import ElectricBorder from "../ElectricBorder/ElectricBorder"; 
import {
  FaReact,
  FaPhp,
  FaPython,
  FaJava,
  FaWordpress,
  FaGamepad,
  FaNetworkWired,
  FaGitAlt,
} from "react-icons/fa";

// Helper component for individual cards
const SkillCard = ({ icon, category, skills }) => (
  // ElectricBorder acts as the "Wrapper" for the visual effect
  <ElectricBorder 
    color="#d8b4fe"
    className="skill-wrapper" 
    thickness={2}
  >
    <div className="skill-card-content">
      <div className="skill-icon">{icon}</div>
      <h3>{category}</h3>
      <ul>
        {skills.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  </ElectricBorder>
);

const Skills = () => {
  const skillData = [
    { 
      icon: <FaPhp />, 
      category: "Programming", 
      skills: ["JavaScript", "PHP", "Python", "Java"] 
    },
    { 
      icon: <FaReact />, 
      category: "Web Development", 
      skills: ["React", "HTML", "CSS", "MySQL", "WordPress"] 
    },
    { 
      icon: <FaNetworkWired />, 
      category: "Networking & Security", 
      skills: ["Cisco Packet Tracer", "Routing", "VLANs"] 
    },
    { 
      icon: <FaGamepad />, 
      category: "Game Development", 
      skills: ["Godot Engine"] 
    },
    { 
      icon: <FaPython />, 
      category: "Python Tools", 
      skills: ["PyCharm", "OpenCV"] 
    },
    { 
      icon: <FaGitAlt />, 
      category: "Tools", 
      skills: ["Git", "VS Code", "Node.js", "NetBeans"] 
    },
  ];

  return (
    <section className="skills-section">
      <h2 className="section-title">My Skills</h2>
      
      {/* This container handles the Grid Layout defined in Skills.css */}
      <div className="skills-container">
        {skillData.map((item, index) => (
          <SkillCard key={index} {...item} />
        ))}
      </div>
    </section>
  );
};

export default Skills;