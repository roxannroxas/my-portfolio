import React from "react";
import "./SkillsPage.css";
import {
  FaReact,
  FaPhp,
  FaPython,
  FaJava,
  FaWordpress,
  FaDatabase,
  FaGamepad,
  FaNetworkWired,
  FaGitAlt,
} from "react-icons/fa";

const SkillsPage = () => {
  const skillData = [
    { icon: <FaPhp />, category: "Programming", skills: ["JavaScript", "PHP", "Python", "Java"] },
    { icon: <FaReact />, category: "Web Development", skills: ["React", "HTML", "CSS", "MySQL", "WordPress"] },
    { icon: <FaNetworkWired />, category: "Networking & Security", skills: ["Cisco Packet Tracer", "Routing", "VLANs"] },
    { icon: <FaGamepad />, category: "Game Development", skills: ["Godot Engine"] },
    { icon: <FaPython />, category: "Python Tools", skills: ["PyCharm", "OpenCV"] },
    { icon: <FaGitAlt />, category: "Tools", skills: ["Git", "VS Code", "Node.js", "NetBeans"] },
  ];

  return (
    <section className="skills-page">
      <h2 className="section-title">My Skills</h2>
      <div className="skills-container">
        {skillData.map((item, index) => (
          <div key={index} className="skill-card">
            <div className="skill-icon">{item.icon}</div>
            <h3>{item.category}</h3>
            <ul>
              {item.skills.map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsPage;
