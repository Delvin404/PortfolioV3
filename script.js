// ============================================================
//  SCRIPT.JS — Portfolio Core Interactions
// ============================================================

// ── Header sticky — uses CSS variable for height, no padding conflict
(function () {
    const header = document.querySelector('header');
    if (!header) return;
    const THRESHOLD = 60;

    function handleScroll() {
        header.classList.toggle('sticky', window.scrollY > THRESHOLD);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // apply on load if already scrolled
})();


// ── Active nav link on scroll
(function () {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navlist a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.toggle('active-link', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(s => observer.observe(s));
})();


// ── Mobile menu
(function () {
    const menuIcon = document.querySelector('#menu-icon');
    const navlist  = document.querySelector('.navlist');
    if (!menuIcon || !navlist) return;

    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        navlist.classList.toggle('active');
    };
    window.addEventListener('scroll', () => {
        menuIcon.classList.remove('bx-x');
        navlist.classList.remove('active');
    }, { passive: true });
    navlist.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuIcon.classList.remove('bx-x');
            navlist.classList.remove('active');
        });
    });
})();


// ── Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id === '#') return;
        const el = document.querySelector(id);
        if (el) {
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});


// ── Swiper
const swiper = new Swiper('.testi-swiper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 28,
    slidesPerView: 1,
    speed: 600,
    centeredSlides: false,
    pagination: { el: '.swiper-pagination', clickable: true, dynamicBullets: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    autoplay: { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true },
    breakpoints: {
        640:  { slidesPerView: 1, spaceBetween: 20 },
        900:  { slidesPerView: 2, spaceBetween: 24 },
        1280: { slidesPerView: 3, spaceBetween: 28 },
    },
});


// ── Screen reveal intro
window.addEventListener('load', () => {
    setTimeout(() => {
        const sr = document.querySelector('.screen-reveal');
        if (sr) {
            sr.classList.add('revealed');
            document.body.classList.add('revealed');
            setTimeout(() => sr.style.display = 'none', 1400);
        }
    }, 200);
});


// ── Achievements modal open/close
const achievementsModal = document.getElementById('achievementsModal');
const achievementsBtn   = document.getElementById('achievementsBtn');

function openModal() {
    if (!achievementsModal) return;
    achievementsModal.classList.remove('hidden');
    void achievementsModal.offsetWidth;
    achievementsModal.classList.add('animate');
}
function closeModal() {
    if (!achievementsModal) return;
    achievementsModal.classList.remove('animate');
    setTimeout(() => achievementsModal.classList.add('hidden'), 320);
}

if (achievementsBtn) {
    achievementsBtn.addEventListener('click', e => { e.preventDefault(); openModal(); });
}
window.addEventListener('click', e => {
    if (e.target === achievementsModal) closeModal();
});
window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && achievementsModal && achievementsModal.classList.contains('animate')) {
        closeModal();
    }
});
window._openAchievementsModal  = openModal;
window._closeAchievementsModal = closeModal;


// ── Project video modal
document.addEventListener('DOMContentLoaded', () => {
    const videoModal   = document.getElementById('videoModal');
    const projectVideo = document.getElementById('projectVideo');
    const closeMod     = videoModal ? videoModal.querySelector('.close-modal') : null;

    document.querySelectorAll('.project-thumb').forEach(img => {
        img.addEventListener('click', () => {
            const src = img.getAttribute('data-video');
            if (src && videoModal) {
                projectVideo.src = src;
                videoModal.classList.remove('hidden');
                projectVideo.play().catch(() => {});
                if (window.AchievementSystem) window.AchievementSystem.unlock('project_video');
            }
        });
    });

    if (closeMod) {
        closeMod.addEventListener('click', () => {
            projectVideo.pause();
            projectVideo.src = '';
            videoModal.classList.add('hidden');
        });
    }
    if (videoModal) {
        videoModal.addEventListener('click', e => {
            if (e.target === videoModal) {
                projectVideo.pause();
                projectVideo.src = '';
                videoModal.classList.add('hidden');
            }
        });
    }
});


// ── Kuru Kuru modal
const kuruButton = document.getElementById('kuruButton');
const kuruModal  = document.getElementById('kuruModal');
if (kuruButton && kuruModal) {
    kuruButton.addEventListener('click', () => {
        kuruModal.classList.remove('hidden');
        const vid = document.getElementById('kurukuruVideo');
        if (vid) vid.play().catch(() => {});
        if (window.AchievementSystem) window.AchievementSystem.unlock('kuru_kuru');
    });
}


// ── Color palette
(function () {
    const root    = document.documentElement;
    const toggle  = document.getElementById('colorToggle');
    const palette = document.getElementById('colorPalette');
    const reset   = document.getElementById('resetColors');
    if (!toggle || !palette) return;

    // Toggle open/close
    toggle.addEventListener('click', e => {
        e.stopPropagation();
        palette.classList.toggle('open');
    });
    document.addEventListener('click', e => {
        if (!palette.contains(e.target) && e.target !== toggle) {
            palette.classList.remove('open');
        }
    });

    function applyColor(c) {
        // Update both old var names and new var names so everything works
        root.style.setProperty('--pk',               c);
        root.style.setProperty('--br',               c);
        root.style.setProperty('--second-bg-color',  c);
        root.style.setProperty('--main-color',       c);
        root.style.setProperty('--footer-color',     c);
        // Update toggle button background
        toggle.style.background = c;
        toggle.style.borderColor = c;
        // Mark active swatch
        palette.querySelectorAll('.pal-swatch').forEach(s => {
            s.classList.toggle('active', s.dataset.color === c);
        });
        palette.classList.remove('open');
    }

    // Swatch clicks
    palette.querySelectorAll('.pal-swatch').forEach(swatch => {
        swatch.addEventListener('click', e => {
            e.stopPropagation();
            const c = swatch.dataset.color;
            if (c) applyColor(c);
        });
    });

    // Reset
    if (reset) {
        reset.addEventListener('click', e => {
            e.stopPropagation();
            applyColor('#ffb7c5');
            root.style.setProperty('--br', '#90542f');
            root.style.setProperty('--main-color', '#90542f');
            root.style.setProperty('--footer-color', '#90542f');
            toggle.style.background = '#ffb7c5';
            toggle.style.borderColor = '#ffb7c5';
        });
    }
})();


// ── Custom Cursor — transform-based, dot snaps, ring lerps
(function () {
    const ring = document.querySelector('.cursor-ring');
    const dot  = document.querySelector('.cursor-dot');
    if (!ring || !dot) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    const LERP = 0.25;

    window.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        dot.style.transform = `translate(calc(${mx}px - 50%), calc(${my}px - 50%))`;
    });

    (function tick() {
        rx += (mx - rx) * LERP;
        ry += (my - ry) * LERP;
        ring.style.transform = `translate(calc(${rx}px - 50%), calc(${ry}px - 50%))`;
        requestAnimationFrame(tick);
    })();

    let lx=0,ly=0;
    const TC=['#ffb7c5','#ff99bb','#ff77aa','#e05588','#90542f'];
    window.addEventListener('mousemove', e => {
        if(Math.hypot(e.clientX-lx,e.clientY-ly)<14) return;
        lx=e.clientX; ly=e.clientY;
        const t=document.createElement('div');
        const sz=4+Math.random()*5;
        t.className='cursor-trail';
        t.style.cssText=`left:${e.clientX}px;top:${e.clientY}px;width:${sz}px;height:${sz}px;background:${TC[Math.floor(Math.random()*TC.length)]};`;
        document.body.appendChild(t);
        setTimeout(()=>t.remove(),460);
    });

    const hover = 'a,button,.btn,.svc-card,.prj-card,.sv2-chip,.testi-card,.stv2-card,.av2-card,.ctv2-soc,.ctv2-submit,.adv-btn,.pal-swatch,.pal-toggle,.scroll-top-btn,.close-modal,.ml-card,.prj-btn,.view-btn,input,textarea';
    document.querySelectorAll(hover).forEach(el=>{
        el.addEventListener('mouseenter',()=>{ring.classList.add('hover');dot.classList.add('hover')});
        el.addEventListener('mouseleave',()=>{ring.classList.remove('hover');dot.classList.remove('hover')});
    });

    document.addEventListener('mousedown',()=>{ring.classList.add('click');dot.classList.add('click')});
    document.addEventListener('mouseup',  ()=>{ring.classList.remove('click');dot.classList.remove('click')});
    document.addEventListener('mouseleave',()=>{dot.style.opacity='0';ring.style.opacity='0'});
    document.addEventListener('mouseenter',()=>{dot.style.opacity='';ring.style.opacity=''});
})()


// ── Pixel dust canvas
(function () {
    const canvas = document.getElementById('pixel-canvas');
    if (!canvas) return;
    const ctx    = canvas.getContext('2d');
    const COLORS = ['#ffb7c5','#90542f','#ffd1dc','#ff99bb','#ffccd6','#ffe4ec'];
    const PS = 4;
    const particles = [];

    function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    class Pixel {
        constructor() { this.reset(true); }
        reset(randomStart) {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = PS * (Math.random() * 1.5 + 0.5);
            this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
            this.vx = (Math.random() - 0.5) * 0.38;
            this.vy = (Math.random() - 0.5) * 0.38;
            this.life    = randomStart ? Math.random() * 280 : 0;
            this.maxLife = Math.random() * 280 + 100;
            this.opacity = 0;
        }
        update() {
            this.life++;
            this.x += this.vx; this.y += this.vy;
            const l = this.life, m = this.maxLife;
            this.opacity = l < 30 ? l / 30 : l > m - 30 ? (m - l) / 30 : 1;
            if (this.life >= m) this.reset(false);
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity * 0.42;
            ctx.fillStyle   = this.color;
            ctx.fillRect(Math.round(this.x / PS) * PS, Math.round(this.y / PS) * PS, this.size, this.size);
            ctx.restore();
        }
    }

    for (let i = 0; i < 60; i++) particles.push(new Pixel());

    (function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    })();
})();


// ── Click burst effect (Unicode symbols only — no emojis)
(function () {
    const CHARS = ['\u2726', '\u2605', '\u25C6', '\u2734', '\u2665', '\u273D', '\u2736', '\u22C6', '\u25B2', '\u2660'];
    document.addEventListener('click', e => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        const b = document.createElement('span');
        b.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
        b.style.cssText = `
            position: fixed;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            font-size: ${13 + Math.random() * 10}px;
            color: var(--main-color);
            pointer-events: none;
            z-index: 999999;
            transform: translate(-50%, -50%);
            animation: burstFade 0.85s ease forwards;
            user-select: none;
        `;
        document.body.appendChild(b);
        setTimeout(() => b.remove(), 860);
    });
})();


// ── IntersectionObserver — reveal elements on scroll
(function () {
    // Achievement boxes
    const achBoxes = document.querySelectorAll('.achievement-box');
    if (achBoxes.length) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('revealed'), i * 90);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        achBoxes.forEach(b => obs.observe(b));
    }

    // Service boxes — staggered entry
    const serviceBoxes = document.querySelectorAll('.box');
    if (serviceBoxes.length) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('revealed'), i * 110);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });
        serviceBoxes.forEach(b => obs.observe(b));
    }

    // Project cards — staggered entry
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    setTimeout(() => entry.target.classList.add('revealed'), i * 70);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08 });
        projectCards.forEach(c => obs.observe(c));
    }

    // Contact form
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        obs.observe(contactForm);
    }
})();


// ── Skill circles stagger float animation
(function () {
    const style = document.createElement('style');
    style.textContent = `@keyframes skillFloat {
        0%, 100% { transform: translateY(0);   }
        50%       { transform: translateY(-6px); }
    }`;
    document.head.appendChild(style);

    document.querySelectorAll('.skill-circle').forEach((c, i) => {
        const delay = ((i * 0.18) % 3).toFixed(2);
        const dur   = (3.2 + (i * 0.15) % 1.8).toFixed(2);
        c.style.animation = `skillFloat ${dur}s ease-in-out ${delay}s infinite`;
    });
})();


// ── Hero parallax on mouse move
(function () {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    hero.addEventListener('mousemove', e => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        hero.style.backgroundPosition = `calc(top right + ${x * -14}px) calc(top + ${y * -9}px)`;
    });
    hero.addEventListener('mouseleave', () => { hero.style.backgroundPosition = 'top right'; });
})();


// ── Contact form easter egg
(function () {
    const form      = document.querySelector('.contact-form form');
    if (!form) return;
    const nameInput    = form.querySelector('input[type="text"]');
    const mustafaAudio = document.getElementById('mustafaAudio');

    if (nameInput) {
        nameInput.addEventListener('input', () => {
            if (nameInput.value.trim().toLowerCase() === 'ghulam mustafa') {
                mustafaAudio && mustafaAudio.play().catch(() => {});
                if (window.AchievementSystem) window.AchievementSystem.unlock('ghulam_mustafa');
            }
        });
    }
})();
