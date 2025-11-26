import React, { useState, useEffect } from "react";
import "./ScrollStack.css";

export default function ScrollStack({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % children.length);
    }, 3000); 

    return () => clearInterval(interval);
  }, [children.length]);

  return (
    <div className="scrollstack-container">
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child, {
          className:
            "scrollstack-item " +
            (index === activeIndex ? "active" : "") +
            (index === (activeIndex + 1) % children.length ? " next" : "") +
            (index < activeIndex ? " inactive" : "")
        })
      )}
    </div>
  );
}

export function ScrollStackItem({ children, className }) {
  return <div className={className}>{children}</div>;
}
