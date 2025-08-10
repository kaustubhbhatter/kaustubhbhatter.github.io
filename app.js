// Portfolio JavaScript - Enhanced with case study navigation and fixed scrolling
(function() {
    'use strict';
    
    // Page state management
    let currentPage = 'main';
    
    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializePortfolio();
    });

    function initializePortfolio() {
        setupNavigation();
        setupThemeToggle();
        setupAnimations();
        setupCounters();
        setupSkillBars();
        setupContactForm();
        setupScrollEffects();
        setupCaseStudyNavigation();
        setupPageNavigation();
    }

    // Enhanced navigation setup with fixed navbar height offset
    function setupNavigation() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');
        const heroButtons = document.querySelectorAll('.hero-actions .btn');
        const navbarHeight = 80;

        // Mobile menu toggle
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', function(e) {
                e.preventDefault();
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
        }

        // Navigation link smooth scrolling with navbar offset
        navLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                const dataPage = this.getAttribute('data-page');
                
                // Handle navigation to main portfolio sections
                if (dataPage === 'main' && href && href.startsWith('#')) {
                    // If we're not on main page, switch to it first
                    if (currentPage !== 'main') {
                        switchToMainPage();
                        setTimeout(() => {
                            scrollToSection(href.substring(1), navbarHeight);
                        }, 100);
                    } else {
                        scrollToSection(href.substring(1), navbarHeight);
                    }
                }

                // Close mobile menu
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        // Hero buttons navigation
        heroButtons.forEach(function(button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                
                if (href && href.startsWith('#')) {
                    scrollToSection(href.substring(1), navbarHeight);
                }
            });
        });

        // Update active nav on scroll (only when on main page)
        window.addEventListener('scroll', function() {
            if (currentPage === 'main') {
                updateActiveNavigation();
            }
        });
        
        // Navbar scroll effects
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('navbar');
            const currentTheme = document.documentElement.getAttribute('data-color-scheme');
            
            if (window.scrollY > 50) {
                if (currentTheme === 'dark') {
                    navbar.style.background = 'rgba(38, 40, 40, 0.98)';
                } else {
                    navbar.style.background = 'rgba(252, 252, 249, 0.98)';
                }
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                if (currentTheme === 'dark') {
                    navbar.style.background = 'rgba(38, 40, 40, 0.95)';
                } else {
                    navbar.style.background = 'rgba(252, 252, 249, 0.95)';
                }
                navbar.style.boxShadow = 'none';
            }
        });
    }

    function scrollToSection(sectionId, offset = 80) {
        const targetElement = document.getElementById(sectionId);
        if (targetElement && currentPage === 'main') {
            const targetPosition = targetElement.offsetTop - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    function updateActiveNavigation() {
        const sections = document.querySelectorAll('#main-page section[id]');
        const navLinks = document.querySelectorAll('.nav-link[data-page="main"]');
        
        let currentSection = '';
        const scrollPosition = window.pageYOffset + 120;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(function(link) {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Page navigation setup
    function setupPageNavigation() {
        const logoLink = document.getElementById('nav-logo-link');
        
        // Logo click to return to main page
        if (logoLink) {
            logoLink.addEventListener('click', function(e) {
                e.preventDefault();
                switchToMainPage();
            });
        }

        // Breadcrumb navigation
        setupBreadcrumbNavigation();
    }

    function setupBreadcrumbNavigation() {
        // Home breadcrumb links
        const homeLinks = document.querySelectorAll('[id^="backToHome"]');
        homeLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                switchToMainPage();
            });
        });

        // Case studies breadcrumb links
        const caseStudiesLinks = document.querySelectorAll('[id^="backToCaseStudies"]');
        caseStudiesLinks.forEach(function(link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                switchToMainPage();
                setTimeout(() => {
                    scrollToSection('case-studies', 80);
                }, 100);
            });
        });

        // Case study action buttons
        const caseStudyActionButtons = document.querySelectorAll('.case-study-actions .btn');
        caseStudyActionButtons.forEach(function(button) {
            button.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#contact') {
                    e.preventDefault();
                    switchToMainPage();
                    setTimeout(() => {
                        scrollToSection('contact', 80);
                    }, 100);
                } else if (href === '#case-studies') {
                    e.preventDefault();
                    switchToMainPage();
                    setTimeout(() => {
                        scrollToSection('case-studies', 80);
                    }, 100);
                }
            });
        });
    }

    function switchToMainPage() {
        // Hide all case study pages
        const caseStudyPages = document.querySelectorAll('.case-study-page');
        caseStudyPages.forEach(function(page) {
            page.classList.add('hidden');
        });

        // Show main page
        const mainPage = document.getElementById('main-page');
        if (mainPage) {
            mainPage.classList.remove('hidden');
        }

        currentPage = 'main';
        window.scrollTo(0, 0);
    }

    function switchToCaseStudy(caseStudyId) {
        // Hide main page
        const mainPage = document.getElementById('main-page');
        if (mainPage) {
            mainPage.classList.add('hidden');
        }

        // Hide all case study pages
        const caseStudyPages = document.querySelectorAll('.case-study-page');
        caseStudyPages.forEach(function(page) {
            page.classList.add('hidden');
        });

        // Show target case study page
        const targetPage = document.getElementById(caseStudyId);
        if (targetPage) {
            targetPage.classList.remove('hidden');
        }

        currentPage = caseStudyId;
        window.scrollTo(0, 0);
    }

    // Case study navigation setup
    function setupCaseStudyNavigation() {
        // Case study card clicks
        const caseStudyCards = document.querySelectorAll('.clickable-card');
        caseStudyCards.forEach(function(card) {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                const caseStudyId = this.getAttribute('data-case');
                if (caseStudyId) {
                    switchToCaseStudy(caseStudyId);
                }
            });
        });

        // Next/Previous navigation buttons
        const caseNavButtons = document.querySelectorAll('.case-nav-btn');
        caseNavButtons.forEach(function(button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const targetCase = this.getAttribute('data-case');
                if (targetCase && !this.disabled) {
                    switchToCaseStudy(targetCase);
                }
            });
        });
    }

    // Theme toggle setup
    function setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('.theme-icon');
        
        // Initialize theme
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        let currentTheme ='light';
        
        applyTheme(currentTheme);
        
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            applyTheme(currentTheme);
        });
        
        function applyTheme(theme) {
            const root = document.documentElement;
            const navbar = document.getElementById('navbar');
            
            // Set data attribute
            root.setAttribute('data-color-scheme', theme);
            
            // Update icon
            themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
            
            // Update navbar immediately
            if (theme === 'dark') {
                navbar.style.background = window.scrollY > 50 ? 
                    'rgba(38, 40, 40, 0.98)' : 'rgba(38, 40, 40, 0.95)';
            } else {
                navbar.style.background = window.scrollY > 50 ? 
                    'rgba(252, 252, 249, 0.98)' : 'rgba(252, 252, 249, 0.95)';
            }
        }
    }

    // Animations setup
    function setupAnimations() {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Add animation classes
        addAnimationClasses();
        
        // Observe all animated elements
        const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
        animatedElements.forEach(function(el) {
            observer.observe(el);
        });
    }

    function addAnimationClasses() {
        // Hero stats
        const heroStats = document.querySelectorAll('.stat-item');
        heroStats.forEach(function(stat, index) {
            stat.classList.add('fade-in');
            stat.style.animationDelay = (index * 0.2) + 's';
        });

        // Section headers
        document.querySelectorAll('.section-header').forEach(function(header) {
            header.classList.add('fade-in');
        });

        // Case cards
        document.querySelectorAll('.case-card').forEach(function(card, index) {
            card.classList.add('fade-in');
            card.style.animationDelay = (index * 0.3) + 's';
        });

        // Skill categories
        document.querySelectorAll('.skill-category').forEach(function(category, index) {
            category.classList.add('fade-in');
            category.style.animationDelay = (index * 0.2) + 's';
        });

        // Timeline items
        document.querySelectorAll('.timeline-item').forEach(function(item, index) {
            const animationClass = index % 2 === 0 ? 'slide-in-left' : 'slide-in-right';
            item.classList.add(animationClass);
        });

        // Value props
        document.querySelectorAll('.value-prop').forEach(function(prop, index) {
            prop.classList.add('fade-in');
            prop.style.animationDelay = (index * 0.15) + 's';
        });
    }

    // Counter animations
    function setupCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.8 });

        counters.forEach(function(counter) {
            counterObserver.observe(counter);
        });
    }

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 1000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const currentValue = Math.floor(target * progress);
            element.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // Skill bars animation
    function setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const skillObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const level = skillBar.getAttribute('data-level');
                    
                    setTimeout(function() {
                        skillBar.style.width = level + '%';
                    }, 500);
                    
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        skillBars.forEach(function(bar) {
            skillObserver.observe(bar);
        });
    }


    // Additional scroll effects
    function setupScrollEffects() {
        // Only apply parallax on main page
        window.addEventListener('scroll', function() {
            if (currentPage === 'main') {
                const scrolled = window.pageYOffset;
                const parallax = document.querySelector('.hero');
                
                if (parallax) {
                    const speed = scrolled * 0.1;
                    parallax.style.transform = 'translateY(' + speed + 'px)';
                }
            }
        });
    }

    // Handle page load
    window.addEventListener('load', function() {
        // Trigger initial animations
        document.body.classList.add('loaded');
        
        // Ensure we start on main page
        switchToMainPage();
        
        // Smooth scroll to top on page load
        window.scrollTo(0, 0);
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        // For now, always return to main page
        // In a real application, you might want to handle this differently
        switchToMainPage();
    });

})();
