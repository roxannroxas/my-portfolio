import React from "react";
import "./ContactPage.css";
import { FaEnvelope, FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

const ContactPage = () => {
  return (
    <section className="contact-page">
      <div className="contact-container">
        <h2 className="contact-title">Get in Touch</h2>
        <p className="contact-subtitle">
          I'd love to hear from you! Feel free to reach out through any of the platforms below:
        </p>

        <ul className="contact-list">
          <li>
            <FaEnvelope className="contact-icon" />
            <a href="mailto:roxanne.roxas@email.lcup.edu.ph">roxanne.roxas@email.lcup.edu.ph</a>
          </li>
          <li>
            <FaLinkedin className="contact-icon" />
            <a href="https://www.linkedin.com/in/roxanne-roxas-758977382/" target="_blank" rel="noreferrer">
              LinkedIn Profile
            </a>
          </li>
          <li>
            <FaGithub className="contact-icon" />
            <a href="https://github.com/roxannroxas" target="_blank" rel="noreferrer">
              GitHub Profile
            </a>
          </li>
          <li>
            <FaFacebook className="contact-icon" />
            <a href="https://www.facebook.com/rxsroxanne17" target="_blank" rel="noreferrer">
              Facebook Profile
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default ContactPage;
