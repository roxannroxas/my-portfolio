import React, { useState, useEffect } from "react";
import "./ContactPage.css";
import { FaEnvelope, FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";

const ContactPage = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [emails, setEmails] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

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
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaEnvelope className="contact-icon gmail-icon" />
              {unreadCount > 0 && <span className="badge">{unreadCount}</span>}

              {showDropdown && (
                <div className="dropdown">
                  {emails.length === 0 ? (
                    <p className="loading">Checking for new emails...</p>
                  ) : (
                    <ul className="email-list">
                      {emails.map((email) => (
                        <li key={email.id}>
                          <strong>{email.sender}</strong>
                          <span>{email.subject}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=roxanne.roxas@email.lcup.edu.ph"
              target="_blank"
              rel="noreferrer"
            >
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
    </section>
  );
};

export default ContactPage;
