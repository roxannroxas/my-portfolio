import "./Contact.css";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

const contacts = [
  {
    icon: <FaEnvelope className="contact-icon" />,
    title: "Email",
    link: "mailto:roxanne.roxas@email.lcup.edu.ph",
    label: "roxanne.roxas@email.lcup.edu.ph",
  },
  {
    icon: <FaLinkedin className="contact-icon" />,
    title: "LinkedIn",
    link: "https://www.linkedin.com/in/roxanne-roxas-758977382/",
    label: "linkedin.com/in/roxanne-roxas",
  },
  {
    icon: <FaGithub className="contact-icon" />,
    title: "GitHub",
    link: "https://github.com/roxannroxas",
    label: "github.com/roxannroxas",
  },
];

const ContactCard = ({ icon, title, link, label }) => {
  const isEmail = link.startsWith("mailto:");

  return (
    <div className="contact-card">
      {icon}
      <h3>{title}</h3>
      <p>
        <a 
          href={link} 
          target={isEmail ? "_self" : "_blank"} 
          rel="noreferrer"
        >
          {label}
        </a>
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