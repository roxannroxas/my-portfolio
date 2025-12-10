import React, { useState, useEffect, useRef } from "react";
import emailjs from "emailjs-com";
import { supabase } from "../supabaseClient";
import "./ContactPage.css";
import { 
  FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, 
  FaLinkedin, FaGithub, FaFacebook, FaUser, FaPen, FaPaperPlane 
} from "react-icons/fa";

const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const form = useRef();

  const [contactInfo, setContactInfo] = useState({
    email: "Loading...",
    phone: "Loading...",
    address: "Loading...",
    linkedin: "#",
    github: "#",
    facebook: "#"
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from('site_content').select('*');
      if (data) {
        const newInfo = { ...contactInfo };
        data.forEach(item => {
          if (newInfo.hasOwnProperty(item.section_key)) {
            newInfo[item.section_key] = item.content_text;
          }
        });
        setContactInfo(newInfo);
      }
    };
    fetchData();
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    emailjs
      .sendForm(
        "service_a68fwe3",  
        "template_kpic359", 
        form.current,
        "ILJx2OdUM_cafwinA" 
      )
      .then(
        () => {
          setLoading(false);
          setStatus("success");
          form.current.reset();
          setTimeout(() => setStatus(""), 5000);
        },
        (error) => {
          console.error("Email error:", error);
          setLoading(false);
          setStatus("error");
        }
      );
  };

  return (
    <section className="contact-hero">
      <div className="contact-container">
        

        <div className="contact-info-card">
          <div className="contact-header">
            <h2>Get in Touch</h2>
            <p>
              I'd love to hear from you! Whether you have a project idea, 
              a question, or just want to say hi, feel free to drop a message.
            </p>
          </div>

          <ul className="contact-details">
            <li>
              <div className="icon-box"><FaEnvelope /></div>
              <span>{contactInfo.email}</span>
            </li>
            <li>
              <div className="icon-box"><FaPhoneAlt /></div>
              <span>{contactInfo.phone}</span>
            </li>
            <li>
              <div className="icon-box"><FaMapMarkerAlt /></div>
              <span>{contactInfo.address}</span>
            </li>
          </ul>

          <div className="social-links">
            <a href={contactInfo.linkedin} target="_blank" rel="noreferrer" className="social-btn"><FaLinkedin /></a>
            <a href={contactInfo.github} target="_blank" rel="noreferrer" className="social-btn"><FaGithub /></a>
            <a href={contactInfo.facebook} target="_blank" rel="noreferrer" className="social-btn"><FaFacebook /></a>
          </div>
        </div>


        <div className="contact-form-wrapper">
          <h3>Send a Message</h3>
          
          <form ref={form} onSubmit={sendEmail}>
            
            <div className="form-row">
              <div className="form-group">
                <input type="text" name="name" className="form-input" placeholder="Your Name" required />
                <FaUser className="form-icon" />
              </div>

              <div className="form-group">
                <input type="email" name="email" className="form-input" placeholder="Your Email" required />
                <FaEnvelope className="form-icon" />
              </div>
            </div>

            <div className="form-group">
              <input type="text" name="title" className="form-input" placeholder="Subject" required />
              <FaPen className="form-icon" />
            </div>

            <div className="form-group">
              <textarea name="message" className="form-textarea" placeholder="Your Message..." required></textarea>

              <div className="form-icon" style={{top: "18px"}}><FaPaperPlane /></div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status === "success" && <div className="status-msg success">Message sent successfully!</div>}
            {status === "error" && <div className="status-msg error">Failed to send. Please try again.</div>}

          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactPage;