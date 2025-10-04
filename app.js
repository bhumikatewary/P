// Project data
const projectsData = [
  {
    title: "Digital Banking App Redesign",
    problem: "Users were struggling with complex navigation and lengthy processes for basic banking tasks. The existing app had poor user experience with a 2.1 star rating and high abandonment rates during critical financial transactions.",
    research: "Conducted user interviews with 150+ customers across different demographics, analyzed app analytics to identify pain points, performed competitive analysis of top banking apps, and created user journey maps to understand friction points.",
    solution: "Redesigned information architecture with user-centric navigation, simplified user flows for common tasks, implemented a personalized dashboard based on user behavior, and introduced progressive disclosure to reduce cognitive load.",
    outcomes: "40% increase in daily active users, 25% reduction in customer support tickets, improved app rating to 4.2 stars, and 60% faster task completion times for core banking functions."
  },
  {
    title: "AI-Powered Recommendation Engine",
    problem: "Low product discovery and poor conversion rates on the e-commerce platform. Users were having difficulty finding relevant products, leading to high bounce rates and missed revenue opportunities.",
    research: "Analyzed user behavior patterns across 2M+ sessions, conducted market research on recommendation algorithms, performed A/B tests on different recommendation approaches, and interviewed customers about their shopping preferences.",
    solution: "Implemented machine learning-based recommendation engine combining collaborative filtering and content-based algorithms, personalized product suggestions based on browsing history, and real-time adaptation to user preferences.",
    outcomes: "30% increase in conversion rate, ₹50CR additional revenue in the first year, 45% improvement in average order value, and 2x increase in user session duration."
  },
  {
    title: "Supply Chain Optimization Platform",
    problem: "Manual processes causing significant delays and inefficiencies in supply chain management. Vendors and retailers were struggling with paper-based workflows, leading to errors and lost opportunities.",
    research: "Interviewed 100+ vendors and retailers to understand pain points, mapped current state processes to identify bottlenecks, analyzed industry best practices, and studied competitor solutions in the B2B space.",
    solution: "Built automated platform with real-time tracking capabilities, digital documentation workflow, integrated analytics dashboard, and automated notifications for critical milestones in the supply chain.",
    outcomes: "60% reduction in order processing time, successfully onboarded 500+ vendors, achieved ₹25CR GMV in first 6 months, and improved vendor satisfaction scores by 40%."
  },
  {
    title: "Customer Support Chatbot Integration",
    problem: "High volume of repetitive customer queries overwhelming the support team, leading to long response times and decreased customer satisfaction. 70% of tickets were routine inquiries that could be automated.",
    research: "Analyzed support ticket patterns over 12 months, categorized query types, studied customer feedback on response times, benchmarked against industry standards, and researched NLP capabilities for customer service.",
    solution: "Implemented NLP-powered chatbot with machine learning capabilities, created escalation workflows for complex queries, integrated with existing CRM system, and established continuous learning feedback loops.",
    outcomes: "70% reduction in average response time, 85% first-contact resolution rate for common queries, improved customer satisfaction scores by 35%, and freed up support team for high-value interactions."
  }
];

// Theme management
class ThemeManager {
  constructor() {
    this.theme = localStorage.getItem('theme') || 
                 (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    this.init();
  }

  init() {
    this.applyTheme();
    this.setupToggle();
    this.watchSystemTheme();
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    this.updateToggleIcon();
  }

  updateToggleIcon() {
    const themeIcon = document.querySelector('.theme-icon');
    if (themeIcon) {
      themeIcon.textContent = this.theme === 'dark' ? '☀️' : '🌙';
    }
  }

  toggle() {
    this.theme = this.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', this.theme);
    this.applyTheme();
  }

  setupToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => this.toggle());
    }
  }

  watchSystemTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.theme = e.matches ? 'dark' : 'light';
        this.applyTheme();
      }
    });
  }
}

// Mobile menu management
class MobileMenu {
  constructor() {
    this.isOpen = false;
    this.init();
  }

  init() {
    this.setupToggle();
    this.setupNavLinks();
  }

  setupToggle() {
    const toggleBtn = document.getElementById('mobileMenuToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (toggleBtn && navMenu) {
      toggleBtn.addEventListener('click', () => this.toggle());
    }
  }

  toggle() {
    const navMenu = document.querySelector('.nav-menu');
    const toggleBtn = document.getElementById('mobileMenuToggle');
    
    this.isOpen = !this.isOpen;
    
    if (navMenu) {
      navMenu.style.display = this.isOpen ? 'flex' : 'none';
      navMenu.style.position = this.isOpen ? 'absolute' : 'static';
      navMenu.style.top = this.isOpen ? '100%' : 'auto';
      navMenu.style.left = this.isOpen ? '0' : 'auto';
      navMenu.style.width = this.isOpen ? '100%' : 'auto';
      navMenu.style.background = this.isOpen ? 'var(--color-surface)' : 'transparent';
      navMenu.style.flexDirection = this.isOpen ? 'column' : 'row';
      navMenu.style.padding = this.isOpen ? 'var(--space-20)' : '0';
      navMenu.style.boxShadow = this.isOpen ? 'var(--shadow-lg)' : 'none';
      navMenu.style.borderRadius = this.isOpen ? '0 0 var(--radius-lg) var(--radius-lg)' : '0';
    }

    if (toggleBtn) {
      toggleBtn.classList.toggle('active', this.isOpen);
    }
  }

  close() {
    if (this.isOpen) {
      this.toggle();
    }
  }

  setupNavLinks() {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.close();
      });
    });
  }
}

// Smooth scrolling
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const navHeight = document.querySelector('.navbar').offsetHeight;
    const sectionTop = section.offsetTop - navHeight - 20;
    
    window.scrollTo({
      top: sectionTop,
      behavior: 'smooth'
    });
  }
}

// Navigation highlight
class NavigationHighlight {
  constructor() {
    this.sections = [];
    this.navLinks = [];
    this.init();
  }

  init() {
    this.sections = document.querySelectorAll('section[id]');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.setupScrollListener();
    this.setupClickListeners();
  }

  setupScrollListener() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateActiveLink();
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  setupClickListeners() {
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const sectionId = href.substring(1);
          scrollToSection(sectionId);
        }
      });
    });
  }

  updateActiveLink() {
    const navHeight = document.querySelector('.navbar').offsetHeight;
    const scrollPosition = window.scrollY + navHeight + 100;

    let currentSection = '';
    
    this.sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    this.navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }
}

// Project modal management
class ProjectModal {
  constructor() {
    this.modal = null;
    this.init();
  }

  init() {
    this.modal = document.getElementById('projectModal');
    this.setupCloseListeners();
  }

  open(projectIndex) {
    if (!this.modal || !projectsData[projectIndex]) return;

    const project = projectsData[projectIndex];
    
    // Update modal content
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalProblem').textContent = project.problem;
    document.getElementById('modalResearch').textContent = project.research;
    document.getElementById('modalSolution').textContent = project.solution;
    document.getElementById('modalOutcomes').textContent = project.outcomes;

    // Show modal
    this.modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Focus management
    this.modal.focus();
  }

  close() {
    if (!this.modal) return;

    this.modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  setupCloseListeners() {
    if (!this.modal) return;

    // Close button
    const closeBtn = this.modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }

    // Backdrop click
    const backdrop = this.modal.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', () => this.close());
    }

    // Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
        this.close();
      }
    });
  }
}

// Contact form validation
class ContactForm {
  constructor() {
    this.form = null;
    this.init();
  }

  init() {
    this.form = document.getElementById('contactForm');
    if (this.form) {
      this.setupFormSubmission();
      this.setupRealTimeValidation();
    }
  }

  setupFormSubmission() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSubmit();
    });
  }

  setupRealTimeValidation() {
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';

    // Clear previous error
    this.clearError(field);

    switch (fieldName) {
      case 'name':
        if (!value) {
          errorMessage = 'Name is required';
          isValid = false;
        } else if (value.length < 2) {
          errorMessage = 'Name must be at least 2 characters long';
          isValid = false;
        }
        break;

      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
          errorMessage = 'Email is required';
          isValid = false;
        } else if (!emailRegex.test(value)) {
          errorMessage = 'Please enter a valid email address';
          isValid = false;
        }
        break;

      case 'message':
        if (!value) {
          errorMessage = 'Message is required';
          isValid = false;
        } else if (value.length < 10) {
          errorMessage = 'Message must be at least 10 characters long';
          isValid = false;
        }
        break;
    }

    if (!isValid) {
      this.showError(field, errorMessage);
    }

    return isValid;
  }

  showError(field, message) {
    const errorElement = document.getElementById(`${field.name}Error`);
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.display = 'block';
    }
    field.classList.add('error');
  }

  clearError(field) {
    const errorElement = document.getElementById(`${field.name}Error`);
    if (errorElement) {
      errorElement.style.display = 'none';
    }
    field.classList.remove('error');
  }

  validateForm() {
    const fields = this.form.querySelectorAll('input[required], textarea[required]');
    let isFormValid = true;

    fields.forEach(field => {
      if (!this.validateField(field)) {
        isFormValid = false;
      }
    });

    return isFormValid;
  }

  handleSubmit() {
    if (!this.validateForm()) {
      return;
    }

    const formData = new FormData(this.form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message')
    };

    // Simulate form submission
    this.showSuccessMessage();
    this.form.reset();
  }

  showSuccessMessage() {
    // Create success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.style.cssText = `
      background: var(--color-secondary);
      color: var(--color-primary);
      padding: var(--space-16);
      border-radius: var(--radius-base);
      margin-top: var(--space-16);
      border: 1px solid var(--color-border);
      text-align: center;
      font-weight: 500;
    `;
    successMessage.textContent = 'Thank you for your message! I\'ll get back to you soon.';

    // Insert after form
    this.form.parentNode.insertBefore(successMessage, this.form.nextSibling);

    // Remove after 5 seconds
    setTimeout(() => {
      if (successMessage.parentNode) {
        successMessage.parentNode.removeChild(successMessage);
      }
    }, 5000);
  }
}

// Animations and scroll effects
class ScrollAnimations {
  constructor() {
    this.observers = [];
    this.init();
  }

  init() {
    this.setupIntersectionObserver();
    this.setupParallaxEffects();
  }

  setupIntersectionObserver() {
    const options = {
      threshold: 0.1,
      rootMargin: '-50px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, options);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(`
      .project-card,
      .skill-category,
      .testimonial-card,
      .highlight-item,
      .about-text,
      .contact-info
    `);

    animateElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s ease-out';
      observer.observe(el);
    });

    this.observers.push(observer);
  }

  setupParallaxEffects() {
    const heroPattern = document.querySelector('.hero-pattern');
    
    if (heroPattern) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        heroPattern.style.transform = `translateY(${rate}px)`;
      });
    }
  }
}

// Performance optimization
class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.setupLazyLoading();
    this.setupImageOptimization();
    this.preloadCriticalResources();
  }

  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const lazyImages = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
    }
  }

  setupImageOptimization() {
    // Preload critical images
    const criticalImages = [
      // Add any critical image URLs here
    ];

    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }

  preloadCriticalResources() {
    // Preload Google Fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preconnect';
    fontLink.href = 'https://fonts.gstatic.com';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);
  }
}

// Global functions for HTML onclick handlers
function openProjectModal(projectIndex) {
  if (window.projectModal) {
    window.projectModal.open(projectIndex);
  }
}

function closeProjectModal() {
  if (window.projectModal) {
    window.projectModal.close();
  }
}

// Add CSS for animations
function addAnimationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }

    .nav-link.active {
      color: var(--color-primary);
    }

    .nav-link.active::after {
      width: 100%;
    }

    .form-control.error {
      border-color: #e53e3e;
      box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1);
    }

    .success-message {
      animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .mobile-menu-toggle.active .hamburger:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }

    .mobile-menu-toggle.active .hamburger:nth-child(2) {
      opacity: 0;
    }

    .mobile-menu-toggle.active .hamburger:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }

    @media (max-width: 768px) {
      .nav-menu {
        display: none !important;
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  // Add animation styles
  addAnimationStyles();

  // Initialize all modules
  const themeManager = new ThemeManager();
  const mobileMenu = new MobileMenu();
  const navigationHighlight = new NavigationHighlight();
  const contactForm = new ContactForm();
  const scrollAnimations = new ScrollAnimations();
  const performanceOptimizer = new PerformanceOptimizer();

  // Initialize project modal and make it globally accessible
  window.projectModal = new ProjectModal();

  // Add smooth scrolling to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      scrollToSection(targetId);
    });
  });

  // Add loading state management
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // Handle resize events
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Handle responsive adjustments
      if (window.innerWidth > 768) {
        mobileMenu.close();
      }
    }, 250);
  });

  // Add keyboard navigation support
  document.addEventListener('keydown', (e) => {
    // Tab navigation enhancement
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
  });

  console.log('Arjun Sharma Portfolio - Initialized successfully! 🚀');
});