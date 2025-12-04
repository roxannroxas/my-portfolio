import "./Contact.css";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

const contacts = [
  {
    icon: <FaEnvelope className="contact-icon" />,
    title: "Email",
    link: "mailto:roxanneroxas23@gmail.com",
    label: "roxanneroxas23@gmail.com",
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

const ContactCard = ({ icon, title, link, label }) => (
  <div className="contact-card">
    {icon}
    <h3>{title}</h3>
    <p>
      <a href={link} target="_blank" rel="noreferrer">
        {label}
      </a>
    </p>
  </div>
);

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
