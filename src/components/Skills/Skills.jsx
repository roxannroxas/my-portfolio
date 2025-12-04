import React, { useState, useEffect } from "react";
import "./Skills.css";
import ElectricBorder from "../ElectricBorder/ElectricBorder";
import { supabase } from "../supabaseClient";

import { 
  FaCode, 
  FaGlobe, 
  FaNetworkWired, 
  FaGamepad, 
  FaPython, 
  FaTools, 
  FaLaptopCode 
} from "react-icons/fa"; 

const getIconForCategory = (categoryName) => {

  const name = categoryName.toLowerCase();

  if (name.includes("web")) return <FaGlobe />;
  if (name.includes("game")) return <FaGamepad />;
  if (name.includes("network") || name.includes("security")) return <FaNetworkWired />;
  if (name.includes("python")) return <FaPython />;
  if (name.includes("tools") && !name.includes("python")) return <FaTools />;
  if (name.includes("program")) return <FaLaptopCode />;
  

  return <FaCode />;
};

const SkillCard = ({ category, skills }) => (
  <ElectricBorder color="#bd73ff" thickness={2} className="skill-card-wrapper" style={{ borderRadius: "12px" }}>
    <div className="skill-card-inner">

      <div className="skill-icon">
        {getIconForCategory(category)}
      </div>
      
      <h3>{category}</h3>
      <ul>
        {skills.map((skill, index) => <li key={index}>{skill.trim()}</li>)}
      </ul>
    </div>
  </ElectricBorder>
);

const Skills = () => {
  const [skillData, setSkillData] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      let { data } = await supabase.from('skill_categories').select('*').order('id');
      if (data) {
        const formattedData = data.map(item => ({
          category: item.category_name,
          skills: item.skills_list ? item.skills_list.split(',') : []
        }));
        setSkillData(formattedData);
      }
    };
    fetchSkills();
  }, []);

  return (
    <section className="skills-section">
      <h2 className="section-title">My Skills</h2>
      <div className="skills-grid">
        {skillData.map((item, index) => <SkillCard key={index} {...item} />)}
      </div>
    </section>
  );
};

export default Skills;