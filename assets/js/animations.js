/**
 * Animations and Dynamic Effects for Ayush's Portfolio
 */

(function($) {
    "use strict";
    
    // Typing animation for the home section
    function initTypingAnimation() {
        if (typeof Typed !== 'undefined') {
            new Typed('#typing-text', {
                strings: [
                    'Web Developer',
                    'Data Scientist',
                    'Machine Learning Engineer',
                    'AI Enthusiast',
                    'Python Developer',
                    'Full Stack Developer',
                    'Deep Learning Specialist',
                    'Cloud Computing Expert'
                ],
                typeSpeed: 70,
                backSpeed: 35,
                backDelay: 1800,
                startDelay: 700,
                loop: true,
                showCursor: true,
                cursorChar: '|',
                autoInsertCss: true,
                fadeOut: false,
                contentType: 'text',
                onBegin: (self) => {
                    const typingText = document.getElementById('typing-text');
                    if (typingText) {
                        typingText.style.color = 'transparent';
                        typingText.style.background = 'linear-gradient(45deg, #12c2e9, #c471ed, #f64f59)';
                        typingText.style.webkitBackgroundClip = 'text';
                        typingText.style.backgroundClip = 'text';
                        typingText.style.backgroundSize = '200% auto';
                    }
                },
                onStringTyped: (arrayPos, self) => {
                    const cursor = document.querySelector('.typed-cursor');
                    if (cursor) {
                        cursor.style.display = 'inline';
                    }
                }
            });
        }
    }
    
    // Skill progress animation
    function initSkillsAnimation() {
        $('.skill-progress').each(function() {
            var $this = $(this);
            var percentage = $this.find('.progress-bar').data('percentage');
            
            $this.appear(function() {
                $this.find('.progress-bar').animate({
                    width: percentage + '%'
                }, 1000);
                $this.find('.progress-value').countTo({
                    from: 0,
                    to: percentage,
                    speed: 1200
                });
            });
        });
    }
    
    // Animate on scroll initialization
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true
            });
        }
    }
    
    // Parallax effect for background elements
    function initParallax() {
        if (typeof Parallax !== 'undefined') {
            var scene = document.getElementById('parallax-scene');
            if (scene) {
                new Parallax(scene);
            }
        }
    }
    
    // Tilt effect for project cards
    function initTilt() {
        if (typeof VanillaTilt !== 'undefined') {
            VanillaTilt.init(document.querySelectorAll('.work-box'), {
                max: 15,
                speed: 400,
                glare: true,
                "max-glare": 0.3
            });
        }
    }
    
    // Particle background effect
    function initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                "particles": {
                    "number": {
                        "value": 80,
                        "density": {
                            "enable": true,
                            "value_area": 800
                        }
                    },
                    "color": {
                        "value": "#12c2e9"
                    },
                    "shape": {
                        "type": "circle",
                        "stroke": {
                            "width": 0,
                            "color": "#000000"
                        },
                        "polygon": {
                            "nb_sides": 5
                        }
                    },
                    "opacity": {
                        "value": 0.5,
                        "random": false,
                        "anim": {
                            "enable": false,
                            "speed": 1,
                            "opacity_min": 0.1,
                            "sync": false
                        }
                    },
                    "size": {
                        "value": 3,
                        "random": true,
                        "anim": {
                            "enable": false,
                            "speed": 40,
                            "size_min": 0.1,
                            "sync": false
                        }
                    },
                    "line_linked": {
                        "enable": true,
                        "distance": 150,
                        "color": "#12c2e9",
                        "opacity": 0.4,
                        "width": 1
                    },
                    "move": {
                        "enable": true,
                        "speed": 6,
                        "direction": "none",
                        "random": false,
                        "straight": false,
                        "out_mode": "out",
                        "bounce": false,
                        "attract": {
                            "enable": false,
                            "rotateX": 600,
                            "rotateY": 1200
                        }
                    }
                },
                "interactivity": {
                    "detect_on": "canvas",
                    "events": {
                        "onhover": {
                            "enable": true,
                            "mode": "repulse"
                        },
                        "onclick": {
                            "enable": true,
                            "mode": "push"
                        },
                        "resize": true
                    },
                    "modes": {
                        "grab": {
                            "distance": 400,
                            "line_linked": {
                                "opacity": 1
                            }
                        },
                        "bubble": {
                            "distance": 400,
                            "size": 40,
                            "duration": 2,
                            "opacity": 8,
                            "speed": 3
                        },
                        "repulse": {
                            "distance": 200,
                            "duration": 0.4
                        },
                        "push": {
                            "particles_nb": 4
                        },
                        "remove": {
                            "particles_nb": 2
                        }
                    }
                },
                "retina_detect": true
            });
        }
    }
    
    // Smooth scroll for anchor links
    function initSmoothScroll() {
        $('a.smooth-scroll').on('click', function(event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top - 70
            }, 1000, 'easeInOutExpo');
            event.preventDefault();
        });
    }
    
    // Custom cursor effect
    function initCustomCursor() {
        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        document.addEventListener('mousedown', () => {
            cursor.classList.add('active');
        });
        
        document.addEventListener('mouseup', () => {
            cursor.classList.remove('active');
        });
        
        // Add active class on hover over links and buttons
        const interactiveElements = document.querySelectorAll('a, button, .work-box, .feature-box-03');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        });
    }
    
    // Add scroll indicator to home section
    function addScrollIndicator() {
        // Function disabled to remove scroll indicator
        /*
        const homeSection = document.querySelector('.home-section');
        if (homeSection) {
            const scrollIndicator = document.createElement('div');
            scrollIndicator.classList.add('scroll-indicator');
            homeSection.appendChild(scrollIndicator);
        }
        */
    }
    
    // Add animated underline to links
    function addAnimatedUnderline() {
        const links = document.querySelectorAll('a:not(.btn):not(.nav-link):not(.social-icons a)');
        links.forEach(link => {
            link.classList.add('animated-underline');
        });
    }
    
    // Add 3D card effect to project cards
    function add3DCardEffect() {
        const projectCards = document.querySelectorAll('.work-box');
        projectCards.forEach(card => {
            card.classList.add('card-3d');
            const inner = document.createElement('div');
            inner.classList.add('card-3d-inner');
            // Move the card's children into the inner div
            while (card.firstChild) {
                inner.appendChild(card.firstChild);
            }
            card.appendChild(inner);
        });
    }
    
    // Add certificate highlight effect
    function addCertificateHighlight() {
        const certificates = document.querySelectorAll('.work-box .work-img img');
        certificates.forEach(cert => {
            cert.parentElement.classList.add('certificate-highlight');
        });
    }
    
    // Add animated background to sections
    function addAnimatedBackground() {
        const sections = document.querySelectorAll('.section');
        sections.forEach(section => {
            section.classList.add('animated-bg');
        });
    }
    
    // Initialize all animations
    function initAnimations() {
        initTypingAnimation();
        initSkillsAnimation();
        initAOS();
        initParallax();
        initTilt();
        initParticles();
    }
    
    // Document ready function
    $(document).ready(function() {
        // Initialize all animations
        initAnimations();
        initSmoothScroll();
        initCustomCursor();
        addScrollIndicator();
        addAnimatedUnderline();
        add3DCardEffect();
        addCertificateHighlight();
        addAnimatedBackground();
        
        // Ensure typing animation is visible
        setTimeout(() => {
            const typingElement = document.getElementById('typing-text');
            if (typingElement) {
                typingElement.style.visibility = 'visible';
                typingElement.style.opacity = '1';
            }
        }, 1000);
    });
    
})(jQuery); 