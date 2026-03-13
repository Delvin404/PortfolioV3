// ============================================================
//  ACHIEVEMENT SYSTEM — Intentional discoveries only
//  Philosophy: NOTHING triggers from normal portfolio use.
//  Every unlock requires deliberate, non-obvious action.
// ============================================================
(function AchievementSystem() {
    'use strict';

    // ── Registry ────────────────────────────────────────────
    const ACHIEVEMENTS = [

        // ── KONAMI CODE — keyboard muscle memory required
        {
            id: 'konami',
            title: 'Power Surge',
            desc: 'Enter the Konami Code.',
            icon: 'https://img.icons8.com/color/96/controller.png',
            rarity: 'legendary',
            category: 'Secret',
            hidden: true,
        },

        // ── LOGO: 20 deliberate clicks
        {
            id: 'logo_masher',
            title: 'Logo Obsessed',
            desc: 'Click the logo 20 times.',
            icon: 'https://img.icons8.com/color/96/cat.png',
            rarity: 'uncommon',
            category: 'Discovery',
            hidden: false,
        },

        // ── LOGO: cycle every single variant (hidden — 8+ clicks past 20)
        {
            id: 'destroy_portfolio',
            title: 'Destroyer',
            desc: 'Cycle through every single logo variant.',
            icon: 'https://img.icons8.com/color/96/explosion.png',
            rarity: 'epic',
            category: 'Secret',
            hidden: true,
        },

        // ── GRASS — hidden element in footer, requires exploration
        {
            id: 'touch_grass',
            title: 'Touch Grass',
            desc: 'Find and click the hidden element in the footer.',
            icon: 'https://img.icons8.com/color/96/grass.png',
            rarity: 'uncommon',
            category: 'Discovery',
            hidden: false,
        },

        // ── KURU KURU — must find the tiny footer link
        {
            id: 'kuru_kuru',
            title: 'Kuru Kuru',
            desc: 'Discover the hidden video in the footer.',
            icon: 'https://img.icons8.com/color/96/dizzy.png',
            rarity: 'rare',
            category: 'Secret',
            hidden: true,
        },

        // ── GHULAM MUSTAFA — type exact name in contact form
        {
            id: 'ghulam_mustafa',
            title: 'Ewwww Mustafa',
            desc: 'Type a very specific name in the contact form.',
            icon: 'https://img.icons8.com/color/96/face-with-rolling-eyes.png',
            rarity: 'rare',
            category: 'Secret',
            hidden: true,
        },

        // ── ALL 6 COLORS — requires intentional exploration of the palette
        {
            id: 'rainbow_collector',
            title: 'Rainbow Collector',
            desc: 'Try every theme color in the palette switcher.',
            icon: 'https://img.icons8.com/color/96/rainbow.png',
            rarity: 'rare',
            category: 'Discovery',
            hidden: false,
        },

        // ── TRIPLE CLICK — rapid 3-click anywhere (accidental but non-trivial)
        {
            id: 'triple_click',
            title: 'Triple Tap',
            desc: 'Click three times in extremely rapid succession.',
            icon: 'https://img.icons8.com/color/96/touchscreen.png',
            rarity: 'common',
            category: 'Discovery',
            hidden: false,
        },

        // ── WATCH ALL 10 PROJECT VIDEOS — requires opening every single project
        {
            id: 'all_projects',
            title: 'Binge Watcher',
            desc: 'Open the demo video for every single project.',
            icon: 'https://img.icons8.com/color/96/film-reel.png',
            rarity: 'epic',
            category: 'Discovery',
            hidden: false,
        },

        // ── TESTIMONIAL MARATHON — manually click arrows 10 times
        {
            id: 'testimonial_marathon',
            title: 'Full Jury',
            desc: 'Manually navigate through all 10 testimonials using the arrows.',
            icon: 'https://img.icons8.com/color/96/positive-review.png',
            rarity: 'uncommon',
            category: 'Discovery',
            hidden: false,
        },

        // ── SPEEDRUNNER — all nav links within 5 seconds requires deliberate speed
        {
            id: 'speedrunner',
            title: 'Speedrunner',
            desc: 'Click every navigation link within 5 seconds.',
            icon: 'https://img.icons8.com/color/96/speed.png',
            rarity: 'legendary',
            category: 'Skill',
            hidden: false,
        },

        // ── SKILL MASTER — hover all 26 skill circles (requires full scroll + hover each)
        {
            id: 'skill_master',
            title: 'Skill Master',
            desc: 'Hover over every single skill icon on the page.',
            icon: 'https://img.icons8.com/color/96/idea.png',
            rarity: 'epic',
            category: 'Skill',
            hidden: false,
        },

        // ── ALL SERVICE CARDS: click Learn More on all 6
        {
            id: 'service_crawler',
            title: 'Service Crawler',
            desc: 'Click "Learn More" on every single service card.',
            icon: 'https://img.icons8.com/color/96/services.png',
            rarity: 'rare',
            category: 'Discovery',
            hidden: false,
        },

        // ── AFK 5+ minutes — must leave without any interaction
        {
            id: 'afk_legend',
            title: 'AFK Legend',
            desc: 'Leave the portfolio completely idle for over 5 minutes.',
            icon: 'https://img.icons8.com/color/96/sleeping.png',
            rarity: 'rare',
            category: 'Secret',
            hidden: false,
        },

        // ── NIGHT OWL — midnight to 5am (hidden)
        {
            id: 'night_owl',
            title: 'Night Owl',
            desc: 'Visit this portfolio between midnight and 5 AM.',
            icon: 'https://img.icons8.com/color/96/moon-symbol.png',
            rarity: 'rare',
            category: 'Secret',
            hidden: true,
        },

        // ── POCKET PORTFOLIO — resize under 380px (hidden)
        {
            id: 'pocket_portfolio',
            title: 'Pocket Portfolio',
            desc: 'Resize the browser window to under 380px wide.',
            icon: 'https://img.icons8.com/color/96/smartphone.png',
            rarity: 'uncommon',
            category: 'Secret',
            hidden: true,
        },

        // ── STILL HERE — 20 min total (hidden)
        {
            id: 'still_here',
            title: 'You Are Still Here?',
            desc: 'Spend 20 minutes browsing this portfolio.',
            icon: 'https://img.icons8.com/color/96/question-mark.png',
            rarity: 'legendary',
            category: 'Secret',
            hidden: true,
        },

        // ── SPEED CLOSER — open advancements and close in < 1.5s (hidden)
        {
            id: 'speed_closer',
            title: 'In & Out',
            desc: 'Open and instantly close the Advancements panel.',
            icon: 'https://img.icons8.com/color/96/exit.png',
            rarity: 'uncommon',
            category: 'Secret',
            hidden: true,
        },

        // ── RIGHT CLICK — right-click anywhere (hidden)
        {
            id: 'right_clicker',
            title: 'Inspector',
            desc: 'Right-click somewhere on the page.',
            icon: 'https://img.icons8.com/color/96/detective.png',
            rarity: 'common',
            category: 'Secret',
            hidden: true,
        },

        // ── DOUBLE CLICK LOGO (hidden — different from spam clicking it 20x)
        {
            id: 'logo_dbl',
            title: 'Double Trouble',
            desc: 'Double-click the logo.',
            icon: 'https://img.icons8.com/color/96/cursor.png',
            rarity: 'common',
            category: 'Secret',
            hidden: true,
        },

        // ── SCROLL TO VERY TOP with scroll-top button + re-scroll down (hidden)
        {
            id: 'top_of_world',
            title: 'Back to Top',
            desc: 'Use the scroll-to-top button.',
            icon: 'https://img.icons8.com/color/96/up-arrow.png',
            rarity: 'common',
            category: 'Secret',
            hidden: true,
        },

        // ── GIF WATCHER — hover all 3 showcase GIFs
        {
            id: 'gif_watcher',
            title: 'Gif Addict',
            desc: 'Hover over all three showcase GIFs.',
            icon: 'https://img.icons8.com/color/96/movie.png',
            rarity: 'uncommon',
            category: 'Discovery',
            hidden: false,
        },

        // ── FINAL BOSS
        {
            id: 'completionist',
            title: '100% Completionist',
            desc: 'Unlock every other achievement. You have incredible patience.',
            icon: 'https://img.icons8.com/color/96/prize.png',
            rarity: 'legendary',
            category: 'Legendary',
            hidden: false,
        },
    ];

    // ── State
    const state = {
        unlocked: new Set(JSON.parse(localStorage.getItem('ach_unlocked') || '[]')),
        total: ACHIEVEMENTS.length,
    };
    function save() {
        localStorage.setItem('ach_unlocked', JSON.stringify([...state.unlocked]));
    }

    // ── Core unlock
    function unlock(id) {
        if (state.unlocked.has(id)) return;
        const ach = ACHIEVEMENTS.find(a => a.id === id);
        if (!ach) return;
        state.unlocked.add(id);
        save();
        showToast(ach);
        updateModalCards();
        checkCompletionist();
    }

    function checkCompletionist() {
        const others = ACHIEVEMENTS.filter(a => a.id !== 'completionist');
        if (others.every(a => state.unlocked.has(a.id))) {
            setTimeout(() => unlock('completionist'), 1200);
        }
    }

    // ── Toast queue
    let toastQueue  = [];
    let toastActive = false;

    function showToast(ach) {
        toastQueue.push(ach);
        if (!toastActive) processToastQueue();
    }

    function processToastQueue() {
        if (!toastQueue.length) { toastActive = false; return; }
        toastActive = true;
        const ach = toastQueue.shift();

        const sound = document.getElementById('achievementSound');
        if (sound) { sound.currentTime = 0; sound.play().catch(() => {}); }

        const notif = document.getElementById('achievementNotification');
        if (!notif) { processToastQueue(); return; }

        notif.setAttribute('data-rarity', ach.rarity);
        notif.querySelector('#achievementIcon').src = ach.icon;
        notif.querySelector('#achievementTitle').textContent = ach.title;
        notif.querySelector('#achievementDesc').textContent  = ach.desc;
        notif.classList.remove('hidden', 'hide');
        void notif.offsetWidth;
        notif.classList.add('show');

        setTimeout(() => {
            notif.classList.remove('show');
            notif.classList.add('hide');
            setTimeout(() => {
                notif.classList.add('hidden');
                notif.classList.remove('hide');
                processToastQueue();
            }, 480);
        }, 4200);
    }

    // ── Modal builder
    function buildModal() {
        const modal = document.getElementById('achievementsModal');
        if (!modal) return;

        const pct        = Math.round((state.unlocked.size / ACHIEVEMENTS.length) * 100);
        const categories = ['All', ...new Set(ACHIEVEMENTS.map(a => a.category))];

        modal.innerHTML = `
        <div class="ach-modal-inner">
            <div class="ach-modal-header">
                <div class="ach-modal-title-row">
                    <span class="ach-trophy-icon">&#127942;</span>
                    <span class="ach-modal-title">Advancements</span>
                </div>
                <button class="ach-close-btn" id="achCloseBtn" aria-label="Close">&times;</button>
            </div>

            <div class="ach-progress-wrap">
                <div class="ach-progress-label">
                    <span>${state.unlocked.size} / ${ACHIEVEMENTS.length} unlocked</span>
                    <span>${pct}%</span>
                </div>
                <div class="ach-progress-bar">
                    <div class="ach-progress-fill" id="achProgressFill"></div>
                </div>
            </div>

            <div class="ach-filter-tabs" id="achFilterTabs">
                ${categories.map((cat, i) => `
                    <button class="ach-filter-btn${i === 0 ? ' active' : ''}" data-filter="${cat}">${cat}</button>
                `).join('')}
            </div>

            <div class="ach-cards-grid" id="achCardsGrid"></div>

            <div class="ach-rarity-legend">
                <div class="ach-rarity-item"><div class="ach-rarity-dot" style="background:#ccc"></div> Common</div>
                <div class="ach-rarity-item"><div class="ach-rarity-dot" style="background:#4caf50"></div> Uncommon</div>
                <div class="ach-rarity-item"><div class="ach-rarity-dot" style="background:#2196f3"></div> Rare</div>
                <div class="ach-rarity-item"><div class="ach-rarity-dot" style="background:#9c27b0"></div> Epic</div>
                <div class="ach-rarity-item"><div class="ach-rarity-dot" style="background:#ff9800"></div> Legendary</div>
            </div>
        </div>`;

        document.getElementById('achCloseBtn').addEventListener('click', () => {
            if (window._closeAchievementsModal) window._closeAchievementsModal();
        });

        document.getElementById('achFilterTabs').addEventListener('click', e => {
            const btn = e.target.closest('.ach-filter-btn');
            if (!btn) return;
            document.querySelectorAll('.ach-filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderCards(btn.dataset.filter);
        });

        renderCards('All');
        setTimeout(() => {
            const fill = document.getElementById('achProgressFill');
            if (fill) fill.style.width = pct + '%';
        }, 100);
    }

    function renderCards(filter) {
        const grid = document.getElementById('achCardsGrid');
        if (!grid) return;
        const list = filter === 'All' ? ACHIEVEMENTS : ACHIEVEMENTS.filter(a => a.category === filter);

        grid.innerHTML = list.map((ach, idx) => {
            const done   = state.unlocked.has(ach.id);
            const secret = ach.hidden && !done;
            return `
            <div class="ach-card${done ? '' : ' locked'}" data-rarity="${ach.rarity}" style="animation-delay:${idx * 0.04}s">
                <div class="ach-card-icon">
                    ${secret
                        ? '<span class="lock-icon">&#128274;</span>'
                        : `<img src="${ach.icon}" alt="${ach.title}" loading="lazy">`
                    }
                </div>
                <div class="ach-card-title">${secret ? '???' : ach.title}</div>
                <div class="ach-card-desc">${secret ? 'Keep exploring\u2026' : ach.desc}</div>
            </div>`;
        }).join('');
    }

    function updateModalCards() {
        const modal = document.getElementById('achievementsModal');
        if (!modal || !modal.querySelector('.ach-modal-inner')) return;

        const pct = Math.round((state.unlocked.size / ACHIEVEMENTS.length) * 100);
        const fill  = document.getElementById('achProgressFill');
        const label = document.querySelector('.ach-progress-label');
        if (fill)  fill.style.width = pct + '%';
        if (label) label.innerHTML = `<span>${state.unlocked.size} / ${ACHIEVEMENTS.length} unlocked</span><span>${pct}%</span>`;

        const activeFilter = document.querySelector('.ach-filter-btn.active');
        renderCards(activeFilter ? activeFilter.dataset.filter : 'All');
    }

    // ── Konami overlay
    function triggerKonami() {
        const overlay = document.createElement('div');
        overlay.className = 'konami-overlay';
        overlay.innerHTML = `
            <div class="konami-text">KONAMI CODE!</div>
            <div class="konami-sub">+30 lives activated</div>
        `;
        document.body.appendChild(overlay);
        overlay.addEventListener('click', () => overlay.remove());
        setTimeout(() => overlay.remove(), 5000);
    }


    // ────────────────────────────────────────────────────────
    //  TRACKERS
    // ────────────────────────────────────────────────────────

    // ── Konami code
    ;(function () {
        const SEQ = [38,38,40,40,37,39,37,39,66,65];
        let pos = 0;
        document.addEventListener('keydown', e => {
            if (e.keyCode === SEQ[pos]) {
                pos++;
                if (pos === SEQ.length) {
                    pos = 0;
                    triggerKonami();
                    unlock('konami');
                }
            } else {
                pos = e.keyCode === SEQ[0] ? 1 : 0;
            }
        });
    })();

    // ── Logo click counter
    ;(function () {
        let logoClicks  = 0;
        let logoVariant = 1;
        const LOGO_COUNT = 8;
        const navLogo = document.getElementById('nav-logo');
        if (!navLogo) return;

        navLogo.addEventListener('click', () => {
            logoClicks++;
            logoVariant = (logoVariant % LOGO_COUNT) + 1;
            navLogo.src = `img/logo/logo_${logoVariant}.png`;
            navLogo.classList.add('animate');
            setTimeout(() => navLogo.classList.remove('animate'), 400);
            if (logoClicks === 20) unlock('logo_masher');
            if (logoClicks >= LOGO_COUNT * 2 && logoVariant === LOGO_COUNT) unlock('destroy_portfolio');
        });

        navLogo.addEventListener('dblclick', () => unlock('logo_dbl'));
    })();

    // ── Grass button — wired in DOMContentLoaded to guarantee element exists
    ;(function () {
        function wireGrass() {
            const btn = document.getElementById('footerGrassButton');
            if (!btn) return;
            // Remove any previous listeners to avoid double-fire
            btn.replaceWith(btn.cloneNode(true));
            const fresh = document.getElementById('footerGrassButton');
            fresh.addEventListener('click', () => unlock('touch_grass'));
            fresh.addEventListener('touchend', (e) => {
                e.preventDefault();
                unlock('touch_grass');
            }, { passive: false });
        }
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', wireGrass);
        } else {
            wireGrass();
        }
    })();

    // ── Rainbow — all 6 colors
    ;(function () {
        const tried = new Set();
        document.querySelectorAll('.pal-swatch').forEach(opt => {
            opt.addEventListener('click', () => {
                const c = opt.getAttribute('data-color');
                if (c) tried.add(c);
                if (tried.size >= 6) unlock('rainbow_collector');
            });
        });
    })();

    // ── Triple click (3 rapid clicks < 500ms)
    ;(function () {
        let clicks = 0, timer;
        document.addEventListener('click', () => {
            clicks++;
            clearTimeout(timer);
            timer = setTimeout(() => { clicks = 0; }, 500);
            if (clicks >= 3) { clicks = 0; unlock('triple_click'); }
        });
    })();

    // ── Right-click
    ;(function () {
        document.addEventListener('contextmenu', () => unlock('right_clicker'));
    })();

    // ── Scroll-top button
    ;(function () {
        const btn = document.querySelector('.scroll-top');
        if (btn) btn.addEventListener('click', () => unlock('top_of_world'));
    })();

    // ── Watch all project videos
    ;(function () {
        const watched = new Set();
        const thumbs  = document.querySelectorAll('.project-thumb');
        if (!thumbs.length) return;
        thumbs.forEach((img, i) => {
            img.addEventListener('click', () => {
                watched.add(i);
                if (watched.size >= thumbs.length) unlock('all_projects');
            });
        });
    })();

    // ── Testimonial marathon — 10 manual navigation clicks
    ;(function () {
        const next = document.querySelector('.swiper-button-next');
        const prev = document.querySelector('.swiper-button-prev');
        let navCount = 0;
        function onNav() {
            navCount++;
            if (navCount >= 10) unlock('testimonial_marathon');
        }
        if (next) next.addEventListener('click', onNav);
        if (prev) prev.addEventListener('click', onNav);
    })();

    // ── Speedrunner — all nav links within 5s
    ;(function () {
        const links   = document.querySelectorAll('.navlist a');
        if (!links.length) return;
        const targets = new Set(Array.from(links).map(l => l.getAttribute('href')));
        let firstClick = 0;
        const clicked  = new Set();
        links.forEach(link => {
            link.addEventListener('click', () => {
                const now = Date.now();
                if (!firstClick) firstClick = now;
                if (now - firstClick > 5000) { firstClick = now; clicked.clear(); }
                clicked.add(link.getAttribute('href'));
                if (clicked.size >= targets.size) unlock('speedrunner');
            });
        });
    })();

    // ── Skill master — hover all skill circles
    ;(function () {
        const circles = document.querySelectorAll('.skill-circle');
        if (!circles.length) return;
        const hovered = new Set();
        circles.forEach((c, i) => {
            c.addEventListener('mouseenter', () => {
                hovered.add(i);
                if (hovered.size >= circles.length) unlock('skill_master');
            });
        });
    })();

    // ── Service crawler — click Learn More on all 6
    ;(function () {
        const links = document.querySelectorAll('.services-content .box a');
        if (!links.length) return;
        const clicked = new Set();
        links.forEach((link, i) => {
            link.addEventListener('click', () => {
                clicked.add(i);
                if (clicked.size >= links.length) unlock('service_crawler');
            });
        });
    })();

    // ── AFK legend — 5 minutes zero interaction
    ;(function () {
        const FIVE = 5 * 60 * 1000;
        let timer;
        function resetTimer() {
            clearTimeout(timer);
            timer = setTimeout(() => unlock('afk_legend'), FIVE);
        }
        ['mousemove','mousedown','keydown','scroll','touchstart'].forEach(ev => {
            window.addEventListener(ev, resetTimer, { passive: true });
        });
        resetTimer();
    })();

    // ── Night owl
    ;(function () {
        const h = new Date().getHours();
        if (h >= 0 && h < 5) setTimeout(() => unlock('night_owl'), 3000);
    })();

    // ── Pocket portfolio — resize < 380px
    ;(function () {
        function checkWidth() {
            if (window.innerWidth < 380) unlock('pocket_portfolio');
        }
        window.addEventListener('resize', checkWidth, { passive: true });
    })();

    // ── Still here — 20 minutes
    ;(function () {
        setTimeout(() => unlock('still_here'), 20 * 60 * 1000);
    })();

    // ── Speed closer — open and close modal in < 1.5s
    ;(function () {
        let openTime = 0;
        const btn = document.getElementById('achievementsBtn');
        if (!btn) return;
        btn.addEventListener('click', () => { openTime = Date.now(); });

        const orig = window._closeAchievementsModal;
        window._closeAchievementsModal = function () {
            if (openTime && Date.now() - openTime < 1500) unlock('speed_closer');
            openTime = 0;
            if (orig) orig();
        };
    })();

    // ── GIF watcher — hover all 3 gifs
    ;(function () {
        const gifs = document.querySelectorAll('.showcase-gif');
        if (!gifs.length) return;
        const hovered = new Set();
        gifs.forEach((g, i) => {
            g.addEventListener('mouseenter', () => {
                hovered.add(i);
                if (hovered.size >= gifs.length) unlock('gif_watcher');
            });
        });
    })();


    // ────────────────────────────────────────────────────────
    //  INIT
    // ────────────────────────────────────────────────────────
    document.addEventListener('DOMContentLoaded', () => {
        buildModal();
        const btn = document.getElementById('achievementsBtn');
        if (btn) {
            btn.addEventListener('click', () => buildModal());
        }
    });

    // Export
    window.AchievementSystem = { unlock, state, ACHIEVEMENTS };

})();
