import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar/NavBar"; 
import Header from "./components/Header/Header";
import About from "./components/About/About";
import AboutMe from "./components/AboutMe/AboutMe";
import Projects from "./components/Projects/Projects";
import SkillsPage from "./components/Skills/SkillsPage"; 
import Skills from "./components/Skills/Skills"; 
import Contact from "./components/Contact/Contact"; 
import ContactPage from "./components/Contact/ContactPage";

import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Routes>
        {/* Home Page */}
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

        {/* About Me Page */}
        <Route
          path="/about-me"
          element={
            <>
              <Navbar />
              <AboutMe />
            </>
          }
        />

        {/* Projects Page */}
        <Route
          path="/projects"
          element={
            <>
              <Navbar />
              <Projects />
            </>
          }
        />

        {/* Skills Full Page */}
        <Route
          path="/skills"
          element={
            <>
              <Navbar />
              <SkillsPage />
            </>
          }
        />

        {/* Contact Full Page */}
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
    </div>
  );
}

export default App;
