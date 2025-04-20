document.addEventListener('DOMContentLoaded', () => {
    // Three.js Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('canvas-bg').appendChild(renderer.domElement);
  
    const particlesCount = window.innerWidth < 768 ? 100 : 400;
    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);
  
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 200;
    }
  
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: window.innerWidth < 768 ? 0.08 : 0.15,
      color: 0xff6f61,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
  
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
  
    camera.position.z = 60;
  
    function animate() {
      requestAnimationFrame(animate);
      particlesMesh.rotation.x += 0.0001;
      particlesMesh.rotation.y += 0.0003;
      const positions = particlesMesh.geometry.attributes.position.array;
      for (let i = 0; i < particlesCount * 3; i += 3) {
        positions[i + 2] += Math.sin(Date.now() * 0.0003 + positions[i]) * 0.008;
        if (positions[i + 2] > 100) positions[i + 2] = -100;
      }
      particlesMesh.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    }
    animate();
  
    // Resize Handler
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  
    // Hamburger Menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = navMenu.querySelectorAll('a');
  
    hamburger.addEventListener('click', () => {
      const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
      hamburger.innerHTML = isExpanded ? '<i class="fas fa-bars"></i>' : '<i class="fas fa-times"></i>';
    });
  
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  
    // Hide Nav on Scroll
    let lastScrollTop = 0;
    const nav = document.querySelector('nav');
  
    window.addEventListener('scroll', () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        nav.classList.add('hidden');
      } else {
        nav.classList.remove('hidden');
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    });
  
    // Close Menu on Outside Click and Touch Support
    let touchStartX = 0;
    let touchEndX = 0;
  
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  
    document.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });
  
    document.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50 && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  
    // Highlight Card Animation
    const highlightCard = document.querySelector('.highlight-card');
    if (highlightCard) {
      highlightCard.classList.add('highlightFade');
    }
  
    // Card Animation on Scroll
    const cards = document.querySelectorAll('[data-animate]');
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
  
    cards.forEach(card => observer.observe(card));
  
    // Command Search
    const searchInput = document.getElementById('command-search-input');
    const commandCards = document.querySelectorAll('.command-card');
  
    searchInput.addEventListener('input', () => {
      const query = searchInput.value.toLowerCase();
      commandCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const isMatch = title.includes(query);
        card.style.display = isMatch ? 'block' : 'none';
        card.classList.toggle('search-highlight', isMatch && query.length > 0);
      });
    });
  });