
// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }, 1000);
});

// Navigation
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('nav ul li a');

// Mobile menu toggle
mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Counter Animation
const counters = document.querySelectorAll('.count');
let counterAnimated = false;

const animateCounters = () => {
    if (counterAnimated) return;
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    });
    counterAnimated = true;
};

const statsSection = document.querySelector('.stats');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Portfolio Filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioCards = document.querySelectorAll('.portfolio-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioCards.forEach(card => {
            if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Resume Data
const resumeData = {
    education: [
        {
            year: '2023',
            title: 'Bachelor of Science in Information Technology',
            subtitle: 'Cor Jesu College - (2023 - 2027)',
            description: 'Currently pursuing BSIT with focus on web development, software engineering, and database management systems.'
        },
        {
            year: '2019',
            title: 'Senior High School',
            subtitle: 'ICT Strand - (2019 - 2021)',
            description: 'Completed senior high school with specialization in Information and Communications Technology.'
        }
    ],
    skills: [
        {
            year: '95%',
            title: 'Web Development',
            subtitle: 'HTML, CSS, JavaScript, PHP',
            description: 'Expert in building responsive, modern websites with clean code and best practices.'
        },
        {
            year: '90%',
            title: 'Frontend Frameworks',
            subtitle: 'React, Vue.js',
            description: 'Proficient in modern JavaScript frameworks for building dynamic web applications.'
        },
        {
            year: '85%',
            title: 'UI/UX Design',
            subtitle: 'Figma, Adobe XD',
            description: 'Creating intuitive user interfaces with focus on user experience and accessibility.'
        },
        {
            year: '88%',
            title: 'Database Management',
            subtitle: 'MySQL, MongoDB',
            description: 'Designing and optimizing database schemas and writing efficient queries.'
        }
    ],
    experience: [
        {
            year: '2024',
            title: 'Freelance Web Developer',
            subtitle: 'Self-Employed - (2024 - Present)',
            description: 'Providing web development services to clients. Building custom solutions and maintaining existing projects.'
        },
        {
            year: '2023',
            title: 'Web Development Intern',
            subtitle: 'Tech Startup - (Summer 2023)',
            description: 'Assisted in developing responsive websites and learned industry best practices.'
        }
    ]
};

// Resume Tabs
const tabs = document.querySelectorAll('.tab');
const resumeContent = document.getElementById('resumeContent');

const renderResumeContent = (category) => {
    const data = resumeData[category];
    resumeContent.innerHTML = '';

    data.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'resume-card';
        card.innerHTML = `
            <span class="resume-year">${item.year}</span>
            <h3>${item.title}</h3>
            <p class="date">${item.subtitle}</p>
            <p>${item.description}</p>
        `;
        resumeContent.appendChild(card);
    });
};

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const category = tab.getAttribute('data-tab');
        renderResumeContent(category);
    });
});

// Initialize with education tab
renderResumeContent('education');

// ============================================
// CONTACT FORM - FORMSUBMIT.CO (COMPLETE SETUP)
// ============================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
    }

    // Show sending message
    showFormMessage('Sending message...', 'success');

    // Get device & browser information
    const browserInfo = navigator.userAgent;
    const screenSize = `${window.screen.width}x${window.screen.height}`;
    const timestamp = new Date().toLocaleString();
    const deviceType = /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'Mobile 📱' : 'Desktop 💻';
    
    // Detect browser
    let browserName = 'Unknown';
    if (browserInfo.includes('Chrome')) browserName = 'Chrome 🌐';
    else if (browserInfo.includes('Firefox')) browserName = 'Firefox 🦊';
    else if (browserInfo.includes('Safari')) browserName = 'Safari 🧭';
    else if (browserInfo.includes('Edge')) browserName = 'Edge 🔷';
    
    // Prepare email data with ALL features
    const emailData = {
        // ===== MAIN CONTACT INFO =====
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        
        // ===== FORMSUBMIT SPECIAL FIELDS (with _) =====
        _replyto: formData.email,  // Reply button → client's email
        _subject: `🔔 New Portfolio Contact: ${formData.name} - ${formData.subject}`,
        _template: 'table',  // Beautiful table format
        _captcha: 'false',   // Disable captcha for smooth UX
        
        // ===== AUTO-RESPONSE TO CLIENT =====
        _autoresponse: `Hi ${formData.name}! 👋\n\nThank you for reaching out through my portfolio. I've received your message about "${formData.subject}" and will get back to you within 24 hours.\n\nBest regards,\nAlfie Lynard S. Polacas\nWeb Developer & Designer\n\n---\nThis is an automated response. Please do not reply to this email.`,
        
        // ===== ADDITIONAL TRACKING INFO =====
        '📱 Device Type': deviceType,
        '📏 Screen Size': screenSize,
        '🌐 Browser': browserName,
        '⏰ Submitted At': timestamp,
        '🌍 Page URL': window.location.href,
        '📍 Source': 'Portfolio Contact Form',
        
        // ===== OPTIONAL: UNCOMMENT TO USE =====
        // '_cc': 'backup@email.com',  // Send copy to another email
        // '_next': 'https://yoursite.com/thank-you.html',  // Redirect after submit
    };

    // Send to FormSubmit
    fetch('https://formsubmit.co/alfielynard23@gmail.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(emailData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Success!
        showFormMessage('✅ Thank you! Your message has been sent successfully. You will receive a confirmation email shortly.', 'success');
        contactForm.reset();
        
        // Log success (for debugging)
        console.log('Form submitted successfully:', data);
        
        // Hide message after 7 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 7000);
    })
    .catch((error) => {
        // Error handling
        showFormMessage('❌ Sorry, there was an error sending your message. Please try again or email me directly at alfielynard23@gmail.com', 'error');
        console.error('FormSubmit Error:', error);
    });
});

// Show form message function
const showFormMessage = (message, type) => {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';
};

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll Progress Bar
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Initialize animations
const observeElements = document.querySelectorAll('.service-card, .portfolio-card, .testimonial-card');

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

observeElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
    scrollObserver.observe(element);
});
