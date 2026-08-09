document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // --- 3. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100; // Trigger point 100px from bottom of viewport
        
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    // Initial check on load
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);

    // --- 4. Form Submission Simulation ---
    const leadForm = document.getElementById('leadForm');
    
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload
            
            // Get button to show loading/success state
            const submitBtn = leadForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Simulate API Call / Delay
            setTimeout(() => {
                submitBtn.innerHTML = 'Request Sent! <i class="fas fa-check"></i>';
                submitBtn.classList.add('btn-success');
                submitBtn.style.backgroundColor = 'var(--color-accent-green)';
                submitBtn.style.borderColor = 'var(--color-accent-green)';
                submitBtn.style.color = '#fff';
                
                leadForm.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style = '';
                }, 3000);
            }, 1500);
        });
    }

    /* ==========================================================================
       Services Accordion
       ========================================================================== */
    const servicesToggleBtn = document.getElementById('servicesToggleBtn');
    const servicesAccordion = document.getElementById('servicesAccordion');
    
    if (servicesToggleBtn && servicesAccordion) {
        servicesToggleBtn.addEventListener('click', () => {
            servicesAccordion.classList.toggle('open');
            servicesToggleBtn.classList.toggle('active');
            
            // Update button text optionally
            if (servicesAccordion.classList.contains('open')) {
                servicesToggleBtn.innerHTML = 'Hide Services List <i class="fas fa-chevron-down"></i>';
            } else {
                servicesToggleBtn.innerHTML = 'See Full Services List <i class="fas fa-chevron-down"></i>';
            }
        });
    }

});
