import { Camera, Mesh, Plane, Program, Renderer, Texture, Transform } from 'ogl';
import { useEffect, useRef } from 'react';


function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  const words = text.split(' ');
  let line = '';
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = context.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, currentY);
}

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}


function createCardTexture(gl, { title, tech, description }) {
  const canvas = document.createElement('canvas');
  const width = 1024;  
  const height = 512;  
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');


  const gradient = ctx.createRadialGradient(width/2, height/2, 50, width/2, height/2, width);
  gradient.addColorStop(0, 'rgba(40, 30, 50, 0.95)'); 
  gradient.addColorStop(1, 'rgba(10, 10, 15, 0.98)'); 
  ctx.fillStyle = gradient;
  
  roundRect(ctx, 10, 10, width - 20, height - 20, 30);
  ctx.fill();


  ctx.lineWidth = 3;
  ctx.strokeStyle = 'rgba(138, 43, 226, 0.3)'; 
  

  ctx.beginPath();
  ctx.moveTo(100, 40);
  ctx.lineTo(width - 100, 40);
  ctx.stroke();


  ctx.beginPath();
  ctx.moveTo(100, height - 40);
  ctx.lineTo(width - 100, height - 40);
  ctx.stroke();


  ctx.lineWidth = 8;
  ctx.strokeStyle = '#bd73ff'; 
  ctx.lineCap = 'round';
  const cornerSize = 50;
  const padding = 15;


  ctx.beginPath(); ctx.moveTo(padding, padding + cornerSize); 
  ctx.lineTo(padding, padding); ctx.lineTo(padding + cornerSize, padding); ctx.stroke();

  ctx.beginPath(); ctx.moveTo(width - padding, height - padding - cornerSize); 
  ctx.lineTo(width - padding, height - padding); ctx.lineTo(width - padding - cornerSize, height - padding); ctx.stroke();


  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff'; 
  ctx.font = '800 40px "Segoe UI", sans-serif'; 
  ctx.shadowColor = "rgba(189, 115, 255, 0.6)";
  ctx.shadowBlur = 30;
  ctx.fillText(title.toUpperCase(), width / 2, 140);
  ctx.shadowBlur = 0; 

  const techWidth = ctx.measureText(tech).width + 60;
  ctx.fillStyle = 'rgba(138, 43, 226, 0.15)';
  roundRect(ctx, (width/2) - (techWidth/2), 180, techWidth, 60, 10);
  ctx.fill();
  ctx.strokeStyle = 'rgba(138, 43, 226, 0.5)';
  ctx.lineWidth = 2;
  ctx.stroke();


  ctx.fillStyle = '#bd73ff';
  ctx.font = '600 35px "Courier New", monospace';
  ctx.fillText(tech, width / 2, 222);

 
  ctx.fillStyle = '#d0d0d0';
  ctx.font = '40px "Segoe UI", sans-serif';
  wrapText(ctx, description, width / 2, 320, width - 160, 55);

  const texture = new Texture(gl, { generateMipmaps: false });
  texture.image = canvas;
  return { texture, width, height };
}

class CardInfo {
  constructor({ gl, plane, title, tech, description }) {
    this.gl = gl;
    this.plane = plane;
    this.title = title;
    this.tech = tech;
    this.description = description;
    this.createMesh();
  }

  createMesh() {
    const { texture, width, height } = createCardTexture(this.gl, {
      title: this.title,
      tech: this.tech,
      description: this.description
    });

    const geometry = new Plane(this.gl);
    const program = new Program(this.gl, {
      vertex: `
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform sampler2D tMap;
        varying vec2 vUv;
        void main() {
          vec4 color = texture2D(tMap, vUv);
          if(color.a < 0.1) discard; 
          gl_FragColor = color;
        }
      `,
      uniforms: { tMap: { value: texture } },
      transparent: true
    });

    this.mesh = new Mesh(this.gl, { geometry, program });
    
    // Size adjustments
    const boxHeight = this.plane.scale.y * 0.7; 
    const boxWidth = this.plane.scale.x; 

    this.mesh.scale.set(boxWidth, boxHeight, 1);
    this.mesh.position.y = -this.plane.scale.y * 0.5 - boxHeight * 0.5 + 0.1;
    this.mesh.setParent(this.plane);
  }
}

class Media {
  constructor({ geometry, gl, image, index, length, renderer, scene, screen, data, viewport, bend, borderRadius }) {
    this.extra = 0;
    this.geometry = geometry;
    this.gl = gl;
    this.image = image;
    this.data = data;
    this.index = index;
    this.length = length;
    this.renderer = renderer;
    this.scene = scene;
    this.screen = screen;
    this.viewport = viewport;
    this.bend = bend;
    this.borderRadius = borderRadius;
    this.createShader();
    this.createMesh();
    this.createCardDetails();
    this.onResize();
  }

  createShader() {
    const texture = new Texture(this.gl, { generateMipmaps: true });
    this.program = new Program(this.gl, {
      depthTest: false,
      depthWrite: false,
      vertex: `
        precision highp float;
        attribute vec3 position;
        attribute vec2 uv;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform float uTime;
        uniform float uSpeed;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          
          // Smooth Wave Flow (No Glitch)
          p.z = (sin(p.x * 4.0 + uTime) * 1.5 + cos(p.y * 2.0 + uTime) * 1.5) * (0.1 + uSpeed * 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragment: `
        precision highp float;
        uniform vec2 uImageSizes;
        uniform vec2 uPlaneSizes;
        uniform sampler2D tMap;
        uniform float uBorderRadius;
        uniform float uSpeed;
        varying vec2 vUv;
        
        float roundedBoxSDF(vec2 p, vec2 b, float r) {
          vec2 d = abs(p) - b;
          return length(max(d, vec2(0.0))) + min(max(d.x, d.y), 0.0) - r;
        }
        
        void main() {
          vec2 ratio = vec2(
            min((uPlaneSizes.x / uPlaneSizes.y) / (uImageSizes.x / uImageSizes.y), 1.0),
            min((uPlaneSizes.y / uPlaneSizes.x) / (uImageSizes.y / uImageSizes.x), 1.0)
          );
          vec2 uv = vec2(
            vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
            vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
          );

          // --- CLEAN RGB SHIFT (Only on Scroll) ---
          // This keeps the image sharp when still, but adds motion blur when moving
          float shift = uSpeed * 0.01; 
          float r = texture2D(tMap, uv + vec2(shift, 0.0)).r;
          float g = texture2D(tMap, uv).g;
          float b = texture2D(tMap, uv - vec2(shift, 0.0)).b;
          vec3 color = vec3(r, g, b);

          // Apply Rounded Corners
          float d = roundedBoxSDF(vUv - 0.5, vec2(0.5 - uBorderRadius), uBorderRadius);
          float edgeSmooth = 0.002;
          float alpha = 1.0 - smoothstep(-edgeSmooth, edgeSmooth, d);
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      uniforms: {
        tMap: { value: texture },
        uPlaneSizes: { value: [0, 0] },
        uImageSizes: { value: [0, 0] },
        uSpeed: { value: 0 },
        uTime: { value: 100 * Math.random() },
        uBorderRadius: { value: this.borderRadius }
      },
      transparent: true
    });
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = this.image;
    img.onload = () => {
      texture.image = img;
      this.program.uniforms.uImageSizes.value = [img.naturalWidth, img.naturalHeight];
    };
  }

  createMesh() {
    this.plane = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program
    });
    this.plane.setParent(this.scene);
  }

  createCardDetails() {
    this.cardInfo = new CardInfo({
      gl: this.gl,
      plane: this.plane,
      title: this.data.title,
      tech: this.data.tech,
      description: this.data.description
    });
  }

  update(scroll, direction) {
    this.plane.position.x = this.x - scroll.current - this.extra;
    const x = this.plane.position.x;
    const H = this.viewport.width / 2;

    if (this.bend === 0) {
      this.plane.position.y = 0;
      this.plane.rotation.z = 0;
    } else {
      const B_abs = Math.abs(this.bend);
      const R = (H * H + B_abs * B_abs) / (2 * B_abs);
      const effectiveX = Math.min(Math.abs(x), H);
      const arc = R - Math.sqrt(R * R - effectiveX * effectiveX);
      if (this.bend > 0) {
        this.plane.position.y = -arc + 2.0;
        this.plane.rotation.z = -Math.sign(x) * Math.asin(effectiveX / R);
      } else {
        this.plane.position.y = arc;
        this.plane.rotation.z = Math.sign(x) * Math.asin(effectiveX / R);
      }
    }

    this.speed = scroll.current - scroll.last;
    this.program.uniforms.uTime.value += 0.04;
    this.program.uniforms.uSpeed.value = this.speed;

    const planeOffset = this.plane.scale.x / 2;
    const viewportOffset = this.viewport.width / 2;
    this.isBefore = this.plane.position.x + planeOffset < -viewportOffset;
    this.isAfter = this.plane.position.x - planeOffset > viewportOffset;
    if (direction === 'right' && this.isBefore) {
      this.extra -= this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
    if (direction === 'left' && this.isAfter) {
      this.extra += this.widthTotal;
      this.isBefore = this.isAfter = false;
    }
  }

  onResize({ screen, viewport } = {}) {
    if (screen) this.screen = screen;
    if (viewport) {
      this.viewport = viewport;
    }
    this.scale = this.screen.height / 1500;
    
    this.plane.scale.x = (this.viewport.width * (900 * this.scale)) / this.screen.width;
    this.plane.scale.y = (this.viewport.height * (550 * this.scale)) / this.screen.height;
    
    this.plane.program.uniforms.uPlaneSizes.value = [this.plane.scale.x, this.plane.scale.y];
    
    this.padding = 2.0; 
    this.width = this.plane.scale.x + this.padding;
    this.widthTotal = this.width * this.length;
    this.x = this.width * this.index;
  }
}

class App {
  constructor(container, { items, bend, borderRadius }) {
    this.container = container;
    this.scroll = { ease: 0.05, current: 0, target: 0, last: 0 };
    this.createRenderer();
    this.createCamera();
    this.createScene();
    this.onResize();
    this.createGeometry();
    this.createMedias(items, bend, borderRadius);
    this.update();
    this.addEventListeners();
  }

  createRenderer() {
    this.renderer = new Renderer({ alpha: true, antialias: true });
    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    this.container.appendChild(this.gl.canvas);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.fov = 45;
    this.camera.position.z = 25; 
  }

  createScene() {
    this.scene = new Transform();
  }

  createGeometry() {
    this.planeGeometry = new Plane(this.gl, { heightSegments: 50, widthSegments: 100 });
  }

  createMedias(items, bend, borderRadius) {
    const galleryItems = items;
    this.mediasImages = galleryItems.concat(galleryItems); 
    
    this.medias = this.mediasImages.map((data, index) => {
      return new Media({
        geometry: this.planeGeometry,
        gl: this.gl,
        image: data.image,
        data: data,
        index,
        length: this.mediasImages.length,
        renderer: this.renderer,
        scene: this.scene,
        screen: this.screen,
        viewport: this.viewport,
        bend,
        borderRadius
      });
    });
  }

  onTouchDown(e) {
    this.isDown = true;
    this.scroll.position = this.scroll.current;
    this.start = e.touches ? e.touches[0].clientX : e.clientX;
  }

  onTouchMove(e) {
    if (!this.isDown) return;
    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const distance = (this.start - x) * 0.05;
    this.scroll.target = this.scroll.position + distance;
  }

  onTouchUp() {
    this.isDown = false;
  }

  onWheel(e) {
    const delta = e.deltaY;
    this.scroll.target += delta * 0.01;
  }

  onResize() {
    this.screen = {
      width: this.container.clientWidth,
      height: this.container.clientHeight
    };
    this.renderer.setSize(this.screen.width, this.screen.height);
    this.camera.perspective({ aspect: this.screen.width / this.screen.height });
    const fov = (this.camera.fov * Math.PI) / 180;
    const height = 2 * Math.tan(fov / 2) * this.camera.position.z;
    const width = height * this.camera.aspect;
    this.viewport = { width, height };
    if (this.medias) {
      this.medias.forEach(media => media.onResize({ screen: this.screen, viewport: this.viewport }));
    }
  }

  update() {
    this.scroll.current = lerp(this.scroll.current, this.scroll.target, this.scroll.ease);
    const direction = this.scroll.current > this.scroll.last ? 'right' : 'left';
    if (this.medias) {
      this.medias.forEach(media => media.update(this.scroll, direction));
    }
    this.renderer.render({ scene: this.scene, camera: this.camera });
    this.scroll.last = this.scroll.current;
    this.raf = window.requestAnimationFrame(this.update.bind(this));
  }

  addEventListeners() {
    this.boundOnResize = this.onResize.bind(this);
    this.boundOnWheel = this.onWheel.bind(this);
    this.boundOnTouchDown = this.onTouchDown.bind(this);
    this.boundOnTouchMove = this.onTouchMove.bind(this);
    this.boundOnTouchUp = this.onTouchUp.bind(this);
    window.addEventListener('resize', this.boundOnResize);
    this.container.addEventListener('wheel', this.boundOnWheel); 
    this.container.addEventListener('mousedown', this.boundOnTouchDown);
    this.container.addEventListener('mousemove', this.boundOnTouchMove);
    this.container.addEventListener('mouseup', this.boundOnTouchUp);
    this.container.addEventListener('touchstart', this.boundOnTouchDown);
    this.container.addEventListener('touchmove', this.boundOnTouchMove);
    this.container.addEventListener('touchend', this.boundOnTouchUp);
  }

  destroy() {
    window.cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.boundOnResize);
    this.container.removeEventListener('wheel', this.boundOnWheel);
    this.container.removeEventListener('mousedown', this.boundOnTouchDown);
    this.container.removeEventListener('mousemove', this.boundOnTouchMove);
    this.container.removeEventListener('mouseup', this.boundOnTouchUp);
    this.container.removeEventListener('touchstart', this.boundOnTouchDown);
    this.container.removeEventListener('touchmove', this.boundOnTouchMove);
    this.container.removeEventListener('touchend', this.boundOnTouchUp);
    if (this.renderer && this.renderer.gl && this.renderer.gl.canvas.parentNode) {
      this.renderer.gl.canvas.parentNode.removeChild(this.renderer.gl.canvas);
    }
  }
}

export default function CircularGallery({ items, bend = 3, borderRadius = 0.05 }) {
  const containerRef = useRef(null);
  useEffect(() => {
    const app = new App(containerRef.current, { items, bend, borderRadius });
    return () => {
      app.destroy();
    };
  }, [items, bend, borderRadius]);
  return <div ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'hidden', cursor: 'grab' }} />;
}