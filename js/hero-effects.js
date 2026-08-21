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
    // 2. FLOATING ORGANIC NEURONS (CANVAS)
    // ----------------------------------------------------
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Load the neuron image
    const neuronImg = new Image();
    neuronImg.src = 'photos/neurons-organic.png'; // Organic neuron image

    // Configuration
    const particleCount = Math.min(Math.floor(window.innerWidth / 150), 12); // Fewer particles since they are larger images
    const particleSpeed = 0.2;

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
            this.size = Math.random() * 200 + 100; // Large sizes for neurons
            this.rotation = Math.random() * Math.PI * 2; // Random initial rotation
            this.rotationSpeed = (Math.random() - 0.5) * 0.005; // Slow rotation
            this.opacity = Math.random() * 0.15 + 0.05; // Very subtle, 5-20% opacity
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.rotation += this.rotationSpeed;

            // Wrap around edges for seamless floating
            if (this.x < -this.size) this.x = width + this.size;
            if (this.x > width + this.size) this.x = -this.size;
            if (this.y < -this.size) this.y = height + this.size;
            if (this.y > height + this.size) this.y = -this.size;
        }

        draw() {
            if (!neuronImg.complete) return; // Wait for image to load
            
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;
            // Draw image centered at x,y
            ctx.drawImage(neuronImg, -this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
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

        requestAnimationFrame(animate);
    }

    neuronImg.onload = animate; // Start animation when image loads
});
