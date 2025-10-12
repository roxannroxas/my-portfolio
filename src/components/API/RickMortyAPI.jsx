import React, { useState, useEffect } from "react";
import "./API.css";
import { Atom } from "lucide-react"; // fun icon substitute for Alien

const RickMortyAPI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [character, setCharacter] = useState(null);

  // 🧪 Fetch a random Rick & Morty character
  const getRandomCharacter = async () => {
    try {
      const randomId = Math.floor(Math.random() * 826) + 1;
      const res = await fetch(`https://rickandmortyapi.com/api/character/${randomId}`);
      const data = await res.json();
      setCharacter(data);
    } catch (error) {
      console.error("Error fetching character:", error);
    }
  };

  useEffect(() => {
    if (isOpen) getRandomCharacter();
  }, [isOpen]);

  return (
    <>
      
      <button
        className={`api-toggle-btn rickmorty-toggle ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "×" : "🧪"}
      </button>

   
      <div className={`api-sidebar rickmorty-sidebar ${isOpen ? "open" : ""}`}>
        <h2><Atom className="icon" /> Rick & Morty</h2>

        <div className="api-content">
          {character ? (
            <>
              <img
                src={character.image}
                alt={character.name}
                className="character-img"
              />
              <h3>{character.name}</h3>
              <p>Status: {character.status}</p>
              <p>Species: {character.species}</p>
              <p>Origin: {character.origin?.name}</p>
              <button onClick={getRandomCharacter}>New Character</button>
            </>
          ) : (
            <p>Loading character...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default RickMortyAPI;
