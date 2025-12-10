import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/NavBar/AppNav"; 
import Header from "./components/Header/Header";
import About from "./components/About/About";
import AboutMe from "./components/AboutMe/AboutMe";
import Projects from "./components/Projects/Projects";
import SkillsPage from "./components/Skills/SkillsPage"; 
import Skills from "./components/Skills/Skills"; 
import Contact from "./components/Contact/Contact"; 
import ContactPage from "./components/Contact/ContactPage";
import API from "./components/API/API"; 
import CatSurprise from "./components/CatSurprise/CatSurprise";
import RickMortyAPI from "./components/API/RickMortyAPI";
import Login from "./components/Admin/Login";
import Dashboard from "./components/Admin/Dashboard";

import Aurora from "./components/Aurora/Aurora"; 

import "./App.css";

function App() {
    const location = useLocation();
  
  const isAdmin = location.pathname.startsWith("/admin");
  return (
    <div className="app-container">
 
      <Aurora 
        colorStops={['#2d0b45', '#8A2BE2', '#000000']} 
        speed={0.5} 
        amplitude={1.0} 
      />

      <Routes>

        <Route path="/admin" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />

        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Header />
              <About />
              <Skills />  
              <Contact /> 
            </>
          }
        />


        <Route
          path="/about-me"
          element={
            <>
              <Navbar />
              <AboutMe />
            </>
          }
        />


        <Route
          path="/projects"
          element={
            <>
              <Navbar />
              <Projects />
            </>
          }
        />


        <Route
          path="/skills"
          element={
            <>
              <Navbar />
              <SkillsPage />
            </>
          }
        />


        <Route
          path="/contact"
          element={
            <>
              <Navbar />
              <ContactPage />
            </>
          }
        />
      </Routes>


      {!isAdmin && (
        <>
          <API />
          <CatSurprise />
        </>
      )}
  
    </div>
  );
}
export default App;