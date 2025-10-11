import React, { useState, useEffect, useRef } from "react";
import "./API.css";
import { Cat } from "lucide-react";

const API = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [joke, setJoke] = useState("");
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const audioRef = useRef(null);

 
  const fetchJoke = async () => {
    try {
      const response = await fetch("https://v2.jokeapi.dev/joke/Programming?type=single");
      const data = await response.json();
      setJoke(data.joke || "No joke found 😅");
    } catch (error) {
      setJoke("Failed to fetch a joke 😅");
    }
  };


  const fetchQuote = async () => {
    try {
     
      const response = await fetch("https://api.quotable.io/random?tags=technology|famous-quotes");
      if (!response.ok) throw new Error("Quote API failed");

      const data = await response.json();
      setQuote(data.content || "No quote available 😅");
      setAuthor(data.author || "Unknown");
    } catch (error) {
     
      const fallbackQuotes = [
        { quote: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
        { quote: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson" },
        { quote: "First, solve the problem. Then, write the code.", author: "John Johnson" },
        { quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
      ];
      const random = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      setQuote(random.quote);
      setAuthor(random.author);
    }
  };

  
  useEffect(() => {
    if (isOpen) {
      fetchJoke();
      fetchQuote();

     
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [isOpen]);

  return (
    <>
  
      <button
        className={`api-toggle-btn ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "×" : "🧩"}
      </button>


      <div className={`api-sidebar ${isOpen ? "open" : ""}`}>
        <h2>Programming Fun</h2>

        <div className="api-content">
          <div className="api-section">
            <h3>💡 Joke</h3>
            <p>{joke || "Click 'New Joke' to load one!"}</p>
            <button onClick={fetchJoke}>New Joke</button>
          </div>

          <div className="api-section">
            <h3>💬 Quote</h3>
            <p>"{quote || "Click 'New Quote' to load one!"}"</p>
            {author && <p className="author">– {author}</p>}
            <button onClick={fetchQuote}>New Quote</button>
          </div>
        </div>
      </div>

  
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/sfx/preview/mixkit-quick-win-video-game-notification-269.wav"
        preload="auto"
      ></audio>
    </>
  );
};

export default API;
