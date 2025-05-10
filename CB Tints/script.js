document.addEventListener('DOMContentLoaded', function() {
    // Initialize Navbar Functionality
    initNavbar();
    
    // Initialize Smooth Scrolling
    initSmoothScroll();
    
    // Initialize Animations
    initScrollAnimations();
    
    // Initialize Gallery
    initGallery();
    

    
    // Initialize FAQ Accordion
    initFAQ();
    
    // Initialize Multi-step Quote Form
    initQuoteModal();
});

// Navbar Functionality
function initNavbar() {
    const header = document.querySelector('.header');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.main-nav');
    
    // Add scrolled class to header on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Toggle mobile menu
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Change menu button appearance
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mobileMenuBtn.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on nav links
        const navLinks = document.querySelectorAll('.main-nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// Smooth Scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    // Elements to animate on scroll
    const animateElements = [
        ...document.querySelectorAll('.service-card'),
        ...document.querySelectorAll('.benefit-card'),
        ...document.querySelectorAll('.gallery-item'),
        ...document.querySelectorAll('.before-after-item')
    ];
    
    // Set initial styles
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Check if elements are in viewport
    function checkScroll() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Run on load and scroll
    window.addEventListener('load', checkScroll);
    window.addEventListener('scroll', checkScroll);
    
    // Also run on resize to catch any viewport changes
    window.addEventListener('resize', checkScroll);
}

// Gallery functionality with image fade-in effect
function initGallery() {
    // Set up Intersection Observer for image fade-in effect
    initGalleryImagesObserver();
    
    // Setup See More button functionality
    const seeMoreBtn = document.getElementById('see-more-btn');
    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', function() {
            const hiddenItems = document.querySelectorAll('.gallery-item.hidden');
            const isMobile = window.innerWidth <= 768;
            let firstHiddenItem = null;
            
            // Show hidden items
            hiddenItems.forEach((item, index) => {
                item.classList.remove('hidden');
                
                // Keep track of the first item for immediate loading on mobile
                if (index === 0) {
                    firstHiddenItem = item;
                }
                
                // Add fade-in class to newly revealed items
                setTimeout(() => {
                    item.classList.add('fade-in');
                }, 10); // Small delay for the transition to work properly
            });
            
            // Immediately load the first hidden image on mobile
            if (isMobile && firstHiddenItem) {
                const img = firstHiddenItem.querySelector('img');
                if (img && img.dataset.src && !img.src) {
                    img.src = img.dataset.src;
                }
            }
            
            // Change button text to 'Show Less' and update functionality
            this.innerHTML = '<i class="fas fa-compress-alt"></i> Show Less';
            this.classList.add('active');
            
            // Skip scrolling on mobile devices
            if (!isMobile) {
                // Only scroll on desktop/larger screens
                document.querySelector('.portfolio-section').scrollIntoView({ behavior: 'smooth' });
            }
            
            // Change functionality to hide photos when clicked again
            this.removeEventListener('click', arguments.callee);
            this.addEventListener('click', function() {
                // Hide items again
                hiddenItems.forEach(item => {
                    item.classList.add('hidden');
                    item.classList.remove('fade-in');
                });
                
                // Reset button text
                this.innerHTML = '<i class="fas fa-images"></i> See More';
                this.classList.remove('active');
                
                // Reset event listener
                this.removeEventListener('click', arguments.callee);
                initGallery();
                
                // Scroll back to gallery section only on desktop
                const isMobile = window.innerWidth <= 768;
                if (!isMobile) {
                    const portfolioSection = document.getElementById('portfolio');
                    if (portfolioSection) {
                        portfolioSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });
    }
}

// Initialize Intersection Observer for gallery images
function initGalleryImagesObserver() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!galleryItems.length) return;
    
    // Options for the observer
    const options = {
        root: null, // Use viewport as root
        rootMargin: '0px 0px 50px 0px', // Start loading slightly before they come into view
        threshold: 0.1 // Trigger when 10% of the element is visible
    };
    
    // Create the observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const img = item.querySelector('img');
                
                // Only load the image if it's not already loaded
                if (img && img.dataset.src && !img.src) {
                    img.src = img.dataset.src;
                    img.onload = () => {
                        item.classList.add('fade-in');
                    };
                } else {
                    // If already loaded, just add the fade-in class
                    item.classList.add('fade-in');
                }
                
                // Stop observing once the element has been processed
                observer.unobserve(item);
            }
        });
    }, options);
    
    // Start observing each gallery item
    galleryItems.forEach(item => {
        observer.observe(item);
        item.classList.add('will-fade');
    });
}

// Initialize gallery functionality when DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    initTestimonials();
});

// Testimonials Carousel Functionality
function initTestimonials() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let currentIndex = 0;
    let autoScrollInterval;
    
    // Function to show a specific slide
    function showSlide(index) {
        // Validate index
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        // Update current index
        currentIndex = index;
        
        // Update slides
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentIndex);
        });
        
        // Update dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    // Initialize auto-scroll
    function startAutoScroll() {
        stopAutoScroll(); // Clear any existing interval
        autoScrollInterval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 5000); // Change slide every 5 seconds
    }
    
    // Stop auto-scroll
    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
    }
    
    // Event listeners for dots
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            showSlide(i);
            stopAutoScroll();
            startAutoScroll(); // Restart auto-scroll timer
        });
    });
    
    // Pause auto-scroll when user hovers over carousel
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoScroll);
        carousel.addEventListener('mouseleave', startAutoScroll);
    }
    
    // Start auto-scroll on page load
    startAutoScroll();
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const toggle = item.querySelector('.faq-toggle');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-toggle i').className = 'fas fa-plus';
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            // Change icon
            const icon = toggle.querySelector('i');
            if (item.classList.contains('active')) {
                icon.className = 'fas fa-minus';
            } else {
                icon.className = 'fas fa-plus';
            }
        });
    });
    
    // Open first FAQ item by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const icon = faqItems[0].querySelector('.faq-toggle i');
        if (icon) icon.className = 'fas fa-minus';
    }
}

// Quote Modal
function initQuoteModal() {
    const modal = document.getElementById('quoteModal');
    const openBtns = document.querySelectorAll('#quoteBtn, .service-btn');
    const closeBtn = modal ? modal.querySelector('.close') : null;
    const steps = modal ? modal.querySelectorAll('.form-step') : [];
    const nextBtns = modal ? modal.querySelectorAll('.next-btn') : [];
    const prevBtns = modal ? modal.querySelectorAll('.prev-btn') : [];
    const shadeOptions = modal ? modal.querySelectorAll('.shade-option') : [];
    const quoteForm = modal ? document.getElementById('quoteForm') : null;
    
    if (!modal) return;
    
    // Open modal
    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // If the button has a service-attribute, pre-select that service
            if (btn.getAttribute('data-service')) {
                const service = btn.getAttribute('data-service');
                const radioInputs = modal.querySelectorAll('input[name="service-type"]');
                radioInputs.forEach(input => {
                    if (input.value === service.toLowerCase()) {
                        input.checked = true;
                    }
                });
            }
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            
            // Animate modal content
            setTimeout(() => {
                modal.querySelector('.modal-content').style.transform = 'translateY(0)';
            }, 10);
        });
    });
    
    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModalFunc);
    }
    
    // Close when clicking outside modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunc();
        }
    });
    
    // Close modal function
    function closeModalFunc() {
        modal.querySelector('.modal-content').style.transform = 'translateY(-30px)';
        
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling again
            
            // Reset form to first step
            steps.forEach((step, index) => {
                step.classList.toggle('active', index === 0);
            });
        }, 300);
    }
    
    // Multi-step form
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Get current step
            const currentStep = btn.closest('.form-step');
            const currentStepNumber = parseInt(currentStep.getAttribute('data-step'));
            
            // Validate current step
            let isValid = true;
            const requiredFields = currentStep.querySelectorAll('input[required], select[required]');
            requiredFields.forEach(field => {
                if (!field.value) {
                    isValid = false;
                    field.style.borderColor = 'var(--error)';
                } else {
                    field.style.borderColor = 'var(--light-gray)';
                }
            });
            
            if (!isValid) {
                // Show error message
                const errorMsg = document.createElement('p');
                errorMsg.textContent = 'Please fill in all required fields.';
                errorMsg.style.color = 'var(--error)';
                errorMsg.style.marginTop = '10px';
                errorMsg.style.fontSize = '0.9rem';
                errorMsg.classList.add('error-message');
                
                // Remove existing error message if any
                const existingError = currentStep.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                currentStep.querySelector('.form-actions').before(errorMsg);
                return;
            }
            
            // Show next step
            currentStep.classList.remove('active');
            const nextStep = document.querySelector(`.form-step[data-step="${currentStepNumber + 1}"]`);
            if (nextStep) {
                nextStep.classList.add('active');
            }
        });
    });
    
    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Get current step
            const currentStep = btn.closest('.form-step');
            const currentStepNumber = parseInt(currentStep.getAttribute('data-step'));
            
            // Show previous step
            currentStep.classList.remove('active');
            const prevStep = document.querySelector(`.form-step[data-step="${currentStepNumber - 1}"]`);
            if (prevStep) {
                prevStep.classList.add('active');
            }
        });
    });
    
    // Shade options selection
    shadeOptions.forEach(option => {
        option.addEventListener('click', () => {
            shadeOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
        });
    });
    
    // Handle form submission
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Show success message
            quoteForm.innerHTML = `
                <div class="success-message">
                    <i class="fas fa-check-circle" style="font-size: 3rem; color: var(--success); margin-bottom: 20px;"></i>
                    <h3>Quote Request Submitted!</h3>
                    <p>Thank you for your interest. We'll contact you shortly with your personalized quote.</p>
                    <button type="button" class="primary-btn" style="margin-top: 20px;" onclick="document.querySelector('.close').click()">Close</button>
                </div>
            `;
        });
    }
}

