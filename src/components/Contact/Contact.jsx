import "./Contact.css";
import { Link } from "react-router-dom"; 
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

const contacts = [
  {
    icon: <FaEnvelope className="contact-icon" />,
    title: "Email",
    link: "/contact", 
    label: "Send me a message", 
    isInternal: true, 
    icon: <FaLinkedin className="contact-icon" />,
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/roxanne-roxas-758977382/",
    label: "linkedin.com/in/roxanne-roxas",
    isInternal: false,
  },
  {
    icon: <FaGithub className="contact-icon" />,
    title: "GitHub",
    link: "https://github.com/roxannroxas",
    label: "github.com/roxannroxas",
    isInternal: false,
  },
];

const ContactCard = ({ icon, title, link, label, isInternal }) => {
  return (
    <div className="contact-card">
      {icon}
      <h3>{title}</h3>
      <p>
        
        {isInternal ? (
          <Link to={link} className="contact-link">
            {label}
          </Link>
        ) : (
          <a href={link} target="_blank" rel="noreferrer" className="contact-link">
            {label}
          </a>
        )}
      </p>
    </div>
  );
};

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <h2 className="section-title">Contact Me</h2>
      <div className="contact-cards">
        {contacts.map((contact, index) => (
          <ContactCard key={index} {...contact} />
        ))}
      </div>
    </section>
  );
}

export default Contact;