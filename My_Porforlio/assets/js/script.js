document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const tagSwitch = document.querySelector('.tag-switch');
    const themeIcon = tagSwitch.querySelector('i');

    if (tagSwitch) {
        tagSwitch.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            if (document.body.classList.contains('light-theme')) {
                themeIcon.classList.replace('bi-brightness-high', 'bi-moon-fill');
            } else {
                themeIcon.classList.replace('bi-moon-fill', 'bi-brightness-high');
            }
        });
    }

    // Typing Animation Logic
    const typingElement = document.getElementById('typing-text');
    const scrollContainer = document.getElementById('scroll-down-container');
    
    if (typingElement) {
        const finalHTML = typingElement.innerHTML.trim();
        typingElement.innerHTML = ''; 
        
        let charIndex = 0;
        const typingSpeed = 20;

        function typeWriter() {
            if (charIndex < finalHTML.length) {
                if (finalHTML.charAt(charIndex) === '<') {
                    const tagEnd = finalHTML.indexOf('>', charIndex);
                    charIndex = tagEnd + 1;
                }
                
                typingElement.innerHTML = finalHTML.substring(0, charIndex);
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            } else {
                typingElement.classList.remove('typing-animation');
                if (scrollContainer) {
                    scrollContainer.classList.remove('scroll-hidden');
                    scrollContainer.classList.add('scroll-visible');
                }
            }
        }

        window.addEventListener('load', () => {
            setTimeout(typeWriter, 1500);
        });
    }

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active Tab/Menu Highlight Logic
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.menu li a');

    function highlightMenu() {
        let scrollY = window.pageYOffset;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightMenu);

    // Scroll Reveal Animation Logic
    const observerOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // If it's a skill card, trigger progress bar animation
                const progressBar = entry.target.querySelector('.liquid-fill');
                if (progressBar) {
                    const targetWidth = progressBar.getAttribute('data-progress');
                    // Reset to 0 first to ensure animation plays
                    progressBar.style.width = '0%';
                    // Small delay to allow browser to register the 0% before animating to target
                    setTimeout(() => {
                        progressBar.style.width = targetWidth + '%';
                    }, 100);
                }
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        revealObserver.observe(el);
    });
});
