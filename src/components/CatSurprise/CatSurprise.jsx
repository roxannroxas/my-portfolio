import React, { useState, useEffect } from "react";
import { Cat } from "lucide-react"; 
import "./CatSurprise.css";

const CatSurprise = () => {
  const [visible, setVisible] = useState(false);
  const [catPosition, setCatPosition] = useState({ top: "80%", left: "90%" });
  const [showPopup, setShowPopup] = useState(false);

  const randomizePosition = () => {
    const randomTop = Math.floor(Math.random() * 80) + 10;
    const randomLeft = Math.floor(Math.random() * 80) + 10;
    setCatPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
      randomizePosition();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCatClick = () => {
    setShowPopup(true);
    setVisible(false);

    setTimeout(() => {
      setShowPopup(false);
      setVisible(true);
      randomizePosition();
    }, 5000);
  };

  return (
    <>

      {visible && (
        <div
          className="hidden-cat"
          style={{ top: catPosition.top, left: catPosition.left }}
          onClick={handleCatClick}
        >
              <Cat size={40} className="hidden-cat" /> 
        </div>
      )}

      {showPopup && (
        <div className="cat-popup">
          <img
            src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
            alt="Funny Cat"
          />
          <p className="cat-popup-text">Meow! You found me 😺</p>
        </div>
      )}
    </>
  );
};

export default CatSurprise;
