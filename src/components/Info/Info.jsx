import React from "react";
import "./Info.css";

const tips = [
  "Debugging is like being the detective in a crime movie where you are also the murderer.",
  "First, solve the problem. Then, write the code.",
  "Learning never exhausts the mind – keep exploring new technologies!",
  "Code is like humor. When you have to explain it, it’s bad.",
  "Stay curious, stay humble, and keep building!"
];

const Info = () => {
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <section className="info-container">
      <div className="bio">
        <h2>Inspirational Quote</h2>
        <p>
          “<span className="highlight">Technology</span> is best when it brings
          people <span className="highlight">together</span>.” – Matt Mullenweg
        </p>
      </div>
      <div className="tip">
        <h3>💡 IT Tip of the Day</h3>
        <p>{randomTip}</p>
      </div>
    </section>
  );
};

export default Info;
