// --- DOM Elements ---
const navbar = document.querySelector('.navbar');

// --- Navbar Scroll Effect & Active Link ---
window.addEventListener('scroll', () => {
    // Add glass effect when scrolled
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// --- Close Mobile Menu on Click (Bootstrap Single Page) ---
document.querySelectorAll('.nav-links .nav-item a').forEach(link => {
    link.addEventListener('click', () => {
        const navbarResponsive = document.getElementById('navbarResponsive');
        if (navbarResponsive.classList.contains('show')) {
            // Using bootstrap's JS API cleanly triggers the collapse
            const bsCollapse = bootstrap.Collapse.getInstance(navbarResponsive) || new bootstrap.Collapse(navbarResponsive, { toggle: false });
            bsCollapse.hide();
        }
    });
});


// --- Dynamic Typing Effect in Hero Section ---
const typingTextElement = document.querySelector('.typing-text');
const words = ['Python Developer', 'AI Engineer', 'Backend Specialist'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    // Speeds
    let typingSpeed = isDeleting ? 50 : 100;

    // Word completed
    if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2000; // Pause at the end of word
        isDeleting = true;
    } 
    // Word fully deleted
    else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typingSpeed);
}

// Initialize typing effect
if (typingTextElement) {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(typeEffect, 1000); // Start after 1s
    });
}


// --- Scroll Reveal Animations (Intersection Observer) ---
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: Unobserve if animation should only happen once
            // observer.unobserve(entry.target); 
        }
    });
};

const revealOptions = {
    threshold: 0.15, // Trigger when 15% of element is visible
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// --- Dynamic Glass-Card Glow Effect ---
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        // Calculate the mouse position relative to the element
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// --- Mobile Fullscreen Menu Functionality ---
document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileBtn && mobileOverlay) {
        // Toggle menu open/close
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('open');
            mobileOverlay.classList.toggle('active');
            // Disable background scrolling when menu is active
            if (mobileOverlay.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when a link is clicked
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('open');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
});

// --- Numeric Counter Animation ---
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            const duration = 2000; // Counter animation duration in ms
            const step = target / (duration / 16); // Assuming 60fps (~16ms per frame)
            
            let current = 0;
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            
            updateCounter();
            observer.unobserve(counter); // Only animate once
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});
