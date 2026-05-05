// Language Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
  const langToggle = document.getElementById('langToggle');
  const langText = langToggle.querySelector('.lang-text');
  const html = document.documentElement;
  
  // Get saved language or default to English
  const getLang = () => {
    return localStorage.getItem('lang') || 'en';
  };
  
  // Apply language
  const applyLang = (lang) => {
    html.setAttribute('data-lang', lang);
    html.setAttribute('lang', lang);
    langText.textContent = lang === 'en' ? 'ES' : 'EN';
    
    // Update all elements with data-en and data-es attributes
    const translatableElements = document.querySelectorAll('[data-en][data-es]');
    translatableElements.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) {
        // Simplified: use innerHTML if contains HTML tags, else textContent
        if (text.includes('<') && text.includes('>')) {
          el.innerHTML = text;
        } else {
          el.textContent = text;
        }
      }
    });
  };
  
  // Initialize language
  const currentLang = getLang();
  applyLang(currentLang);
  
  // Toggle language on button click
  langToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-lang') || 'en';
    const newLang = current === 'en' ? 'es' : 'en';
    
    applyLang(newLang);
    localStorage.setItem('lang', newLang);
  });
});

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle.querySelector('.theme-icon');
  
  // Check for saved theme preference or system preference
  const getTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  };
  
  // Apply theme
  const applyTheme = (theme) => {
    if (theme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
      themeIcon.textContent = '☀️';
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeIcon.textContent = '🌙';
    }
  };
  
  // Initialize theme
  const currentTheme = getTheme();
  applyTheme(currentTheme);
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const newTheme = isLight ? 'dark' : 'light';
    
    applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
  
  // Listen for system theme changes
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
    mediaQuery.addEventListener('change', (e) => {
      // Only apply if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'light' : 'dark');
      }
    });
  }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scroll reveal animation
document.addEventListener('DOMContentLoaded', () => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe cards and sections
  const revealElements = document.querySelectorAll(
    '.project-card, .ecosystem-card, .section-title, .research-content, .focus-grid, .contact-text'
  );
  
  revealElements.forEach(el => {
    el.classList.add('reveal-hidden');
    observer.observe(el);
  });
});

// Add CSS for reveal animation
const style = document.createElement('style');
style.textContent = `
  .reveal-hidden {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  
  .reveal-visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// Hero Canvas Animation - Mathematical Graph/Atomic Network
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let animationId;
  let isVisible = true;
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;
  
  // Set canvas size
  const resizeCanvas = () => {
    const hero = canvas.parentElement;
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Particle/Point class
  class Point {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 2 + 1.5;
      this.symbol = Math.random() > 0.6 ? ['+', '−', '0', '~'][Math.floor(Math.random() * 4)] : null;
      this.symbolOpacity = 0;
      this.symbolFadeDir = 0.015;
    }
    
    update() {
      this.x += this.vx;
      this.y += this.vy;
      
      // Wrap around edges
      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;
      
      // Animate symbol opacity
      if (this.symbol) {
        this.symbolOpacity += this.symbolFadeDir;
        if (this.symbolOpacity > 0.4 || this.symbolOpacity < 0.1) {
          this.symbolFadeDir *= -1;
        }
      }
    }
    
    draw() {
      // Draw point with glow effect
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      ctx.fillStyle = isDark ? 'rgba(150, 170, 190, 0.8)' : 'rgba(100, 120, 140, 0.7)';
      ctx.fill();
      
      // Draw symbol if present
      if (this.symbol) {
        ctx.font = '12px monospace';
        ctx.fillStyle = isDark 
          ? `rgba(150, 170, 190, ${this.symbolOpacity + 0.2})`
          : `rgba(100, 120, 140, ${this.symbolOpacity + 0.2})`;
        ctx.fillText(this.symbol, this.x + 10, this.y - 10);
      }
    }
  }
  
  // Create points - more points for better visibility
  const pointCount = Math.min(40, Math.floor((canvas.width * canvas.height) / 15000));
  const points = Array.from({ length: pointCount }, () => new Point());
  
  // Animation loop
  const animate = () => {
    if (!isVisible) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw points
    points.forEach(point => {
      point.update();
      point.draw();
    });
    
    // Draw connections between nearby points
    const connectionDistance = 120;
    const maxConnections = 4;
    
    for (let i = 0; i < points.length; i++) {
      let connections = 0;
      for (let j = i + 1; j < points.length && connections < maxConnections; j++) {
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
          const opacity = (1 - distance / connectionDistance) * (isDark ? 0.35 : 0.25);
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.strokeStyle = isDark 
            ? `rgba(150, 170, 190, ${opacity})`
            : `rgba(100, 120, 140, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          connections++;
        }
      }
    }
    
    animationId = requestAnimationFrame(animate);
  };
  
  // Visibility check
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isVisible = false;
      cancelAnimationFrame(animationId);
    } else {
      isVisible = true;
      animate();
    }
  });
  
  // Start animation
  animate();
});

// Hero Equation Typewriter Effect
document.addEventListener('DOMContentLoaded', () => {
  const equationEl = document.getElementById('heroEquation');
  if (!equationEl) return;
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    equationEl.textContent = 'score(p) = clip(δ(p) + α · g(p) · w[motif(p)], 0, 1)';
    return;
  }
  
  const equation = 'score(p) = clip(δ(p) + α · g(p) · w[motif(p)], 0, 1)';
  let index = 0;
  let isTyping = true;
  let pauseTimer = null;
  
  const typeNext = () => {
    if (!isTyping) return;
    
    if (index < equation.length) {
      equationEl.textContent = equation.slice(0, index + 1);
      index++;
      const delay = Math.random() * 100 + 50; // Random delay 50-150ms
      pauseTimer = setTimeout(typeNext, delay);
    } else {
      // Pause before restarting
      pauseTimer = setTimeout(() => {
        index = 0;
        equationEl.textContent = '';
        typeNext();
      }, 4000); // 4 second pause before restart
    }
  };
  
  // Start typing
  typeNext();
  
  // Cleanup on visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      isTyping = false;
      clearTimeout(pauseTimer);
    } else {
      isTyping = true;
      typeNext();
    }
  });
});

// Console greeting
console.log('%cHanzzel Corp', 'font-size: 24px; font-weight: bold; color: #58a6ff;');
console.log('%cLocal AI orchestration, automation systems and experimental NCT research.', 'font-size: 12px; color: #8b949e;');
console.log('%chttps://github.com/Hanzzel-corp', 'font-size: 12px; color: #7ee787;');
