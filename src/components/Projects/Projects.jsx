import React from "react";
import "./Projects.css";
import { useNavigate } from "react-router-dom";

import studentPortal from "../../assets/studentportal.jpg";
import daBreeder from "../../assets/dabreeder.png";
import taraG from "../../assets/tarag.png";
import packetTracer from "../../assets/cisco.png";
import purrCafe from "../../assets/purrcafe.png";
import godot from "../../assets/godot.png";
import portfolio from "../../assets/portfolio.png";
import faceRecog from "../../assets/facerecog.png";
import wordpress from "../../assets/wordpress.png";

// Data
const projects = [
  {
    title: "Student Profile System",
    tech: "PHP, MySQL",
    img: studentPortal,
    description: "A web-based system for managing student profiles with secure authentication.",
  },
  {
    title: "DaBreeder",
    tech: "Web App",
    img: daBreeder,
    description: "Ethical dog breeding platform that connects breeders and buyers.",
  },
  {
    title: "Tara G",
    tech: "Mobile-first",
    img: taraG,
    description: "A travel planning app designed for mobile-first experiences.",
  },
  {
    title: "Packet Tracer Networking Labs",
    tech: "Cisco",
    img: packetTracer,
    description: "Hands-on networking labs for Cisco Packet Tracer simulations.",
  },
  {
    title: "Purr Café POS System",
    tech: "Java, NetBeans",
    img: purrCafe,
    description: "Point-of-sale system for a café with inventory and sales tracking.",
  },
  {
    title: "2D Game Development Project",
    tech: "Godot Engine",
    img: godot,
    description: "A fully functional 2D game developed using Godot Engine.",
  },
  {
    title: "Portfolio Website Development",
    tech: "React.js, Vite",
    img: portfolio,
    description: "Personal portfolio website showcasing projects and skills.",
  },
  {
    title: "Face Recognition System",
    tech: "Python, PyCharm, OpenCV",
    img: faceRecog,
    description: "A Python-based system for face detection and recognition.",
  },
  {
    title: "WordPress TechCare Assistance Website",
    tech: "WordPress",
    img: wordpress,
    description: "Website providing technical support and assistance using WordPress.",
  },
];


const ProjectCard = ({ img, title, tech, description }) => (
  <div className="project-card">
    <img src={img} alt={title} className="project-img" />
    <h3>{title}</h3>
    <p className="project-tech">{tech}</p>
    <p className="project-desc">{description}</p>
  </div>
);

const Projects = () => {
  const navigate = useNavigate();

  return (
    <section className="projects-section">
      <h2 className="projects-title">My Projects</h2>
      <div className="projects-container">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
