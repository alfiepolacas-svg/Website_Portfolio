// ==================== PRELOADER ====================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 500);
    }, 1000);
});

// ==================== NAVIGATION ====================
const navbar = document.getElementById('navbar');
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('nav ul li a');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth scroll
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            const target = document.querySelector(targetId);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Active nav link
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (window.pageYOffset >= section.offsetTop - 200) {
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

// ==================== COUNTER ANIMATION ====================
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

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) animateCounters();
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) statsObserver.observe(statsSection);

// ==================== PORTFOLIO FILTER ====================
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
                setTimeout(() => card.style.display = 'none', 300);
            }
        });
    });
});

// ==================== RESUME ====================
const resumeData = {
    education: [
        {
            year: '2023',
            title: 'Bachelor of Science in Information Technology',
            subtitle: 'Cor Jesu College - (2023 - 2027)',
            description: 'Currently pursuing BSIT with focus on web development, software engineering, and database management.'
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
            description: 'Providing web development services to clients. Building custom solutions and maintaining projects.'
        },
        {
            year: '2023',
            title: 'Web Development Intern',
            subtitle: 'Tech Startup - (Summer 2023)',
            description: 'Assisted in developing responsive websites and learned industry best practices.'
        }
    ]
};

const tabs = document.querySelectorAll('.tab');
const resumeContent = document.getElementById('resumeContent');

const renderResumeContent = (category) => {
    resumeContent.innerHTML = '';
    resumeData[category].forEach(item => {
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
        renderResumeContent(tab.getAttribute('data-tab'));
    });
});

renderResumeContent('education');

// ==================== CONTACT FORM - WEB3FORMS ====================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

// Handle form submission
if (contactForm) {
    contactForm.addEventListener('submit', function() {
        const submitBtn = this.querySelector('.submit-btn');
        if (submitBtn) {
            submitBtn.textContent = 'SENDING...';
            submitBtn.disabled = true;
        }
    });
}

// Handle success redirect
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    if (urlParams.get('success') === 'true' && formMessage) {
        formMessage.textContent = 'Thank you! Your message has been sent successfully. I will get back to you within 24 hours.';
        formMessage.className = 'form-message success';
        formMessage.style.display = 'block';
        
        setTimeout(() => {
            document.getElementById('contact').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        }, 100);
        
        setTimeout(() => {
            formMessage.style.display = 'none';
            window.history.replaceState({}, document.title, window.location.pathname);
        }, 7000);
    }
});

// ==================== BACK TO TOP ====================
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('show', window.pageYOffset > 300);
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== SCROLL PROGRESS ====================
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// ==================== SCROLL ANIMATIONS ====================
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

