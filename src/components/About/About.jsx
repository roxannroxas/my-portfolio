import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient"; 
import "./About.css";

const About = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  const goToProjects = () => {
    navigate("/projects");
  };

  useEffect(() => {
    const fetchContent = async () => {
      try {
       
        const { data, error } = await supabase
          .from("site_content")
          .select("content_text")
          .eq("section_key", "bio") 
          .single();

        if (data) setText(data.content_text);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  return (
    <section id="about" className="about-section">
      <div className="about-box">
        <h2 className="section-title">Who Am I?</h2>
        
        {loading ? <p>Loading...</p> : (
          <div className="bio-text">
            {text.split("\n").map((p, i) => (
              p.trim() !== "" ? <p key={i}>{p}</p> : <br key={i}/>
            ))}
          </div>
        )}

        <button className="projects-btn" onClick={goToProjects}>
          Show My Projects
        </button>
      </div>
    </section>
  );
};

export default About;