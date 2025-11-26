import React from "react";
import "./Projects.css";
import CircularGallery from "../CircularGallery/CircularGallery";


import studentPortal from "../../assets/studentportal.jpg";
import daBreeder from "../../assets/dabreeder.png";
import taraG from "../../assets/tarag.png";
import packetTracer from "../../assets/cisco.png";
import purrCafe from "../../assets/purrcafe.png";
import godot from "../../assets/godot.png";
import portfolio from "../../assets/portfolio.png";
import faceRecog from "../../assets/facerecog.png";
import wordpress from "../../assets/wordpress.png";


const projects = [
  {
    title: "Student Profile",
    tech: "PHP, MySQL",
    img: studentPortal,
    description: "A web-based system for managing student profiles.",
  },
  {
    title: "DaBreeder",
    tech: "Web App",
    img: daBreeder,
    description: "Ethical dog breeding platform connecting breeders.",
  },
  {
    title: "Tara G",
    tech: "Mobile-first",
    img: taraG,
    description: "A travel planning app designed for mobile experiences.",
  },
  {
    title: "Net Labs",
    tech: "Cisco",
    img: packetTracer,
    description: "Hands-on networking labs for Packet Tracer.",
  },
  {
    title: "Purr Café",
    tech: "Java, NetBeans",
    img: purrCafe,
    description: "POS system for a café with inventory tracking.",
  },
  {
    title: "2D Game",
    tech: "Godot Engine",
    img: godot,
    description: "A fully functional 2D game developed using Godot.",
  },
  {
    title: "Portfolio Website",
    tech: "React.js, Vite",
    img: portfolio,
    description: "Personal portfolio website showcasing projects and skills.",
  },
  {
    title: "Face Recognition",
    tech: "Python, OpenCV",
    img: faceRecog,
    description: "A Python-based system for face detection and recognition.",
  },
  {
    title: "TechCare Support",
    tech: "WordPress",
    img: wordpress,
    description: "Website providing technical support and assistance.",
  },
];

const Projects = () => {
  const galleryItems = projects.map(p => ({
    image: p.img,
    title: p.title,
    tech: p.tech,
    description: p.description
  }));

  return (
    <div className="projects-section">
   
    <h2 
        className="projects-title" 
        style={{ 
          position: 'absolute', 
          top: '70px', 
          width: '100%', 
          textAlign: 'center', 
          zIndex: 10, 

          fontFamily: 'Figtree, sans-serif',
          fontSize: '3rem', 
          fontWeight: '700', 
          letterSpacing: '-3px', 
          

          color: '#9F7AEA', 
          

          textShadow: `
           
             0px 0px 20px rgba(160, 100, 255, 0.6)
          `
        }}
      >
        My Projects
      </h2>
      

      <div style={{ 
        width: "100%", 
        height: "800px",
        marginTop: "50px" 
      }}>
        <CircularGallery 
          items={galleryItems} 
          bend={2} 
          borderRadius={0.05} 
        />
      </div>
    </div>
  );
};

export default Projects;