import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { FaProjectDiagram, FaUser, FaCode, FaAddressBook, FaSignOutAlt, FaTrash, FaPlus } from "react-icons/fa";


const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("projects");

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) navigate("/admin");
      else setLoading(false);
    };
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin");
  };

  if (loading) return <div style={styles.loading}>Loading Dashboard...</div>;

  return (
    <div style={styles.container}>

      <div style={styles.sidebar}>
        <h2 style={styles.logo}>Kirby's Panel</h2>
        <nav style={styles.nav}>
          <NavButton label="Projects" icon={<FaProjectDiagram />} tab="projects" active={activeTab} set={setActiveTab} />
          <NavButton label="Skills" icon={<FaCode />} tab="skills" active={activeTab} set={setActiveTab} />
          <NavButton label="About Me" icon={<FaUser />} tab="about" active={activeTab} set={setActiveTab} />
          <NavButton label="Contact Info" icon={<FaAddressBook />} tab="contact" active={activeTab} set={setActiveTab} />
        </nav>
        <button onClick={handleLogout} style={styles.logoutBtn}><FaSignOutAlt /> Logout</button>
      </div>


      <div style={styles.mainContent}>
        <h2 style={styles.header}>
  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Manager</h2>
        {activeTab === "projects" && <ProjectsManager />}
        {activeTab === "skills" && <SkillsManager />}
        {activeTab === "about" && <AboutManager />}
        {activeTab === "contact" && <ContactManager />}
      </div>
    </div>
  );
};

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  

  const [form, setForm] = useState({ title: "", tech: "", desc: "" });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  

  const [editingId, setEditingId] = useState(null); 
  const [oldImageUrl, setOldImageUrl] = useState(""); 

  const fetchProjects = async () => {
    let { data } = await supabase.from('projects').select('*').order('id', { ascending: false });
    if (data) setProjects(data);
  };

  useEffect(() => { fetchProjects(); }, []);


  const handleEditClick = (project) => {
    setEditingId(project.id);
    setForm({ 
      title: project.title, 
      tech: project.tech, 
      desc: project.description 
    });
    setOldImageUrl(project.image_url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ title: "", tech: "", desc: "" });
    setImageFile(null);
    setOldImageUrl("");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let publicUrl = oldImageUrl; 


      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage.from('project-images').upload(fileName, imageFile);
        if (uploadError) throw uploadError;

        const { data } = supabase.storage.from('project-images').getPublicUrl(fileName);
        publicUrl = data.publicUrl;
      } else if (!editingId && !imageFile) {
        alert("Please select an image for a new project!");
        setUploading(false);
        return;
      }

      const projectData = { 
        title: form.title, 
        tech: form.tech, 
        description: form.desc, 
        image_url: publicUrl 
      };

      if (editingId) {
        const { error } = await supabase.from('projects').update(projectData).eq('id', editingId);
        if (error) throw error;
        alert("Project Updated Successfully!");
      } else {
        const { error } = await supabase.from('projects').insert(projectData);
        if (error) throw error;
        alert("Project Added Successfully!");
      }

      handleCancelEdit();
      fetchProjects();

    } catch (err) { 
      alert("Error: " + err.message); 
    } finally { 
      setUploading(false); 
    }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this project?")) {
      await supabase.from('projects').delete().eq('id', id);
      fetchProjects();
    }
  };

  return (
    <div style={styles.fadeIn}>
      <div style={styles.card}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px"}}>
          <h4 style={{margin: 0}}>{editingId ? "Edit Project" : "Add New Project"}</h4>
          {editingId && (
            <button onClick={handleCancelEdit} style={{background: "gray", color: "white", border: "none", padding: "5px 10px", borderRadius: "5px", cursor: "pointer"}}>
              Cancel Edit
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input placeholder="Project Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} style={styles.input} />
          <input placeholder="Tech Stack (e.g. React, Supabase)" value={form.tech} onChange={e => setForm({...form, tech: e.target.value})} style={styles.input} />
          <textarea placeholder="Description" value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} rows="3" style={styles.input} />
          
          <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
             <label style={{fontSize: "0.9rem", color: "#ccc"}}>
               {editingId ? "Change Image (Optional)" : "Project Image"}
             </label>
             <input 
                type="file" 
                accept="image/*" 
                onChange={e => setImageFile(e.target.files[0])} 
                style={{color: "#ccc", padding: "10px", background: "#2a2a2a", borderRadius: "5px", border: "1px solid #444"}} 
             />
          </div>

          <button type="submit" disabled={uploading} style={editingId ? styles.updateBtn : styles.primaryBtn}>
            {uploading ? "Processing..." : (editingId ? "Update Project" : "Add Project")}
          </button>
        </form>
      </div>

      <div style={styles.grid}>
        {projects.map(p => (
          <div key={p.id} style={styles.itemCard}>
            <div style={{position: "relative", height: "120px", background: "#333", borderRadius: "5px", overflow: "hidden"}}>
              <img src={p.image_url} alt="project" style={{width: "100%", height: "100%", objectFit: "cover"}} />
            </div>
            
            <h4 style={{margin: "10px 0 5px 0"}}>{p.title}</h4>
            <p style={{fontSize: "0.8rem", color: "#ccc", marginBottom: "10px", flex: 1}}>{p.tech}</p>
            

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "auto" }}>
               <button onClick={() => handleEditClick(p)} style={styles.editBtn}>
                 Edit
               </button>
               <button onClick={() => handleDelete(p.id)} style={styles.deleteBtn}>
                 Delete
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


const SkillsManager = () => {
  const [categories, setCategories] = useState([]);
  const [newCat, setNewCat] = useState({ category_name: "", skills_list: "" });

  const fetchSkills = async () => {
    let { data } = await supabase.from('skill_categories').select('*').order('id');
    if (data) setCategories(data);
  };

  useEffect(() => { fetchSkills(); }, []);

  const handleAdd = async () => {
    if (!newCat.category_name) return;
    await supabase.from('skill_categories').insert(newCat);
    setNewCat({ category_name: "", skills_list: "" });
    fetchSkills();
  };

  const handleDelete = async (id) => {
    await supabase.from('skill_categories').delete().eq('id', id);
    fetchSkills();
  };

  return (
    <div style={styles.fadeIn}>
      <div style={styles.card}>
        <h4>Add Skill Category</h4>
        <div style={{display: 'flex', gap: '10px', flexDirection: 'column'}}>
          <input placeholder="Category Name (e.g. Programming)" value={newCat.category_name} onChange={e => setNewCat({...newCat, category_name: e.target.value})} style={styles.input} />
          <input placeholder="Skills List (e.g. Java, Python, PHP)" value={newCat.skills_list} onChange={e => setNewCat({...newCat, skills_list: e.target.value})} style={styles.input} />
          <button onClick={handleAdd} style={styles.primaryBtn}>Add Category</button>
        </div>
      </div>
      <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
        {categories.map(cat => (
          <div key={cat.id} style={styles.rowCard}>
            <div>
              <h4 style={{margin: 0, color: '#bd73ff'}}>{cat.category_name}</h4>
              <p style={{margin: '5px 0', fontSize: '0.9rem', color: '#ccc'}}>{cat.skills_list}</p>
            </div>
            <button onClick={() => handleDelete(cat.id)} style={styles.iconBtn}><FaTrash /></button>
          </div>
        ))}
      </div>
    </div>
  );
};



// ==========================================
// 3. ABOUT & CONTENT MANAGER
// ==========================================
const AboutManager = () => {
  // Education & Achievements
  const [education, setEducation] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [newEdu, setNewEdu] = useState({ school: "", detail: "", awards: "" });
  const [newAch, setNewAch] = useState("");
  
  // Site Text (Bio, Header, Home-About)
  const [texts, setTexts] = useState({
    bio: "",
    header_title: "",
    header_subtitle: "",
    about_summary: ""
  });

  const fetchData = async () => {
    const eduReq = supabase.from('education').select('*');
    const achReq = supabase.from('achievements').select('*');
    const contentReq = supabase.from('site_content').select('*');

    const [eduRes, achRes, contentRes] = await Promise.all([eduReq, achReq, contentReq]);
    
    if (eduRes.data) setEducation(eduRes.data);
    if (achRes.data) setAchievements(achRes.data);
    
    if (contentRes.data) {
      const newTexts = { ...texts };
      contentRes.data.forEach(item => {
        if (newTexts.hasOwnProperty(item.section_key)) {
          newTexts[item.section_key] = item.content_text;
        }
      });
      setTexts(newTexts);
    }
  };

  useEffect(() => { fetchData(); }, []);

  // Generic Text Saver
  const saveText = async (key, value) => {
    await supabase.from('site_content').upsert({ section_key: key, content_text: value }, { onConflict: 'section_key' });
    alert(`${key.replace('_', ' ')} updated!`);
  };

  const addEdu = async () => { await supabase.from('education').insert(newEdu); setNewEdu({ school: "", detail: "", awards: "" }); fetchData(); };
  const deleteEdu = async (id) => { await supabase.from('education').delete().eq('id', id); fetchData(); };
  const addAch = async () => { await supabase.from('achievements').insert({ title: newAch }); setNewAch(""); fetchData(); };
  const deleteAch = async (id) => { await supabase.from('achievements').delete().eq('id', id); fetchData(); };

  return (
    <div style={styles.fadeIn}>
      
      {/* HEADER SECTION */}
      <div style={styles.card}>
        <h4>Edit Home Page Header</h4>
        <label style={{color:"#ccc", fontSize:"0.9rem"}}>Main Title (Your Name)</label>
        <input value={texts.header_title} onChange={e => setTexts({...texts, header_title: e.target.value})} style={{...styles.input, marginBottom: "10px"}} />
        
        <label style={{color:"#ccc", fontSize:"0.9rem"}}>Subtitle (Job Title)</label>
        <input value={texts.header_subtitle} onChange={e => setTexts({...texts, header_subtitle: e.target.value})} style={styles.input} />
        
        <div style={{marginTop: "10px", display:"flex", gap:"10px"}}>
          <button onClick={() => saveText('header_title', texts.header_title)} style={styles.primaryBtn}>Save Title</button>
          <button onClick={() => saveText('header_subtitle', texts.header_subtitle)} style={styles.primaryBtn}>Save Subtitle</button>
        </div>
      </div>

      {/* HOME ABOUT SECTION */}
      <div style={styles.card}>
        <h4>Edit Home Page "About" Summary</h4>
        <textarea rows="3" value={texts.about_summary} onChange={e => setTexts({...texts, about_summary: e.target.value})} style={styles.input} />
        <button onClick={() => saveText('about_summary', texts.about_summary)} style={{...styles.primaryBtn, marginTop: '10px'}}>Save Summary</button>
      </div>

      {/* DETAILED BIO SECTION */}
      <div style={styles.card}>
        <h4>Edit "About Me" Page Bio</h4>
        <textarea rows="5" value={texts.bio} onChange={e => setTexts({...texts, bio: e.target.value})} style={styles.input} />
        <button onClick={() => saveText('bio', texts.bio)} style={{...styles.primaryBtn, marginTop: '10px'}}>Save Bio</button>
      </div>

      {/* EDUCATION SECTION */}
      <div style={styles.card}>
        <h4>Education</h4>
        <div style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
          <input placeholder="School" value={newEdu.school} onChange={e => setNewEdu({...newEdu, school: e.target.value})} style={styles.input} />
          <input placeholder="Detail" value={newEdu.detail} onChange={e => setNewEdu({...newEdu, detail: e.target.value})} style={styles.input} />
        </div>
        <input placeholder="Awards" value={newEdu.awards} onChange={e => setNewEdu({...newEdu, awards: e.target.value})} style={{...styles.input, marginBottom:'10px'}} />
        <button onClick={addEdu} style={styles.primaryBtn}><FaPlus /> Add</button>
        <div style={{marginTop: '20px'}}>
          {education.map(edu => (
            <div key={edu.id} style={styles.miniCard}>
              <div><strong>{edu.school}</strong><br/><span style={{fontSize:'0.8rem'}}>{edu.detail}</span></div>
              <button onClick={() => deleteEdu(edu.id)} style={styles.iconBtn}><FaTrash /></button>
            </div>
          ))}
        </div>
      </div>

      {/* ACHIEVEMENTS */}
      <div style={styles.card}>
        <h4>Achievements</h4>
        <div style={{display: 'flex', gap: '10px'}}>
          <input placeholder="Achievement" value={newAch} onChange={e => setNewAch(e.target.value)} style={styles.input} />
          <button onClick={addAch} style={styles.primaryBtn}>Add</button>
        </div>
        <div style={{marginTop: '15px'}}>
          {achievements.map(ach => (
             <div key={ach.id} style={styles.miniCard}><span>{ach.title}</span><button onClick={() => deleteAch(ach.id)} style={styles.iconBtn}><FaTrash /></button></div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactManager = () => {
  const [details, setDetails] = useState({
    email: "", phone: "", address: "", linkedin: "", github: "", facebook: ""
  });

  useEffect(() => {
    const fetchContact = async () => {
      const { data } = await supabase.from('site_content').select('*');
      if (data) {
        const newDetails = { ...details };
        data.forEach(item => {
          if (newDetails.hasOwnProperty(item.section_key)) {
            newDetails[item.section_key] = item.content_text;
          }
        });
        setDetails(newDetails);
      }
    };
    fetchContact();
  }, []);

  const handleChange = (key, value) => {
    setDetails({ ...details, [key]: value });
  };

  const handleSave = async () => {
    const updates = Object.keys(details).map(key => {
      return supabase.from('site_content').upsert({ section_key: key, content_text: details[key] }, { onConflict: 'section_key' });
    });
    await Promise.all(updates);
    alert("Contact Details Updated!");
  };

  return (
    <div style={styles.fadeIn}>
      <div style={styles.card}>
        <h4>Edit Contact Information</h4>
        <div style={styles.form}>
          <label>Email Address</label>
          <input value={details.email} onChange={e => handleChange('email', e.target.value)} style={styles.input} />
          <label>Phone Number</label>
          <input value={details.phone} onChange={e => handleChange('phone', e.target.value)} style={styles.input} />
          <label>Address</label>
          <input value={details.address} onChange={e => handleChange('address', e.target.value)} style={styles.input} />
          <label>LinkedIn URL</label>
          <input value={details.linkedin} onChange={e => handleChange('linkedin', e.target.value)} style={styles.input} />
          <label>GitHub URL</label>
          <input value={details.github} onChange={e => handleChange('github', e.target.value)} style={styles.input} />
          <label>Facebook URL</label>
          <input value={details.facebook} onChange={e => handleChange('facebook', e.target.value)} style={styles.input} />
          <button onClick={handleSave} style={{...styles.primaryBtn, marginTop: '20px'}}>Save All Changes</button>
        </div>
      </div>
    </div>
  );
};



const NavButton = ({ label, icon, tab, active, set }) => (
  <button 
    onClick={() => set(tab)} 
    style={active === tab ? styles.activeLink : styles.link}
  >
    <span style={{marginRight: "10px"}}>{icon}</span> {label}
  </button>
);

const styles = {
  container: { display: "flex", minHeight: "100vh", backgroundColor: "#121212", color: "white !important", fontFamily: "'Segoe UI', sans-serif" },
  sidebar: { width: "260px", backgroundColor: "#1e1e1e", padding: "20px", display: "flex", flexDirection: "column", borderRight: "1px solid #333" },
  mainContent: { flex: 1, padding: "40px", overflowY: "auto", background: "#121212" },
  logo: { marginBottom: "40px", color: "#bd73ff", textAlign: "center", fontSize: "1.5rem" },
  nav: { display: "flex", flexDirection: "column", gap: "10px", flex: 1 },
  link: { background: "transparent", border: "none", color: "#aaa", textAlign: "left", padding: "12px 15px", cursor: "pointer", fontSize: "16px", borderRadius: "8px", display: "flex", alignItems: "center", transition: "0.2s" },
  activeLink: { background: "linear-gradient(90deg, #8A2BE2 0%, #bd73ff 100%)", border: "none", color: "white", textAlign: "left", padding: "12px 15px", cursor: "pointer", fontSize: "16px", borderRadius: "8px", display: "flex", alignItems: "center", fontWeight: "bold" },
  logoutBtn: { padding: "12px", background: "#d9534f", color: "white", border: "none", borderRadius: "8px", cursor: "pointer", marginTop: "auto", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' },
  header: { marginBottom: "30px", borderBottom: "1px solid #333", paddingBottom: "15px", color: "white !important" },
  card: { background: "#1e1e1e", padding: "25px", borderRadius: "12px", marginBottom: "25px", border: "1px solid #333" },
  form: { display: "flex", flexDirection: "column", gap: "12px" },
  input: { padding: "12px", background: "#2a2a2a", border: "1px solid #444", color: "white", borderRadius: "6px", width: "100%", boxSizing: "border-box" },
  primaryBtn: { padding: "12px 24px", background: "#8A2BE2", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", transition: "0.2s" },
  updateBtn: { padding: "12px 24px", background: "#FFA500", color: "black", border: "none", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", transition: "0.2s" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" },

  itemCard: { 
    background: "#252525", 
    padding: "15px", 
    borderRadius: "10px", 
    border: "1px solid #333",
    display: "flex", 
    flexDirection: "column", 
    justifyContent: "space-between", 
    minHeight: "100%" 
  },
  

  editBtn: { 
    width: "100%", 
    background: "#3498db", 
    color: "white", 
    border: "none", 
    padding: "10px 0", 
    borderRadius: "5px", 
    cursor: "pointer", 
    fontWeight: "bold",
    textAlign: "center"
  },
  
  deleteBtn: { 
    width: "100%", 
    background: "#ff4d4d", 
    color: "white", 
    border: "none", 
    padding: "10px 0", 
    borderRadius: "5px", 
    cursor: "pointer", 
    fontWeight: "bold",
    textAlign: "center"
  },

  iconBtn: { background: "transparent", border: "none", color: "#ff4d4d", cursor: "pointer", fontSize: "1.2rem" },
  rowCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#252525', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #bd73ff' },
  miniCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#2a2a2a', marginBottom: '8px', borderRadius: '5px' },
  loading: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#121212", color: "white" },

};

export default Dashboard;