import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(""); 
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg("Invalid email or password.");
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div style={styles.overlay}>
      <form onSubmit={handleLogin} style={styles.card}>
        <div style={styles.header}>
          <h2 style={{ margin: 0, color: "white" }}>Admin Access</h2>
          <p style={{ margin: "5px 0 0", color: "#888", fontSize: "0.9rem" }}>Secure Login</p>
        </div>
        
     
        <div style={styles.inputGroup}>
          <FaUser style={styles.icon} />
          <input 
            type="email" 
            placeholder="Email Address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            style={styles.input}
            required
          />
        </div>
        
 
        <div style={styles.inputGroup}>
          <FaLock style={styles.icon} />
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            style={styles.input}
            required
          />
          <span 
            onClick={() => setShowPassword(!showPassword)} 
            style={styles.eyeIcon}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>


        {errorMsg && <div style={styles.error}>{errorMsg}</div>}
        
        <button 
          type="submit" 
          disabled={loading}
          style={loading ? styles.buttonDisabled : styles.button}
        >
          {loading ? "Verifying..." : "Login"}
        </button>
      </form>
    </div>
  );
};


const styles = {
  overlay: { 
    position: "fixed", top: 0, left: 0, width: "100%", height: "100vh", 
    display: "flex", justifyContent: "center", alignItems: "center",
    zIndex: 9999, backgroundColor: "#0a0a0a",
    backgroundImage: "radial-gradient(circle at 50% 50%, #2d0b45 0%, #000 70%)" 
  },
  card: { 
    display: "flex", flexDirection: "column", gap: "1.2rem", 
    background: "rgba(30, 30, 30, 0.6)", 
    backdropFilter: "blur(10px)", 
    padding: "2.5rem", borderRadius: "16px", 
    border: "1px solid rgba(138, 43, 226, 0.3)",
    boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)", 
    width: "350px", maxWidth: "90%"
  },
  header: { textAlign: "center", marginBottom: "1rem" },
  inputGroup: { 
    position: "relative", display: "flex", alignItems: "center",
    background: "#2a2a2a", borderRadius: "8px", border: "1px solid #444",
    padding: "0 12px"
  },
  icon: { color: "#8A2BE2", marginRight: "10px" },
  eyeIcon: { color: "#888", cursor: "pointer", padding: "10px", marginLeft: "auto" },
  input: { 
    flex: 1, padding: "14px 0", borderRadius: "8px", border: "none", 
    background: "transparent", color: "white", outline: "none", fontSize: "1rem"
  },
  button: { 
    padding: "14px", cursor: "pointer", backgroundColor: "#8A2BE2", 
    color: "white", border: "none", fontWeight: "bold", fontSize: "1rem",
    borderRadius: "8px", transition: "0.3s", marginTop: "10px",
    boxShadow: "0 4px 15px rgba(138, 43, 226, 0.4)"
  },
  buttonDisabled: { 
    padding: "14px", cursor: "not-allowed", backgroundColor: "#555", 
    color: "#ccc", border: "none", fontWeight: "bold", fontSize: "1rem",
    borderRadius: "8px", marginTop: "10px"
  },
  error: { color: "#ff4d4d", fontSize: "0.9rem", textAlign: "center", background: "rgba(255, 77, 77, 0.1)", padding: "8px", borderRadius: "5px" }
};

export default Login;