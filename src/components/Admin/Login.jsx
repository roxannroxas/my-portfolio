import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div style={{ 
      position: "fixed",       // FIXED: Floats above everything
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh", 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center",
      zIndex: 9999,            // HIGH Z-INDEX: Ensures it's the top layer
      backgroundColor: "#111"  // SOLID BACKGROUND: Hides the rest of the site
    }}>
      <form onSubmit={handleLogin} style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "1.5rem", 
        background: "#1e1e1e", // Dark card background
        padding: "2.5rem", 
        borderRadius: "12px", 
        border: "1px solid #8A2BE2",
        boxShadow: "0 0 20px rgba(138, 43, 226, 0.5)", // Glow effect
        width: "350px",
        maxWidth: "90%"
      }}>
        <h2 style={{color: "white", textAlign: "center", margin: 0, fontSize: "1.8rem"}}>Admin Access</h2>
        
        <input 
          type="email" 
          placeholder="Enter Email" 
          onChange={(e) => setEmail(e.target.value)} 
          style={{ 
            padding: "12px", 
            borderRadius: "6px", 
            border: "1px solid #444", 
            background: "#2a2a2a", 
            color: "white",
            outline: "none"
          }}
        />
        
        <input 
          type="password" 
          placeholder="Enter Password" 
          onChange={(e) => setPassword(e.target.value)} 
          style={{ 
            padding: "12px", 
            borderRadius: "6px", 
            border: "1px solid #444", 
            background: "#2a2a2a", 
            color: "white",
            outline: "none"
          }}
        />
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: "12px", 
            cursor: "pointer", 
            backgroundColor: "#8A2BE2", 
            color: "white", 
            border: "none", 
            fontWeight: "bold", 
            fontSize: "1rem",
            borderRadius: "6px",
            transition: "0.3s"
          }}
        >
          {loading ? "Verifying..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;