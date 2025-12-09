import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { FaProjectDiagram, FaUser, FaCode, FaAddressBook, FaSignOutAlt, FaTrash, FaPlus, FaEdit, FaCube } from "react-icons/fa";


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
        <h2 style={styles.logo}>Kirby's Panel<span style={{color:"#bd73ff"}}>.</span></h2>
        <nav style={styles.nav}>
          <NavButton label="Projects" icon={<FaProjectDiagram />} tab="projects" active={activeTab} set={setActiveTab} />
          <NavButton label="Skills" icon={<FaCode />} tab="skills" active={activeTab} set={setActiveTab} />
          <NavButton label="About Me" icon={<FaUser />} tab="about" active={activeTab} set={setActiveTab} />
          <NavButton label="Contact Info" icon={<FaAddressBook />} tab="contact" active={activeTab} set={setActiveTab} />
        </nav>
        <button onClick={handleLogout} style={styles.logoutBtn}><FaSignOutAlt /> Logout</button>
      </div>

    
      <div style={styles.mainContent}>
        <h2 style={styles.header}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Manager</h2>
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
    setForm({ title: project.title, tech: project.tech, desc: project.description });
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
        alert("Please select an image!");
        setUploading(false); return;
      }

      const projectData = { title: form.title, tech: form.tech, description: form.desc, image_url: publicUrl };

      if (editingId) {
        await supabase.from('projects').update(projectData).eq('id', editingId);
        alert("Updated!");
      } else {
        await supabase.from('projects').insert(projectData);
        alert("Added!");
      }
      handleCancelEdit(); fetchProjects();
    } catch (err) { alert(err.message); } 
    finally { setUploading(false); }
  };

  const handleDelete = async (id) => {
    if(window.confirm("Delete this project?")) {
      await supabase.from('projects').delete().eq('id', id);
      fetchProjects();
    }
  };

  return (
    <div style={styles.fadeIn}>
      <div style={styles.card}>
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px"}}>
          <h4 style={{margin: 0}}>{editingId ? "Edit Project" : "Add New Project"}</h4>
          {editingId && <button onClick={handleCancelEdit} style={styles.cancelBtn}>Cancel</button>}
        </div>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input placeholder="Project Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} style={styles.input} />
          <input placeholder="Tech Stack (e.g. React, Supabase)" value={form.tech} onChange={e => setForm({...form, tech: e.target.value})} style={styles.input} />
          <textarea placeholder="Description" value={form.desc} onChange={e => setForm({...form, desc: e.target.value})} rows="3" style={styles.input} />
          <div style={{display: "flex", flexDirection: "column", gap: "5px"}}>
             <label style={{fontSize: "0.9rem", color: "#ccc"}}>{editingId ? "Change Media" : "Project Media"}</label>
             <input type="file" accept="image/*, .glb, .gltf" onChange={e => setImageFile(e.target.files[0])} style={styles.fileInput} />
          </div>
          <button type="submit" disabled={uploading} style={editingId ? styles.updateBtn : styles.primaryBtn}>
            {uploading ? "Processing..." : (editingId ? "Update Project" : "Add Project")}
          </button>
        </form>
      </div>

      <div style={styles.grid}>
        {projects.map(p => (
          <div key={p.id} style={styles.itemCard}>
            <div style={styles.mediaPreview}>
               {p.image_url && (p.image_url.endsWith('.glb') || p.image_url.endsWith('.gltf')) ? (
                  <div style={styles.iconPreview}><FaCube size={40} /><span>3D Model</span></div>
               ) : (
                  <img src={p.image_url} alt="project" style={{width: "100%", height: "100%", objectFit: "cover"}} />
               )}
            </div>
            <h4 style={{margin: "12px 0 5px 0", color: "white"}}>{p.title}</h4>
            <p style={{fontSize: "0.8rem", color: "#bd73ff", marginBottom: "15px", flex: 1}}>{p.tech}</p>
            <div style={styles.buttonGrid}>
               <button onClick={() => handleEditClick(p)} style={styles.editBtn}>Edit</button>
               <button onClick={() => handleDelete(p.id)} style={styles.deleteBtn}>Delete</button>
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
  const [editingSkillId, setEditingSkillId] = useState(null); 
  const fetchSkills = async () => {
    let { data } = await supabase.from('skill_categories').select('*').order('id');
    if (data) setCategories(data);
  };

  useEffect(() => { fetchSkills(); }, []);


  const handleEditSkill = (item) => {
    setEditingSkillId(item.id);
    setNewCat({ 
      category_name: item.category_name, 
      skills_list: item.skills_list 
    });

    document.getElementById("skillForm").scrollIntoView({ behavior: 'smooth' });
  };


  const handleCancelSkill = () => {
    setEditingSkillId(null);
    setNewCat({ category_name: "", skills_list: "" });
  };


  const handleSaveSkill = async () => {
    if (!newCat.category_name) return alert("Category Name is required!");

    if (editingSkillId) {

      await supabase.from('skill_categories')
        .update(newCat)
        .eq('id', editingSkillId);
      alert("Skill Category Updated!");
    } else {

      await supabase.from('skill_categories').insert(newCat);
      alert("Skill Category Added!");
    }
    
    handleCancelSkill();
    fetchSkills();
  };

  const handleDelete = async (id) => {
    if(window.confirm("Delete this category?")) {
      await supabase.from('skill_categories').delete().eq('id', id);
      fetchSkills();
    }
  };

  return (
    <div style={styles.fadeIn}>
      <div style={styles.card} id="skillForm">
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px"}}>
          <h4>{editingSkillId ? "Edit Skill Category" : "Add Skill Category"}</h4>
          {editingSkillId && (
            <button onClick={handleCancelSkill} style={styles.cancelBtn}>
              Cancel Edit
            </button>
          )}
        </div>

        <div style={{display: 'flex', gap: '10px', flexDirection: 'column'}}>
          <input 
            placeholder="Category Name (e.g. Programming)" 
            value={newCat.category_name} 
            onChange={e => setNewCat({...newCat, category_name: e.target.value})} 
            style={styles.input} 
          />
          <input 
            placeholder="Skills List (e.g. Java, Python, PHP)" 
            value={newCat.skills_list} 
            onChange={e => setNewCat({...newCat, skills_list: e.target.value})} 
            style={styles.input} 
          />
          <button 
            onClick={handleSaveSkill} 
            style={editingSkillId ? styles.updateBtn : styles.primaryBtn}
          >
            {editingSkillId ? "Update Category" : "Add Category"}
          </button>
        </div>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
        {categories.map(cat => (
          <div key={cat.id} style={styles.rowCard}>
            <div style={{flex: 1}}>
              <h4 style={{margin: 0, color: '#bd73ff'}}>{cat.category_name}</h4>
              <p style={{margin: '5px 0', fontSize: '0.9rem', color: '#ccc'}}>{cat.skills_list}</p>
            </div>
            
            <div style={{display: "flex", gap: "10px", alignItems: "center"}}>
           
                <button onClick={() => handleEditSkill(cat)} style={styles.iconEdit} title="Edit">
                  <FaEdit />
                </button>
            
                <button onClick={() => handleDelete(cat.id)} style={styles.iconDelete} title="Delete">
                  <FaTrash />
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const AboutManager = () => {  
  const [education, setEducation] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [newEdu, setNewEdu] = useState({ school: "", detail: "", awards: "" });
  const [newAch, setNewAch] = useState("");
  const [texts, setTexts] = useState({ bio: "", header_title: "", header_subtitle: "", about_summary: "" });
  const [editingEduId, setEditingEduId] = useState(null); 

  const fetchData = async () => {
    const eduReq = supabase.from('education').select('*').order('id', { ascending: true });
    const achReq = supabase.from('achievements').select('*').order('id', { ascending: true });
    const contentReq = supabase.from('site_content').select('*');
    const [eduRes, achRes, contentRes] = await Promise.all([eduReq, achReq, contentReq]);
    if (eduRes.data) setEducation(eduRes.data);
    if (achRes.data) setAchievements(achRes.data);
    if (contentRes.data) {
      const newTexts = { ...texts };
      contentRes.data.forEach(item => { if (newTexts.hasOwnProperty(item.section_key)) newTexts[item.section_key] = item.content_text; });
      setTexts(newTexts);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const saveText = async (key, value) => {
    await supabase.from('site_content').upsert({ section_key: key, content_text: value }, { onConflict: 'section_key' });
    alert("Updated!");
  };

  const handleEditEdu = (item) => {
    setEditingEduId(item.id);
    setNewEdu({ school: item.school, detail: item.detail, awards: item.awards || "" });
    document.getElementById("eduForm").scrollIntoView({ behavior: 'smooth' });
  };

  const handleSaveEdu = async () => {
    if (!newEdu.school || !newEdu.detail) return alert("School and Detail required!");
    if (editingEduId) await supabase.from('education').update(newEdu).eq('id', editingEduId);
    else await supabase.from('education').insert(newEdu);
    setEditingEduId(null); setNewEdu({ school: "", detail: "", awards: "" }); fetchData();
  };

  const deleteEdu = async (id) => { if(window.confirm("Delete?")) { await supabase.from('education').delete().eq('id', id); fetchData(); }};
  const addAch = async () => { await supabase.from('achievements').insert({ title: newAch }); setNewAch(""); fetchData(); };
  const deleteAch = async (id) => { await supabase.from('achievements').delete().eq('id', id); fetchData(); };

  return (
    <div style={styles.fadeIn}>
      <div style={styles.card}>
        <h4>Edit Home Header</h4>
        <label style={styles.label}>Main Title</label>
        <input value={texts.header_title} onChange={e => setTexts({...texts, header_title: e.target.value})} style={{...styles.input, marginBottom: "10px"}} />
        <label style={styles.label}>Subtitle</label>
        <input value={texts.header_subtitle} onChange={e => setTexts({...texts, header_subtitle: e.target.value})} style={styles.input} />
        <div style={{marginTop: "10px", display:"flex", gap:"10px"}}>
          <button onClick={() => saveText('header_title', texts.header_title)} style={styles.primaryBtn}>Save Title</button>
          <button onClick={() => saveText('header_subtitle', texts.header_subtitle)} style={styles.primaryBtn}>Save Subtitle</button>
        </div>
      </div>

      <div style={styles.card}>
        <h4>Edit "About" Summaries</h4>
        <label style={styles.label}>Home Page Summary</label>
        <textarea rows="3" value={texts.about_summary} onChange={e => setTexts({...texts, about_summary: e.target.value})} style={{...styles.input, marginBottom:"10px"}} />
        <button onClick={() => saveText('about_summary', texts.about_summary)} style={styles.primaryBtn}>Save Home Summary</button>
        
        <label style={{...styles.label, marginTop:"20px", display:"block"}}>Full Bio (About Page)</label>
        <textarea rows="5" value={texts.bio} onChange={e => setTexts({...texts, bio: e.target.value})} style={{...styles.input, marginBottom:"10px"}} />
        <button onClick={() => saveText('bio', texts.bio)} style={styles.primaryBtn}>Save Full Bio</button>
      </div>

      <div style={styles.card} id="eduForm">
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px"}}>
           <h4 style={{margin:0}}>Education</h4>
           {editingEduId && <button onClick={() => {setEditingEduId(null); setNewEdu({ school: "", detail: "", awards: "" })}} style={styles.cancelBtn}>Cancel Edit</button>}
        </div>
        <div style={{display: 'flex', gap: '10px', marginBottom: '10px'}}>
          <input placeholder="School" value={newEdu.school} onChange={e => setNewEdu({...newEdu, school: e.target.value})} style={styles.input} />
          <input placeholder="Detail (Year/Course)" value={newEdu.detail} onChange={e => setNewEdu({...newEdu, detail: e.target.value})} style={styles.input} />
        </div>
        <input placeholder="Awards" value={newEdu.awards} onChange={e => setNewEdu({...newEdu, awards: e.target.value})} style={{...styles.input, marginBottom:'10px'}} />
        <button onClick={handleSaveEdu} style={editingEduId ? styles.updateBtn : styles.primaryBtn}>
          {editingEduId ? "Update Education" : "Add Education"}
        </button>
        
        <div style={{marginTop: '20px'}}>
          {education.map(edu => (
            <div key={edu.id} style={styles.miniCard}>
              <div style={{flex: 1}}>
                <strong style={{color:"white"}}>{edu.school}</strong><br/>
                <span style={{fontSize:'0.85rem', color: "#ccc"}}>{edu.detail}</span>
                {edu.awards && <div style={{fontSize:'0.85rem', color: "#bd73ff"}}>🏆 {edu.awards}</div>}
              </div>
              <div style={{display: "flex", gap: "10px"}}>
                <button onClick={() => handleEditEdu(edu)} style={styles.iconEdit}><FaEdit /></button>
                <button onClick={() => deleteEdu(edu.id)} style={styles.iconDelete}><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.card}>
        <h4>Achievements</h4>
        <div style={{display: 'flex', gap: '10px'}}>
          <input placeholder="Achievement" value={newAch} onChange={e => setNewAch(e.target.value)} style={styles.input} />
          <button onClick={addAch} style={styles.primaryBtn}>Add</button>
        </div>
        <div style={{marginTop: '15px'}}>
          {achievements.map(ach => (
             <div key={ach.id} style={styles.miniCard}><span>{ach.title}</span><button onClick={() => deleteAch(ach.id)} style={styles.iconDelete}><FaTrash /></button></div>
          ))}
        </div>
      </div>
    </div>
  );
};


const ContactManager = () => {
  const [details, setDetails] = useState({ email: "", phone: "", address: "", linkedin: "", github: "", facebook: "" });

  useEffect(() => {
    const fetchContact = async () => {
      const { data } = await supabase.from('site_content').select('*');
      if (data) {
        const newDetails = { ...details };
        data.forEach(item => { if (newDetails.hasOwnProperty(item.section_key)) newDetails[item.section_key] = item.content_text; });
        setDetails(newDetails);
      }
    }; fetchContact();
  }, []);

  const handleChange = (key, value) => setDetails({ ...details, [key]: value });
  const handleSave = async () => {
    const updates = Object.keys(details).map(key => supabase.from('site_content').upsert({ section_key: key, content_text: details[key] }, { onConflict: 'section_key' }));
    await Promise.all(updates); alert("Updated!");
  };

  return (
    <div style={styles.fadeIn}>
      <div style={styles.card}>
        <h4>Edit Contact Info</h4>
        <div style={styles.form}>
          {Object.keys(details).map((key) => (
            <div key={key}>
              <label style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input value={details[key]} onChange={e => handleChange(key, e.target.value)} style={styles.input} />
            </div>
          ))}
          <button onClick={handleSave} style={{...styles.primaryBtn, marginTop: '20px'}}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};


const NavButton = ({ label, icon, tab, active, set }) => (
  <button onClick={() => set(tab)} style={active === tab ? styles.activeLink : styles.link}>
    <span style={{marginRight: "12px"}}>{icon}</span> {label}
  </button>
);

const styles = {

  container: { 
    display: "flex", 
    minHeight: "100vh", 
    background: "radial-gradient(circle at top left, #2d0b45 0%, #050505 100%)", 
    color: "white", 
    fontFamily: "'Segoe UI', sans-serif" 
  },
  

  sidebar: { 
    width: "260px", 
    background: "rgba(20, 20, 20, 0.6)", 
    backdropFilter: "blur(10px)",
    padding: "30px 20px", 
    display: "flex", 
    flexDirection: "column", 
    borderRight: "1px solid rgba(255,255,255,0.05)" 
  },
  
  mainContent: { flex: 1, padding: "40px 60px", overflowY: "auto" },
  logo: { marginBottom: "50px", color: "white", textAlign: "center", fontSize: "1.8rem", fontWeight: "800", letterSpacing: "1px" },
  
 
  nav: { display: "flex", flexDirection: "column", gap: "10px", flex: 1 },
  link: { 
    background: "transparent", border: "none", color: "#aaa", textAlign: "left", padding: "14px 20px", 
    cursor: "pointer", fontSize: "16px", borderRadius: "12px", display: "flex", alignItems: "center", transition: "0.3s" 
  },
  activeLink: { 
    background: "linear-gradient(90deg, rgba(138, 43, 226, 0.2) 0%, rgba(138, 43, 226, 0) 100%)", 
    borderLeft: "4px solid #bd73ff", color: "white", textAlign: "left", padding: "14px 16px", 
    cursor: "pointer", fontSize: "16px", fontWeight: "bold", display: "flex", alignItems: "center" 
  },
  
  logoutBtn: { 
    padding: "12px", background: "rgba(255, 77, 77, 0.1)", color: "#ff4d4d", border: "1px solid rgba(255, 77, 77, 0.2)", 
    borderRadius: "12px", cursor: "pointer", marginTop: "auto", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', transition: "0.3s" 
  },
  
  header: { marginBottom: "30px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "20px", color: "white", fontSize: "2rem" },
  
  
  card: { 
    background: "rgba(30, 30, 30, 0.6)", 
    backdropFilter: "blur(12px)",
    padding: "30px", 
    borderRadius: "20px", 
    marginBottom: "25px", 
    border: "1px solid rgba(138, 43, 226, 0.15)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
  },

  form: { display: "flex", flexDirection: "column", gap: "15px" },
  input: { 
    padding: "14px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", 
    color: "white", borderRadius: "10px", width: "100%", outline: "none", fontSize: "1rem", transition: "0.3s" 
  },
  fileInput: { 
    padding: "10px", background: "rgba(0,0,0,0.3)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.1)", color: "#ccc", width: "100%" 
  },
  label: { fontSize: "0.85rem", color: "#bd73ff", marginBottom: "5px", display: "block", fontWeight: "600" },


  primaryBtn: { 
    padding: "12px 25px", background: "linear-gradient(135deg, #8A2BE2 0%, #bd73ff 100%)", 
    color: "white", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", 
    transition: "0.3s", boxShadow: "0 4px 15px rgba(138, 43, 226, 0.3)" 
  },
  updateBtn: { 
    padding: "12px 25px", background: "linear-gradient(135deg, #FFA500 0%, #FF8C00 100%)", 
    color: "black", border: "none", borderRadius: "10px", cursor: "pointer", fontWeight: "bold", transition: "0.3s" 
  },
  cancelBtn: { 
    background: "rgba(255,255,255,0.1)", color: "#ccc", border: "none", padding: "8px 15px", 
    borderRadius: "8px", cursor: "pointer", fontSize: "0.9rem" 
  },


  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "25px" },
  
  itemCard: { 
    background: "rgba(40, 40, 40, 0.6)", 
    padding: "20px", 
    borderRadius: "16px", 
    border: "1px solid rgba(255,255,255,0.05)",
    display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "100%" 
  },
  
  mediaPreview: { position: "relative", height: "160px", background: "#1a1a1a", borderRadius: "10px", overflow: "hidden", marginBottom: "15px" },
  iconPreview: { width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", color: "#bd73ff", flexDirection: 'column', gap: "10px" },
  
  buttonGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "auto" },
  
  editBtn: { width: "100%", background: "rgba(52, 152, 219, 0.15)", color: "#3498db", border: "1px solid rgba(52, 152, 219, 0.3)", padding: "10px 0", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", textAlign: "center" },
  deleteBtn: { width: "100%", background: "rgba(255, 77, 77, 0.15)", color: "#ff4d4d", border: "1px solid rgba(255, 77, 77, 0.3)", padding: "10px 0", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", textAlign: "center" },

  miniCard: { 
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', 
    background: 'rgba(0,0,0,0.2)', marginBottom: '10px', borderRadius: '10px', border: "1px solid rgba(255,255,255,0.05)" 
  },
  rowCard: { 
    display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.2)', 
    padding: '15px 20px', borderRadius: '12px', borderLeft: '4px solid #bd73ff' 
  },
  
  iconEdit: { background: "transparent", border: "none", color: "#3498db", cursor: "pointer", fontSize: "1.1rem" },
  iconDelete: { background: "transparent", border: "none", color: "#ff4d4d", cursor: "pointer", fontSize: "1.1rem" },
  
  loading: { height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#050505", color: "#bd73ff", fontSize: "1.2rem" },

};

export default Dashboard;