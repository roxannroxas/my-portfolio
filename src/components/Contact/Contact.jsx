import "./Contact.css";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">Contact Me</h2>
      <div className="contact-cards">
        <div className="contact-card">
          <FaEnvelope className="contact-icon" />
          <h3>Email</h3>
          <p>
            <a href="mailto:roxanne.roxas@email.lcup.edu.ph">roxanne.roxas@email.lcup.edu.ph</a>
          </p>
        </div>

        <div className="contact-card">
          <FaLinkedin className="contact-icon" />
          <h3>LinkedIn</h3>
          <p>
            <a href="https://www.linkedin.com/in/roxanne-roxas-758977382/" target="_blank" rel="noreferrer">
              linkedin.com/in/roxanne-roxas
            </a>
          </p>
        </div>

        <div className="contact-card">
          <FaGithub className="contact-icon" />
          <h3>GitHub</h3>
          <p>
            <a href="https://github.com/roxannroxas"target="_blank" rel="noreferrer">
              github.com/roxannroxas
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
