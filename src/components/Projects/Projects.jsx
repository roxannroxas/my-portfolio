import React, { useState, useEffect } from "react";
import "./Projects.css";
import CircularGallery from "../CircularGallery/CircularGallery";
import { supabase } from "../supabaseClient"; // Import Supabase client

const Projects = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const formattedData = data.map((p) => ({
          title: p.title,
          tech: p.tech,
          description: p.description,
          // This will now contain the link to the uploaded .jpg/.png
          image: p.image_url 
        }));

        setGalleryItems(formattedData);
      }
    } catch (error) {
      console.error("Error fetching projects:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="projects-section">
      <h2 className="projects-title" style={{ position: "absolute", top: "70px", width: "100%", textAlign: "center", zIndex: 10, fontFamily: "Figtree, sans-serif", fontSize: "3rem", fontWeight: "700", letterSpacing: "-3px", color: "#9F7AEA", textShadow: `0px 0px 20px rgba(160, 100, 255, 0.6)` }}>
        My Projects
      </h2>

      <div style={{ width: "100%", height: "800px", marginTop: "50px" }}>
        {loading ? (
          <div style={{ color: "white", textAlign: "center", paddingTop: "200px", fontSize: "1.5rem" }}>
            Loading Projects...
          </div>
        ) : galleryItems.length > 0 ? (
          <CircularGallery items={galleryItems} bend={2} borderRadius={0.05} />
        ) : (
          <div style={{ color: "white", textAlign: "center", paddingTop: "200px" }}>
            No projects found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;