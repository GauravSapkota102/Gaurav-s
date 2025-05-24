// Client-side JavaScript for the portfolio
console.log("Portfolio script loaded.");

document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Close mobile menu if open
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    });

    // "Going to Space" Hero Animation
    const heroHeading = document.getElementById('hero-heading');
    const heroParagraph = document.getElementById('hero-paragraph');
    const heroCta = document.getElementById('hero-cta');

    // Animate heading and paragraph
    if (heroHeading && heroParagraph) {
        setTimeout(() => {
            heroHeading.classList.remove('opacity-0', '-translate-y-5');
            heroHeading.classList.add('opacity-100', 'translate-y-0', 'transition-all', 'duration-1000', 'ease-out');
            
            heroParagraph.classList.remove('opacity-0', '-translate-y-5');
            heroParagraph.classList.add('opacity-100', 'translate-y-0', 'transition-all', 'duration-1000', 'ease-out', 'delay-300'); // Slight delay for paragraph
        }, 100); // Start animation shortly after DOM load
    }

    // Animate CTA button
    if (heroCta) {
        setTimeout(() => {
            heroCta.classList.remove('opacity-0');
            heroCta.classList.add('opacity-100', 'transition-opacity', 'duration-1000', 'ease-out', 'delay-500'); // Longer delay for CTA
        }, 300); // Start CTA animation a bit later
    }

    // Intersection Observer for fade-in sections (Optional - can be expanded later)
    const sectionsToAnimate = document.querySelectorAll('section');
    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the item is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp'); // Using Tailwind JIT animation
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    };

    const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);
    sectionsToAnimate.forEach(section => {
        section.classList.add('opacity-0'); // Initially hide sections for animation
        sectionObserver.observe(section);
    });
});
