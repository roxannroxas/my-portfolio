import React, { useState, useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import "./ContactPage.css";
import { FaEnvelope, FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

const ContactPage = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [emails, setEmails] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const form = useRef();

  useEffect(() => {
    const fetchEmails = async () => {
      setTimeout(() => {
        const mockEmails = [
          { id: 1, subject: "Welcome to Gmail!", sender: "Google" },
          { id: 2, subject: "Project Update - API", sender: "Angel Galang" },
        ];
        setEmails(mockEmails);
        setUnreadCount(mockEmails.length);
      }, 1000);
    };
    fetchEmails();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setFormStatus("Sending...");

    emailjs
      .sendForm(
        "service_a68fwe3", 
        "template_kpic359", 
        form.current,
        "ILJx2OdUM_cafwinA" 
      )
      .then(
        () => {
          setFormStatus("✅ Message sent successfully!");
          e.target.reset();
          setTimeout(() => handleClose(), 1500);
        },
        (error) => {
          console.error("Email send error:", error);
          setFormStatus("❌ Failed to send message. Try again later.");
        }
      );
  };

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowForm(false);
      setIsClosing(false);
      setFormStatus("");
    }, 300); 
  };

  return (
    <section className="contact-page">
      <div className="contact-container">
        <h2 className="contact-title">Get in Touch</h2>
        <p className="contact-subtitle">
          I'd love to hear from you! Feel free to reach out through any of the platforms below:
        </p>

        <ul className="contact-list">
          <li className="contact-item">
            <div
              className="gmail-notification"
              onClick={() => setShowForm(true)}
            >
              <FaEnvelope className="contact-icon gmail-icon" />
              {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
            </div>
            <a href="#" onClick={(e) => { e.preventDefault(); setShowForm(true); }}>
              roxanne.roxas@email.lcup.edu.ph
            </a>
          </li>

          <li>
            <FaLinkedin className="contact-icon" />
            <a
              href="https://www.linkedin.com/in/roxanne-roxas-758977382/"
              target="_blank"
              rel="noreferrer"
            >
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

      {showForm && (
        <div
          className={`popup-overlay ${isClosing ? "hide" : ""}`}
          onClick={handleClose}
        >
          <div className="popup-container" onClick={(e) => e.stopPropagation()}>
            <h3>📩 Send a Message</h3>
            <form ref={form} onSubmit={sendEmail} className="contact-form">
              <input type="text" name="name" placeholder="Your Name" required />
              <input type="email" name="email" placeholder="Your Email" required />
              <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
              <button type="submit">Send Message</button>
              {formStatus && <p className="form-status">{formStatus}</p>}
            </form>

            <button className="close-btn" onClick={handleClose}>
              ✖ Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactPage;
