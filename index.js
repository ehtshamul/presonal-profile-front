// Static data for projects
const projects = [
   {
    title: "Welcome to my portfolio",
    description: "I'm a passionate MERN stack developer...",
    imageUrl: "...",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    githuburl: "https://github.com/ehtshamul/Personal-Portfolio",
    liveurl: "https://github.com/ehtshamul/Personal-Portfolio"
  },
    {
        title: "Task Management App",
        description: "A collaborative task management application with real-time updates",
        imageUrl: "https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=600",
        technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
        githuburl: "https://github.com/example/taskapp",
        liveurl: "https://taskapp-demo.com"
    },
    {
        title: "Weather Dashboard",
        description: "Real-time weather information with interactive charts and maps",
        imageUrl: "https://images.pexels.com/photos/574077/pexels-photo-574077.jpeg?auto=compress&cs=tinysrgb&w=600",
        technologies: ["JavaScript", "Chart.js", "OpenWeather API"],
        githuburl: "https://github.com/example/weather",
        liveurl: "https://weather-demo.com"
    }
];

// Static data for blogs
const blog = [
    {
        title: "Getting Started with React Hooks",
        excerpt: "Learn how to use React Hooks to manage state and side effects in functional components.",
        imageUrl: "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=600",
        author: "John Doe",
        createdAt: "2024-01-15",
        tags: ["React", "JavaScript", "Frontend"]
    },
    {
        title: "Building RESTful APIs with Express",
        excerpt: "A comprehensive guide to creating RESTful APIs using Node.js and Express framework.",
        imageUrl: "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=600",
        author: "Jane Smith",
        createdAt: "2024-01-10",
        tags: ["Node.js", "Express", "Backend"]
    },
    {
        title: "CSS Grid vs Flexbox: When to Use What",
        excerpt: "Understanding the differences between CSS Grid and Flexbox for modern layouts.",
        imageUrl: "https://images.pexels.com/photos/261662/pexels-photo-261662.jpeg?auto=compress&cs=tinysrgb&w=600",
        author: "Mike Johnson",
        createdAt: "2024-01-05",
        tags: ["CSS", "Frontend", "Layout"]
    }
];

// Global variables
const projectsGrid = document.getElementById("projects-grid");
const projectsLoading = document.querySelector(".projects-loading");
const blogGrid = document.getElementById("blog-grid");
const blogLoading = document.querySelector(".blog-loading");
const contactForm = document.getElementById("contact-form");
const navMenu = document.querySelector(".nav-menu");

// Utility functions
function showLoading(element) {
    if (element) {
        element.style.display = 'block';
    }
}

function hideLoading(element) {
    if (element) {
        element.style.display = 'none';
    }
}

// Format date function
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

const showError = (container, message) => {
    if (container) {
        container.innerHTML = `<div class="error-message">${message}</div>`;
    }
};

const showMessage = (type, message) => {
    // Remove existing messages
    const existingMessage = document.querySelector('.message-popup');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `message-popup ${type}`;
    messageDiv.innerHTML = `
        <div class="message-content">
            <span class="message-text">${message}</span>
            <button class="message-close">&times;</button>
        </div>
    `;

    // Add styles
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 1000;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;

    // Add close functionality
    const closeBtn = messageDiv.querySelector('.message-close');
    closeBtn.addEventListener('click', () => messageDiv.remove());

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);

    document.body.appendChild(messageDiv);
};

// DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
    // Add CSS for message animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .message-popup .message-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .message-popup .message-close {
            background: none;
            border: none;
            color: white;
            font-size: 20px;
            cursor: pointer;
            margin-left: 10px;
            padding: 0;
            line-height: 1;
        }
        
        .message-popup .message-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = link.getAttribute('href');
            const targetElement = document.querySelector(target);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.project-card, .blog-card, .skill-category, .stat');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Load and render projects
    function loadProjects() {
        if (projectsLoading) {
            showLoading(projectsLoading);
        }
        
        // Simulate loading delay
        setTimeout(() => {
            renderProjects(projects);
            if (projectsLoading) {
            hideLoading(projectsLoading);
        }
        }, 500);
    }

    // Render projects in the grid
    function renderProjects(projectData) {
        if (!projectsGrid) return;
        if (projectData.length === 0) {
            projectsGrid.innerHTML = `<p>NO PROJECTS FOUND</p>`;
            return;
        }
        
         projectsGrid.innerHTML = projectData.map(project => `
        <div class="project-card" data-aos="fade-up">
            <div class="project-image">
                    <img src="${project.imageUrl}" 
                     alt="${project.title}"
                     loading="lazy">
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                   ${project.technologies ? 
                     (Array.isArray(project.technologies) 
  ? project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('') 
                       : `<span class="tech-tag">${project.technologies}</span>`
                     ) : ''
}
                </div>
                <div class="project-links">
                    ${project.githuburl ? `<a href="${project.githuburl}" target="_blank" rel="noopener noreferrer" class="project-link">
                        <i class="fab fa-github"></i> GitHub
                    </a>` : ''}
                    ${project.liveurl ? `<a href="${project.liveurl}" target="_blank" rel="noopener noreferrer" class="project-link">
                        <i class="fas fa-external-link-alt"></i> Live Demo
                    </a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

    // Load and render blogs
    function loadAndRenderBlogs() {
        if (blogLoading) {
        showLoading(blogLoading);
        }
        
        // Simulate loading delay
        setTimeout(() => {
        if (!blogGrid) return;

            blogGrid.innerHTML = blog.length === 0
            ? '<p class="no-data">No blog posts found.</p>'
                : blog.slice(0, 6).map(blogPost => `
                <div class="blog-card" data-aos="fade-up">
                    <div class="blog-image">
                            <img src="${blogPost.imageUrl}" 
                                 alt="${blogPost.title}" loading="lazy">
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                                <span><i class="fas fa-user"></i> ${blogPost.author || 'Admin'}</span>
                                <span><i class="fas fa-calendar"></i> ${formatDate(blogPost.createdAt)}</span>
                        </div>
                            <h3 class="blog-title">${blogPost.title}</h3>
                            <p class="blog-excerpt">${blogPost.excerpt}</p>
                        <div class="blog-tags">
                                ${blogPost.tags && blogPost.tags.length > 0 
                                  ? blogPost.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('') 
                              : ''
                            }
                        </div>
                    </div>
                </div>
            `).join('');

            if (blogLoading) {
        hideLoading(blogLoading);
    }
        }, 500);
    }

    // Contact form handling
    const handleContactForm = async (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const contactData = {
        name: formData.get('name').trim(),
        email: formData.get('email').trim(),
        subject: formData.get('subject').trim(),
        message: formData.get('message').trim()
    };

    // Basic validation
    if (!contactData.name || !contactData.email || !contactData.subject || !contactData.message) {
        showMessage('error', 'Please fill in all fields');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
        showMessage('error', 'Please enter a valid email address');
        return;
    }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            showMessage('success', 'Message sent successfully! (Demo mode)');
                contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    };

    // Initialize everything
    loadProjects();
    loadAndRenderBlogs();

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    });

