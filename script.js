// ===== Preloader =====
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('loaded');
    }, 1800);
});

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ===== Mobile Menu =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);


// ===== Animated Counter =====
function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 16);
}

// ===== Scroll Animations =====
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.getAttribute('data-delay') || 0;
            setTimeout(() => {
                entry.target.classList.add('animated');

                // Animate counters when they come into view
                const counters = entry.target.querySelectorAll('[data-count]');
                counters.forEach(counter => {
                    if (!counter.classList.contains('counted')) {
                        counter.classList.add('counted');
                        animateCounter(counter);
                    }
                });
            }, parseInt(delay));

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});

// ===== Amenities Tabs =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.getAttribute('data-tab');

        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(`tab-${tab}`).classList.add('active');
    });
});

// ===== Property Tabs (Rooms Section) =====
const propertyTabs = document.querySelectorAll('.property-tab');
const propertyRoomSections = document.querySelectorAll('.property-rooms');

propertyTabs.forEach(tab => {
    // Property links (e.g., Aura 36) navigate away — skip toggle binding
    if (tab.classList.contains('property-link')) return;
    tab.addEventListener('click', () => {
        const property = tab.getAttribute('data-property');
        const targetRooms = document.getElementById(`rooms-${property}`);
        const isActive = tab.classList.contains('active');

        // Close all
        propertyTabs.forEach(t => {
            if (!t.classList.contains('property-link')) t.classList.remove('active');
        });
        propertyRoomSections.forEach(s => s.classList.remove('active'));

        // Toggle clicked
        if (!isActive) {
            tab.classList.add('active');
            if (targetRooms) targetRooms.classList.add('active');
        }
    });
});

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all
        faqItems.forEach(i => i.classList.remove('active'));

        // Open clicked if it was closed
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== Testimonial Slider =====
const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
const testimonialCards = document.querySelectorAll('.testimonial-card');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    testimonialDots.forEach(dot => dot.classList.remove('active'));

    testimonialCards[index].classList.add('active');
    testimonialDots[index].classList.add('active');
    currentTestimonial = index;
}

testimonialDots.forEach((dot, index) => {
    dot.addEventListener('click', () => showTestimonial(index));
});

// Auto-rotate testimonials
setInterval(() => {
    const next = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(next);
}, 5000);

// ===== Back to Top =====
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Property & Room Type Dropdown =====
const propertySelect = document.getElementById('property');
const roomTypeGroup = document.getElementById('room-type-group');
const roomTypeSelect = document.getElementById('room-type');

const propertyRooms = {
    'aura-24': [
        { value: 'single-nonac', label: 'Single Room - Non A/C' },
        { value: 'single-ac', label: 'Single Room - A/C' },
        { value: 'twin-nonac', label: 'Twin Sharing - Non A/C' },
        { value: 'twin-ac', label: 'Twin Sharing - A/C' }
    ],
    'aura-36': [
        { value: 'single-nonac', label: 'Single Room - Non A/C' },
        { value: 'single-ac', label: 'Single Room - A/C' },
        { value: 'twin-nonac', label: 'Twin Sharing - Non A/C' },
        { value: 'twin-ac', label: 'Twin Sharing - A/C' }
    ]
};

propertySelect.addEventListener('change', () => {
    const selected = propertySelect.value;
    roomTypeSelect.innerHTML = '<option value="">Select Room Type</option>';

    if (selected && propertyRooms[selected]) {
        propertyRooms[selected].forEach(room => {
            const option = document.createElement('option');
            option.value = room.value;
            option.textContent = room.label;
            roomTypeSelect.appendChild(option);
        });
        roomTypeGroup.style.display = 'block';
    } else {
        roomTypeGroup.style.display = 'none';
    }
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const phone = formData.get('phone');
    const property = formData.get('property');
    const roomType = formData.get('room-type');
    const message = formData.get('message');

    // Build WhatsApp message
    let waMessage = `Hi! I'm interested in AURA Luxury PG.\n\n`;
    waMessage += `Name: ${name}\n`;
    waMessage += `Phone: ${phone}\n`;
    if (property) waMessage += `Property: ${property === 'aura-24' ? 'Aura 24' : 'Aura Luxury'}\n`;
    if (roomType) waMessage += `Room Type: ${roomType}\n`;
    if (message) waMessage += `Message: ${message}\n`;

    const waUrl = `https://wa.me/917899746567?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, '_blank');

    // Show success feedback
    const btn = contactForm.querySelector('.btn-submit');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<span>Sent! Redirecting to WhatsApp...</span><i class="fas fa-check"></i>';
    btn.style.background = '#25D366';

    setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        contactForm.reset();
    }, 3000);
});

// ===== Smooth Scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Hero Background Slideshow =====
(() => {
    const slides = document.querySelectorAll('.hero-slider .hero-slide');
    if (slides.length < 2) return;
    let current = 0;
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 5000);
})();

// ===== Room Gallery Lightbox =====
(() => {
    const lightbox = document.getElementById('galleryLightbox');
    if (!lightbox) return;
    const mainImg = document.getElementById('galleryMain');
    const titleEl = document.getElementById('galleryTitle');
    const counterEl = document.getElementById('galleryCounter');
    const thumbsEl = document.getElementById('galleryThumbs');
    const closeBtn = document.getElementById('galleryClose');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    const backdrop = lightbox.querySelector('.gallery-backdrop');

    let images = [];
    let index = 0;

    function render() {
        if (!images.length) return;
        mainImg.src = images[index];
        counterEl.textContent = `${index + 1} / ${images.length}`;
        thumbsEl.querySelectorAll('.gallery-thumb').forEach((t, i) => {
            t.classList.toggle('active', i === index);
            if (i === index) t.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
        });
    }

    function buildThumbs() {
        thumbsEl.innerHTML = '';
        images.forEach((src, i) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'gallery-thumb' + (i === 0 ? ' active' : '');
            btn.innerHTML = `<img src="${src}" alt="" loading="lazy">`;
            btn.addEventListener('click', () => { index = i; render(); });
            thumbsEl.appendChild(btn);
        });
    }

    function openGallery(gallery, title) {
        images = gallery;
        index = 0;
        titleEl.textContent = title || 'Room Gallery';
        buildThumbs();
        render();
        lightbox.classList.add('open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('gallery-open');
    }

    function closeGallery() {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('gallery-open');
    }

    function next() { index = (index + 1) % images.length; render(); }
    function prev() { index = (index - 1 + images.length) % images.length; render(); }

    document.querySelectorAll('.aura36-room').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('a, button')) return;
            let gallery;
            try { gallery = JSON.parse(card.dataset.gallery || '[]'); } catch (_) { gallery = []; }
            if (!gallery.length) return;
            openGallery(gallery, card.dataset.title);
        });
    });

    closeBtn.addEventListener('click', closeGallery);
    backdrop.addEventListener('click', closeGallery);
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('open')) return;
        if (e.key === 'Escape') closeGallery();
        else if (e.key === 'ArrowRight') next();
        else if (e.key === 'ArrowLeft') prev();
    });

    let touchStartX = null;
    lightbox.querySelector('.gallery-stage').addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    lightbox.querySelector('.gallery-stage').addEventListener('touchend', (e) => {
        if (touchStartX === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
        touchStartX = null;
    });
})();
