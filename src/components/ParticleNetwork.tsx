import React, { useEffect, useRef } from 'react';

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      baseColorKey: 'primary' | 'secondary' | 'neutral';
    }> = [];

    const numParticles = 55;
    let mouse = { x: -1000, y: -1000, radius: 150 };

    // Remote Admin Settings
    let currentThemeColor = localStorage.getItem('ac_sys_color') || 'orange';
    let isHyperdrive = localStorage.getItem('ac_sys_hyperdrive') === 'true';
    let isEmergency = localStorage.getItem('ac_sys_emergency') === 'true';

    const getParticleColor = (colorKey: 'primary' | 'secondary' | 'neutral', theme: string) => {
      const isLight = document.documentElement.classList.contains('light');
      
      if (isLight) {
        const lightColors = {
          primary: '#AA7C11', // Deep Contrast Gold
          secondary: '#D4AF37', // Shimmering Gold
          neutral: 'rgba(18, 18, 21, 0.45)' // Carbon
        };
        return lightColors[colorKey];
      } else {
        const darkColors = {
          primary: '#D4AF37', // Shimmering Gold
          secondary: '#F3E5AB', // Warm Champagne
          neutral: 'rgba(255, 255, 255, 0.4)' // Soft glowing cloud
        };
        return darkColors[colorKey];
      }
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const keys: Array<'primary' | 'secondary' | 'neutral'> = ['primary', 'secondary', 'neutral'];
      
      for (let i = 0; i < numParticles; i++) {
        const baseKey = keys[Math.floor(Math.random() * keys.length)];
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          size: Math.random() * 1.8 + 1,
          baseColorKey: baseKey,
          color: getParticleColor(baseKey, currentThemeColor)
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Determine active grid coloring scheme
      let gridColor = 'rgba(77, 163, 255, 0.025)';
      if (isEmergency) {
        // Blinking red grid lines
        const blink = Math.sin(Date.now() / 250) * 0.04 + 0.06;
        gridColor = `rgba(239, 68, 68, ${blink})`;
      }

      // Draw subtle space grid
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = isEmergency ? 1.25 : 0.85;
      const gridSize = 65;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Speed boost factor for Admin Hyperdrive Mode
      const speedFac = isHyperdrive ? 10.0 : 1.0;

      // Draw and update particles
      particles.forEach((p) => {
        p.x += p.vx * speedFac;
        p.y += p.vy * speedFac;

        // Wrap around boundaries (better feel under hyperdrive speed)
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, isHyperdrive ? p.size * 1.5 : p.size, 0, Math.PI * 2);
        
        // Dynamically get correct color
        const targetClr = getParticleColor(p.baseColorKey, currentThemeColor);
        ctx.fillStyle = isEmergency ? '#EF4444' : targetClr;
        ctx.shadowColor = isEmergency ? '#EF4444' : targetClr;
        ctx.shadowBlur = isHyperdrive ? 8 : 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw connections
      const isLight = document.documentElement.classList.contains('light');
      const activePrimary = isLight ? '#AA7C11' : '#D4AF37';
      const connectionColor = isEmergency 
        ? 'rgba(239, 68, 68, ' 
        : (isLight ? 'rgba(170, 124, 17, ' : 'rgba(243, 229, 171, ');

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = isHyperdrive ? 150 : 110;
          if (dist < maxDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            
            const alpha = 0.08 * (1 - dist / maxDist);
            ctx.strokeStyle = `${connectionColor}${alpha})`;
            ctx.lineWidth = isHyperdrive ? 1.0 : 0.55;
            ctx.stroke();
          }
        }
      }

      // Draw lines to mouse
      if (mouse.x > 0 && mouse.y > 0) {
        particles.forEach((p) => {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            
            const mouseStroke = isEmergency 
              ? `rgba(239, 68, 68, ${0.2 * (1 - dist / mouse.radius)})`
              : `rgba(${isLight ? '170, 124, 17' : '212, 175, 55'}, ${0.25 * (1 - dist / mouse.radius)})`;
            
            ctx.strokeStyle = mouseStroke;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    // Custom system listener handlers
    const updateColorHandler = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && customEvent.detail.color) {
        currentThemeColor = customEvent.detail.color;
        particles.forEach((p) => {
          p.color = getParticleColor(p.baseColorKey, currentThemeColor);
        });
      }
    };

    const toggleHyperdriveHandler = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        isHyperdrive = customEvent.detail.active;
      }
    };

    const toggleEmergencyHandler = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        isEmergency = customEvent.detail.active;
      }
    };

    const handleStorageChange = () => {
      currentThemeColor = localStorage.getItem('ac_sys_color') || 'orange';
      isHyperdrive = localStorage.getItem('ac_sys_hyperdrive') === 'true';
      isEmergency = localStorage.getItem('ac_sys_emergency') === 'true';
      particles.forEach((p) => {
        p.color = getParticleColor(p.baseColorKey, currentThemeColor);
      });
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('ac-system-color-change', updateColorHandler);
    window.addEventListener('ac-hyperdrive-toggle', toggleHyperdriveHandler);
    window.addEventListener('ac-emergency-toggle', toggleEmergencyHandler);
    window.addEventListener('storage', handleStorageChange);

    const parent = canvas.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);
    } else {
      window.addEventListener('mousemove', handleMouseMove);
    }

    resizeCanvas();
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('ac-system-color-change', updateColorHandler);
      window.removeEventListener('ac-hyperdrive-toggle', toggleHyperdriveHandler);
      window.removeEventListener('ac-emergency-toggle', toggleEmergencyHandler);
      window.removeEventListener('storage', handleStorageChange);

      if (parent) {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      } else {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="space-particle-field"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none block opacity-70"
    />
  );
}
