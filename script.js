document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile Menu Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('show');
    });

    // Smooth Scrolling Navigation
    document.querySelectorAll('nav a, .hero-buttons a, .btn:not([onclick]), .footer-links a, .footer-services a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('show');
                    
                    // Smooth scroll to target
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Close modal if open
                    if (quoteModal.style.display === 'flex') {
                        quoteModal.style.display = 'none';
                    }
                }
            }
        });
    });

    // Testimonials Carousel
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-prev');
    const nextBtn = document.querySelector('.testimonial-next');
    let currentTestimonial = 0;
    let testimonialInterval;

    // Function to change testimonial
    function changeTestimonial(index) {
        // Update current testimonial index
        currentTestimonial = index;
        
        // Reset interval timer
        clearInterval(testimonialInterval);
        startTestimonialInterval();
        
        // Update testimonials and dots
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
    }

    // Initialize testimonial interval
    function startTestimonialInterval() {
        testimonialInterval = setInterval(() => {
            let nextIndex = (currentTestimonial + 1) % testimonials.length;
            changeTestimonial(nextIndex);
        }, 5000);
    }

    // Start the testimonial carousel
    startTestimonialInterval();

    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => changeTestimonial(index));
    });

    // Add click events to navigation buttons
    prevBtn.addEventListener('click', () => {
        let prevIndex = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        changeTestimonial(prevIndex);
    });

    nextBtn.addEventListener('click', () => {
        let nextIndex = (currentTestimonial + 1) % testimonials.length;
        changeTestimonial(nextIndex);
    });

    // Quote Modal
    const quoteModal = document.getElementById('quote-modal');
    const quoteButtons = document.querySelectorAll('.btn-primary:not(.hero-quote-btn)');
    const closeModalBtn = document.getElementById('close-modal');

    // Open modal from any primary buttons
    quoteButtons.forEach(btn => {
        if (btn.closest('#contact-form') === null && !btn.id.includes('close')) {
            btn.addEventListener('click', (e) => {
                if (!e.target.closest('form')) {
                    quoteModal.style.display = 'flex';
                }
            });
        }
    });

    // Close modal with X button
    closeModalBtn.addEventListener('click', () => {
        quoteModal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === quoteModal) {
            quoteModal.style.display = 'none';
        }
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeSuccessBtn = document.getElementById('close-success');

    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real implementation, you would send the form data to a server here
        // For demo purposes, we'll just show the success message
        
        // Clear the form
        contactForm.reset();
        
        // Show success modal
        successModal.style.display = 'flex';
    });

    // Close success modal
    closeSuccessBtn?.addEventListener('click', () => {
        successModal.style.display = 'none';
    });

    // Close success modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });

    // Lightbox initialization is handled by the lightbox2 library automatically
});
