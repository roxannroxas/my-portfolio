import React, { useId } from "react";
import "./ElectricBorder.css";

const ElectricBorder = ({
  children,
  color = "#d8b4fe",
  thickness = 3,
  className,
  style,
}) => {
  const rawId = useId().replace(/[:]/g, "");
  const filterId = `electric-jitter-${rawId}`;

   const vars = {
    "--electric-border-color": color,
    "--eb-border-width": `${thickness}px`,
  };

  return (
    <div
      className={`electric-border ${className ?? ""}`}
      style={{ ...vars, ...style }}
    >
      
      <svg className="eb-svg">
        <defs>
          <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.03"
              numOctaves="2"
              result="noise"
              seed="0"
            >

              <animate
                attributeName="seed"
                values="1;10;20;30;40;50;60;70;80;90;100"
                dur="0.9s" 
                calcMode="discrete"
                repeatCount="indefinite"
              />
            </feTurbulence>


            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div 
        className="eb-stroke" 
        style={{ filter: `url(#${filterId})` }} 
      />


      <div className="eb-glow" />
      

      <div className="eb-content">{children}</div>
    </div>
  );
};

export default ElectricBorder;