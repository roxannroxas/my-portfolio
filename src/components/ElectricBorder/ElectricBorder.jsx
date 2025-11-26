import React, { useEffect, useId, useLayoutEffect, useRef } from 'react';
import './ElectricBorder.css'; // Make sure your CSS file is in the same folder

const ElectricBorder = ({ 
  children, 
  color = '#5227FF', 
  speed = 1, 
  chaos = 1, 
  thickness = 2, 
  className = '', 
  style = {} 
}) => {
  const rawId = useId().replace(/[:]/g, '');
  const filterId = `turbulent-displace-${rawId}`;
  const svgRef = useRef(null);
  const rootRef = useRef(null);
  const strokeRef = useRef(null);

  const updateAnim = () => {
    const svg = svgRef.current;
    const host = rootRef.current;
    if (!svg || !host) return;

    // Apply the filter to the stroke layer
    if (strokeRef.current) {
      strokeRef.current.style.filter = `url(#${filterId})`;
    }

    const width = Math.max(1, Math.round(host.clientWidth || host.getBoundingClientRect().width || 0));
    const height = Math.max(1, Math.round(host.clientHeight || host.getBoundingClientRect().height || 0));

    // Update animations for vertical displacement
    const dyAnims = Array.from(svg.querySelectorAll('feOffset > animate[attributeName="dy"]'));
    if (dyAnims.length >= 2) {
      dyAnims[0].setAttribute('values', `${height}; 0`);
      dyAnims[1].setAttribute('values', `0; -${height}`);
    }

    // Update animations for horizontal displacement
    const dxAnims = Array.from(svg.querySelectorAll('feOffset > animate[attributeName="dx"]'));
    if (dxAnims.length >= 2) {
      dxAnims[0].setAttribute('values', `${width}; 0`);
      dxAnims[1].setAttribute('values', `0; -${width}`);
    }

    // Adjust speed
    const baseDur = 6;
    const dur = Math.max(0.001, baseDur / (speed || 1));
    [...dyAnims, ...dxAnims].forEach(a => a.setAttribute('dur', `${dur}s`));

    // Adjust chaos (scale)
    const disp = svg.querySelector('feDisplacementMap');
    if (disp) disp.setAttribute('scale', String(30 * (chaos || 1)));

    // Adjust filter area to cover the component
    const filterEl = svg.querySelector(`#${CSS.escape(filterId)}`);
    if (filterEl) {
      filterEl.setAttribute('x', '-200%');
      filterEl.setAttribute('y', '-200%');
      filterEl.setAttribute('width', '500%');
      filterEl.setAttribute('height', '500%');
    }

    // Restart animations
    requestAnimationFrame(() => {
      [...dyAnims, ...dxAnims].forEach(a => {
        if (typeof a.beginElement === 'function') {
          try {
            a.beginElement();
          } catch (e) {
            // Some browsers/environments might warn here, safe to ignore
          }
        }
      });
    });
  };

  // Update on prop changes
  useEffect(() => {
    updateAnim();
  }, [speed, chaos]);

  // Update on resize
  useLayoutEffect(() => {
    if (!rootRef.current) return;
    const ro = new ResizeObserver(() => updateAnim());
    ro.observe(rootRef.current);
    updateAnim();
    return () => ro.disconnect();
  }, []);

  // CSS Variables for the stylesheet
  const vars = {
    '--electric-border-color': color,
    '--eb-border-width': `${thickness}px`
  };

  return (
    <div 
      ref={rootRef} 
      className={`electric-border ${className}`} 
      style={{ ...vars, ...style }}
    >
      {/* The invisible SVG that defines the distortion filter */}
      <svg ref={svgRef} className="eb-svg" aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur="6s" repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>

      {/* The visible glowing layers */}
      <div className="eb-layers">
        <div ref={strokeRef} className="eb-stroke" />
        <div className="eb-glow-1" />
        <div className="eb-glow-2" />
        <div className="eb-background-glow" />
      </div>

      {/* Your actual content (the card) goes here */}
      <div className="eb-content">{children}</div>
    </div>
  );
};

export default ElectricBorder;