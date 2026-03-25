document.addEventListener('DOMContentLoaded', () => {

    // Set Year
    document.getElementById('year').textContent = new Date().getFullYear();

    // Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Add a slight delay for the outline for a fluid effect
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover effects on cursor
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .service-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // Images paths have been hardcoded below
    const heroBg = document.getElementById('hero-bg');
    if (heroBg) heroBg.style.backgroundImage = `url('./assets/hero_study_1774399188069.png')`;

    const aboutImg = document.getElementById('about-img');
    if (aboutImg) aboutImg.src = `./assets/about_us_1774399201150.png`;

    // Populate Gallery Marquee
    const galleryTrack = document.getElementById('gallery-track');
    const galImages = [
        './assets/gallery_1_1774399215759.png',
        './assets/gallery_2_1774399231603.png',
        './assets/hero_study_1774399188069.png' // reuse hero for gallery
    ];

    // duplicate for marquee infinite loop
    const marqueeContent = [...galImages, ...galImages].map(src => `
        <div class="gallery-item">
            <img src="${src}" alt="Instalações Os Sábios">
        </div>
    `).join('');
    galleryTrack.innerHTML = marqueeContent;
    galleryTrack.classList.add('marquee-anim');

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksList = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Initial load animation
    setTimeout(() => {
        document.querySelector('.reveal-on-load').classList.add('active');
    }, 100);

    // Scroll Reveal using Intersection Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // Trigger counter animation if it's the about section
                if (entry.target.classList.contains('about-text')) {
                    const counters = document.querySelectorAll('.stat-number[data-target]');
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        const duration = 2000;
                        const inc = target / (duration / 16); // 60fps

                        let current = 0;
                        const updateCounter = () => {
                            current += inc;
                            if (current < target) {
                                counter.innerText = Math.ceil(current);
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.innerText = target;
                            }
                        };
                        updateCounter();
                        // Prevent re-running
                        counter.removeAttribute('data-target');
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
    });

    // Parallax Effect on Hero Background and Image
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (scrolled < window.innerHeight) {
            heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
        }
    });

    // Magnetic Buttons
    const magnets = document.querySelectorAll('.magnet-btn');
    magnets.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // Form submission mock
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> A enviar...';

            setTimeout(() => {
                form.reset();
                btn.innerHTML = '<i class="fas fa-check"></i> Mensagem Enviada';
                btn.style.backgroundColor = '#28a745';
                btn.style.boxShadow = 'none';

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }
});
