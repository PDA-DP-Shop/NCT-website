document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }

    // --- Transparent to Glass Navbar ---
    const header = document.querySelector('header');
    const heroSection = document.querySelector('.hero');

    const navObserverOptions = {
        rootMargin: "-200px 0px 0px 0px"
    };

    const navObserver = new IntersectionObserver((entries, navObserver) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }, navObserverOptions);

    if (heroSection) {
        navObserver.observe(heroSection);
    } else {
        // Fallback for pages without hero
        header.classList.add('scrolled');
    }


    // --- Joyful Staggered Scroll Reveal ---
    // This finds containers with '.reveal' or specialized grids and animates children sequentially.

    // 1. Prepare elements for staggering
    const statsGrid = document.querySelector('.stats-grid');
    if (statsGrid) {
        statsGrid.classList.add('reveal-stagger');
        Array.from(statsGrid.children).forEach((child, index) => {
            child.classList.add('child-stagger');
            child.style.animationDelay = `${index * 0.1}s`; // 100ms staggering
        });
    }

    const featureGrid = document.querySelector('.features-grid');
    if (featureGrid) {
        featureGrid.classList.add('reveal-stagger');
        Array.from(featureGrid.children).forEach((child, index) => {
            child.classList.add('child-stagger');
            child.style.animationDelay = `${index * 0.15}s`;
        });
    }

    const whyList = document.querySelector('.why-list');
    if (whyList) {
        whyList.classList.add('reveal-stagger');
        Array.from(whyList.children).forEach((child, index) => {
            child.classList.add('child-stagger');
            child.style.animationDelay = `${index * 0.2}s`;
        });
    }

    const glassGrid = document.querySelector('.glass-grid');
    if (glassGrid) {
        glassGrid.classList.add('reveal-stagger');
        Array.from(glassGrid.children).forEach((child, index) => {
            child.classList.add('child-stagger');
            child.style.animationDelay = `${index * 0.15}s`;
        });

    }

    const proGrid = document.querySelector('.pro-grid');
    if (proGrid) {
        proGrid.classList.add('reveal-stagger');
        Array.from(proGrid.children).forEach((child, index) => {
            child.classList.add('child-stagger');
            child.style.animationDelay = `${index * 0.15}s`;
        });
    }


    const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // --- Hero Canvas Particle Animation ---
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.directionX = (Math.random() * 0.4) - 0.2;
                this.directionY = (Math.random() * 0.4) - 0.2;
                this.size = (Math.random() * 2) + 1;
                this.color = '#ffffff';
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = this.color;
                ctx.globalAlpha = 0.5;
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.width * canvas.height) / 15000;
            for (let i = 0; i < numberOfParticles; i++) {
                particlesArray.push(new Particle());
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }

        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                        ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = 'rgba(255, 255, 255,' + opacityValue * 0.15 + ')';
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        });

        init();
        animate();
    }

    // --- Counting Animation ---
    const counters = document.querySelectorAll('.counter');
    const speed = 50; // The lower the faster

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/\D/g, ''); // Extract number from text (e.g., "0+" -> 0)

                // Determine increment
                const inc = target / speed;

                if (count < target) {
                    // Check if it's a percentage or plus
                    const suffix = counter.innerText.includes('%') ? '%' : '+';
                    counter.innerText = Math.ceil(count + inc) + suffix;
                    setTimeout(updateCount, 20);
                } else {
                    const suffix = counter.getAttribute('data-target') === "100" ? '%' : '+';
                    counter.innerText = target + suffix;
                }
            };
            updateCount();
        });
    };

    // Trigger counters when stats section is visible
    let countStarted = false;
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !countStarted) {
                startCounters();
                countStarted = true;
            }
        }, { threshold: 0.5 });
        statsObserver.observe(statsSection);
    }


    // --- Testimonial Slider ---
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length > 0) {
        let currentSlide = 0;
        const autoSlide = setInterval(() => { changeSlide((currentSlide + 1) % slides.length); }, 5000);

        window.currentSlide = function (n) {
            changeSlide(n);
            clearInterval(autoSlide);
        }

        function changeSlide(n) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = n;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
    }
});
