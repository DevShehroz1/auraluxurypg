// ===== AURA 24 Quickview =====
(() => {
    const baseGallery = [
        'cupboard.png', 'kitchen.png', 'bathroom.png'
    ].map(f => `images/aura-24/${f}`);

    const rooms = {
        single: {
            tag: 'Popular',
            title: 'Single Sharing',
            desc: 'Your own private sanctuary — a fully furnished single occupancy room with attached washroom, ideal for focused study or peaceful downtime.',
            specs: [
                { icon: 'fa-user', label: 'Occupancy', value: '1 Person' },
                { icon: 'fa-bath', label: 'Bathroom', value: 'Attached' },
                { icon: 'fa-snowflake', label: 'Climate', value: 'A/C & Non-A/C' },
                { icon: 'fa-wifi', label: 'Wi-Fi', value: 'High-Speed' }
            ],
            features: [
                'Single bed with premium mattress',
                'Personal wardrobe & study desk',
                'Smart TV',
                'In-room refrigerator',
                'RFID door lock',
                'Attached private washroom',
                'Daily housekeeping'
            ],
            images: ['images/aura-24/single.png', ...baseGallery]
        },
        standard: {
            tag: 'Value',
            title: 'Standard Two Sharing',
            desc: 'A comfortable shared room designed for two, with individual beds, wardrobes and study space — all the essentials, thoughtfully arranged.',
            specs: [
                { icon: 'fa-user-friends', label: 'Occupancy', value: '2 Persons' },
                { icon: 'fa-bath', label: 'Bathroom', value: 'Attached' },
                { icon: 'fa-snowflake', label: 'Climate', value: 'A/C & Non-A/C' },
                { icon: 'fa-wifi', label: 'Wi-Fi', value: 'High-Speed' }
            ],
            features: [
                'Two individual beds',
                'Individual wardrobes',
                'Shared study desk',
                'Smart TV',
                'In-room refrigerator',
                'RFID door lock',
                'Attached private washroom',
                'Daily housekeeping'
            ],
            images: ['images/aura-24/standard.png', ...baseGallery]
        },
        premium: {
            tag: 'Premium',
            title: 'Premium Two Sharing',
            desc: 'An elevated shared experience with premium finishes, more space, and upgraded furnishings — luxury that feels like home.',
            specs: [
                { icon: 'fa-user-friends', label: 'Occupancy', value: '2 Persons' },
                { icon: 'fa-bath', label: 'Bathroom', value: 'Attached' },
                { icon: 'fa-snowflake', label: 'Climate', value: 'A/C' },
                { icon: 'fa-star', label: 'Tier', value: 'Premium' }
            ],
            features: [
                'Two premium beds with luxury bedding',
                'Upgraded individual wardrobes',
                'Dedicated study workspace',
                'Smart TV',
                'In-room refrigerator',
                'RFID door lock',
                'Premium attached washroom',
                'Daily housekeeping',
                'Priority maintenance support'
            ],
            images: ['images/aura-24/premium.png', ...baseGallery]
        }
    };

    const qv = document.getElementById('quickview');
    const qvMain = document.getElementById('qvMain');
    const qvThumbs = document.getElementById('qvThumbs');
    const qvCounter = document.getElementById('qvCounter');
    const qvTag = document.getElementById('qvTag');
    const qvTitle = document.getElementById('qvTitle');
    const qvDesc = document.getElementById('qvDesc');
    const qvSpecs = document.getElementById('qvSpecs');
    const qvFeatures = document.getElementById('qvFeatures');
    const qvPrev = document.getElementById('qvPrev');
    const qvNext = document.getElementById('qvNext');
    const qvClose = document.getElementById('qvClose');
    const qvBackdrop = qv.querySelector('.quickview-backdrop');

    let currentRoom = null;
    let index = 0;

    function renderImage() {
        if (!currentRoom) return;
        qvMain.src = currentRoom.images[index];
        qvCounter.textContent = `${index + 1} / ${currentRoom.images.length}`;
        qvThumbs.querySelectorAll('.qv-thumb').forEach((t, i) => {
            t.classList.toggle('active', i === index);
            if (i === index) t.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
        });
    }

    function openRoom(key) {
        const room = rooms[key];
        if (!room) return;
        currentRoom = room;
        index = 0;

        qvTag.textContent = room.tag;
        qvTitle.textContent = room.title;
        qvDesc.textContent = room.desc;

        qvSpecs.innerHTML = room.specs.map(s => `
            <div class="qv-spec">
                <i class="fas ${s.icon}"></i>
                <div>
                    <span class="qv-spec-label">${s.label}</span>
                    <strong>${s.value}</strong>
                </div>
            </div>
        `).join('');

        qvFeatures.innerHTML = room.features.map(f => `
            <li><i class="fas fa-check"></i> ${f}</li>
        `).join('');

        qvThumbs.innerHTML = room.images.map((src, i) => `
            <button type="button" class="qv-thumb${i === 0 ? ' active' : ''}" data-i="${i}">
                <img src="${src}" alt="" loading="lazy">
            </button>
        `).join('');

        qvThumbs.querySelectorAll('.qv-thumb').forEach(btn => {
            btn.addEventListener('click', () => {
                index = parseInt(btn.dataset.i, 10);
                renderImage();
            });
        });

        renderImage();
        qv.classList.add('open');
        qv.setAttribute('aria-hidden', 'false');
        document.body.classList.add('quickview-open');
    }

    function close() {
        qv.classList.remove('open');
        qv.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('quickview-open');
    }

    function next() {
        if (!currentRoom) return;
        index = (index + 1) % currentRoom.images.length;
        renderImage();
    }
    function prev() {
        if (!currentRoom) return;
        index = (index - 1 + currentRoom.images.length) % currentRoom.images.length;
        renderImage();
    }

    document.querySelectorAll('[data-room]').forEach(el => {
        el.addEventListener('click', (e) => {
            const btn = e.target.closest('button, a');
            if (btn && !btn.classList.contains('btn-quickview') && el.tagName !== 'BUTTON') return;
            const key = el.dataset.room;
            if (key) openRoom(key);
        });
    });

    qvClose.addEventListener('click', close);
    qvBackdrop.addEventListener('click', close);
    qvNext.addEventListener('click', next);
    qvPrev.addEventListener('click', prev);

    document.addEventListener('keydown', (e) => {
        if (!qv.classList.contains('open')) return;
        if (e.key === 'Escape') close();
        else if (e.key === 'ArrowRight') next();
        else if (e.key === 'ArrowLeft') prev();
    });

    let touchStartX = null;
    const stage = qv.querySelector('.qv-stage');
    stage.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', (e) => {
        if (touchStartX === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
        touchStartX = null;
    });

    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });
    }
})();
