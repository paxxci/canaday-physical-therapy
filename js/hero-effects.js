document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. INTERACTIVE TILT (2.5D PARALLAX)
    // ----------------------------------------------------
    const heroSection = document.querySelector('.hero');
    const brainImg = document.querySelector('.hero-brain-img');

    if (heroSection && brainImg) {
        heroSection.addEventListener('mousemove', (e) => {
            // Get center of the hero section
            const rect = heroSection.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            // Calculate mouse distance from center (-1 to 1)
            const mouseX = (e.clientX - centerX) / (rect.width / 2);
            const mouseY = (e.clientY - centerY) / (rect.height / 2);

            // Max rotation degrees
            const maxRotateX = 15; // Up/down tilt
            const maxRotateY = 15; // Left/right tilt

            // Calculate rotation (inverted so it tilts toward mouse)
            const rotateX = -(mouseY * maxRotateX);
            const rotateY = mouseX * maxRotateY;

            // Apply transform
            brainImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        // Reset on mouse leave
        heroSection.addEventListener('mouseleave', () => {
            brainImg.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
        });
    }

    // ----------------------------------------------------
    // 2. FLOATING NEURAL PATHWAYS (CANVAS PARTICLES)
    // ----------------------------------------------------
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Configuration
    const particleCount = Math.min(Math.floor(window.innerWidth / 15), 100); // Scale with screen size, max 100
    const connectionDistance = 150;
    const particleSpeed = 0.5;

    // Resize canvas
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resize);
    resize();

    // Particle Class
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * particleSpeed;
            this.vy = (Math.random() - 0.5) * particleSpeed;
            this.radius = Math.random() * 2 + 1;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce off edges
            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(141, 166, 184, 0.4)'; // Slate blue
            ctx.fill();
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Update and draw particles
        particles.forEach(p => {
            p.update();
            p.draw();
        });

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    // Opacity based on distance
                    const opacity = 1 - (distance / connectionDistance);
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(141, 166, 184, ${opacity * 0.2})`; // Faint connecting lines
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
});
