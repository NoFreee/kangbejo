/* ============================================================
   SCRIPT.JS — Data-driven main site renderer
   ============================================================ */

/* ── Load Data ── */
let siteData = loadSiteData();

/* ============================================================
   RENDER FUNCTIONS
   ============================================================ */

function renderNavbar() {
  const d = siteData;
  // Logo
  const logoEmoji = document.getElementById('logoEmoji');
  const logoText = document.getElementById('logoText');
  const logoBold = document.getElementById('logoBold');
  const navCta = document.getElementById('navCta');
  if (logoEmoji) logoEmoji.textContent = d.siteInfo.logoEmoji;
  if (logoText) logoText.textContent = d.siteInfo.logoText;
  if (logoBold) logoBold.textContent = d.siteInfo.logoBold;
  if (navCta) { navCta.textContent = d.siteInfo.ctaText; navCta.href = d.siteInfo.ctaHref; }

  // Footer logo
  const fle = document.getElementById('footerLogoEmoji');
  const flt = document.getElementById('footerLogoText');
  const flb = document.getElementById('footerLogoBold');
  if (fle) fle.textContent = d.siteInfo.logoEmoji;
  if (flt) flt.textContent = d.siteInfo.logoText;
  if (flb) flb.textContent = d.siteInfo.logoBold;

  // Nav links
  const navLinks = document.getElementById('navLinks');
  if (navLinks) {
    navLinks.innerHTML = d.navbar.map(link =>
      `<a href="${link.href}" class="nav-link">${link.text}</a>`
    ).join('');
  }

  // Footer nav
  const footerNav = document.getElementById('footerNav');
  if (footerNav) {
    footerNav.innerHTML = d.navbar.map(l => `<li><a href="${l.href}">${l.text}</a></li>`).join('');
  }

  // WhatsApp float
  const waBtn = document.getElementById('wa-float-btn');
  if (waBtn) waBtn.href = `https://wa.me/${d.siteInfo.waNumber}`;

  // Meta title
  document.title = d.siteInfo.metaTitle || 'Desa Wisata Kangbejo';
  const metaDesc = document.getElementById('metaDesc');
  if (metaDesc) metaDesc.setAttribute('content', d.siteInfo.metaDesc || '');
}

function renderHero() {
  const h = siteData.hero;
  const img = document.getElementById('heroImg');
  if (img && h.bgImage) img.src = h.bgImage;
  setText('heroBadge', h.badge);
  setText('heroTitle', h.title);
  setText('heroHighlight', h.titleHighlight);
  setText('heroSubtitle', h.subtitle);

  // Buttons
  const heroActions = document.getElementById('heroActions');
  if (heroActions) {
    heroActions.innerHTML = `
      <a href="${h.btn1Href}" class="btn-primary" id="hero-explore-btn">
        <span>${h.btn1Text}</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </a>
      <a href="${h.btn2Href}" class="btn-secondary" id="hero-about-btn">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
        <span>${h.btn2Text}</span>
      </a>`;
  }

  // Stats
  const heroStats = document.getElementById('heroStats');
  if (heroStats && h.stats) {
    heroStats.innerHTML = h.stats.map((s, i) => `
      ${i > 0 ? '<div class="stat-divider"></div>' : ''}
      <div class="stat-item">
        <span class="stat-number" data-target="${s.number}">0</span>
        <span class="stat-plus">${s.suffix}</span>
        <span class="stat-label">${s.label}</span>
      </div>`).join('');
  }
}

function renderTentang() {
  const t = siteData.tentang;
  const img = document.getElementById('tentangImg');
  if (img && t.image) img.src = t.image;
  setText('tentangLabel', t.label);
  setText('tentangTitle', t.title);
  setText('tentangTitleAccent', t.titleAccent);
  setText('tentangDesc1', t.desc1);
  setText('tentangDesc2', t.desc2);
  setText('tentangBadgeIcon', t.badgeIcon);
  setText('tentangBadgeTitle', t.badgeTitle);
  setText('tentangBadgeSub', t.badgeSub);
  setText('tentangExpNumber', t.expNumber);
  setText('tentangExpText', t.expText);
  const cta = document.getElementById('tentangCta');
  if (cta) { cta.textContent = t.ctaText; cta.href = t.ctaHref; }

  // Values
  const valuesEl = document.getElementById('tentangValues');
  if (valuesEl && t.values) {
    valuesEl.innerHTML = t.values.map(v => `
      <div class="value-item">
        <div class="value-icon">${v.icon}</div>
        <div>
          <div class="value-title">${v.title}</div>
          <div class="value-desc">${v.desc}</div>
        </div>
      </div>`).join('');
  }
}

function renderWisata() {
  const w = siteData.wisata;
  setText('wisataLabel', w.label);
  setText('wisataTitle', w.title);
  setText('wisataTitleAccent', w.titleAccent);
  setText('wisataDesc', w.desc);

  const grid = document.getElementById('wisataGrid');
  if (grid && w.packages) {
    grid.innerHTML = w.packages.map(pkg => `
      <div class="wisata-card ${pkg.featured ? 'featured' : ''}" id="wisata-${pkg.id}">
        <div class="wisata-card-img">
          <img src="${pkg.image}" alt="${pkg.title}" />
          ${pkg.badge ? `<div class="wisata-card-badge ${pkg.badgeGold ? 'badge-gold' : ''}">${pkg.badge}</div>` : ''}
        </div>
        <div class="wisata-card-content">
          <div class="wisata-card-icon">${pkg.icon}</div>
          <h3 class="wisata-card-title">${pkg.title}</h3>
          <p class="wisata-card-desc">${pkg.desc}</p>
          <div class="wisata-card-info">${(pkg.info || []).map(i => `<span>${i}</span>`).join('')}</div>
          <div class="wisata-card-footer">
            <div class="wisata-price">
              <span class="price-from">Mulai dari</span>
              <span class="price-amount">${pkg.price}</span>
              <span class="price-per">${pkg.pricePer || '/orang'}</span>
            </div>
            <a href="#kontak" class="btn-wisata">Pesan</a>
          </div>
        </div>
      </div>`).join('');
  }

  // Footer packages
  const footerPaket = document.getElementById('footerPaket');
  if (footerPaket && w.packages) {
    footerPaket.innerHTML = w.packages.map(p => `<li><a href="#wisata">${p.title}</a></li>`).join('');
  }
}

function renderGaleri() {
  const g = siteData.galeri;
  setText('galeriLabel', g.label);
  setText('galeriTitle', g.title);
  setText('galeriTitleAccent', g.titleAccent);
  setText('galeriDesc', g.desc);

  const grid = document.getElementById('galeriGrid');
  if (grid && g.items) {
    grid.innerHTML = g.items.map(item => `
      <div class="galeri-item ${item.size === 'large' ? 'galeri-large' : item.size === 'wide' ? 'galeri-wide' : ''}" id="galeri-${item.id}">
        <img src="${item.image}" alt="${item.label}" />
        <div class="galeri-overlay"><span class="galeri-label">${item.label}</span></div>
      </div>`).join('');
  }
}

function renderFasilitas() {
  const f = siteData.fasilitas;
  setText('fasilitasLabel', f.label);
  setText('fasilitasTitle', f.title);
  setText('fasilitasTitleAccent', f.titleAccent);
  setText('fasilitasDesc', f.desc);

  const grid = document.getElementById('fasilitasGrid');
  if (grid && f.items) {
    grid.innerHTML = f.items.map(item => `
      <div class="fasilitas-card" id="fas-${item.id}">
        <div class="fas-icon">${item.icon}</div>
        <h3 class="fas-title">${item.title}</h3>
        <p class="fas-desc">${item.desc}</p>
      </div>`).join('');
  }
}

function renderTestimoni() {
  const t = siteData.testimoni;
  setText('testimoniLabel', t.label);
  setText('testimoniTitle', t.title);
  setText('testimoniTitleAccent', t.titleAccent);

  const grid = document.getElementById('testimoniGrid');
  if (grid && t.items) {
    grid.innerHTML = t.items.map(item => `
      <div class="testimoni-card" id="testi-${item.id}">
        <div class="testi-stars">${'⭐'.repeat(item.stars)}</div>
        <p class="testi-quote">"${item.quote}"</p>
        <div class="testi-author">
          <div class="testi-avatar">${item.initial}</div>
          <div>
            <div class="testi-name">${item.name}</div>
            <div class="testi-origin">${item.origin}</div>
          </div>
        </div>
      </div>`).join('');
  }
}

function renderKontak() {
  const k = siteData.kontak;
  setText('kontakLabel', k.label);
  setText('kontakTitle', k.title);
  setText('kontakTitleAccent', k.titleAccent);
  setText('kontakDesc', k.desc);
  setHTML('kontakAlamat', k.alamat.replace(/\n/g, '<br>'));
  setText('kontakTelepon', k.telepon);
  setText('kontakEmail', k.email);
  setText('kontakJam', k.jam);

  // Social links
  const sosmed = document.getElementById('kontakSosmed');
  if (sosmed) {
    sosmed.innerHTML = `
      <a href="${k.instagram}" class="sosmed-btn" aria-label="Instagram">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
      </a>
      <a href="${k.facebook}" class="sosmed-btn" aria-label="Facebook">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
      </a>
      <a href="${k.whatsapp}" class="sosmed-btn" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </a>
      <a href="${k.youtube}" class="sosmed-btn" aria-label="YouTube">
        <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>
      </a>`;
  }
}

function renderFooter() {
  const f = siteData.footer;
  setText('footerTagline', f.tagline);
  setText('footerCopyright', f.copyright);
  setText('footerCredit', f.credit);
}

/* ── Helpers ── */
function setText(id, val) {
  const el = document.getElementById(id);
  if (el && val !== undefined) el.textContent = val;
}
function setHTML(id, val) {
  const el = document.getElementById(id);
  if (el && val !== undefined) el.innerHTML = val;
}

/* ── Full Render ── */
function renderAll() {
  siteData = loadSiteData();
  renderNavbar();
  renderHero();
  renderTentang();
  renderWisata();
  renderGaleri();
  renderFasilitas();
  renderTestimoni();
  renderKontak();
  renderFooter();
}

/* ============================================================
   ANIMATIONS & INTERACTIONS
   ============================================================ */

/* ── Navbar Scroll ── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');

  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 100) current = section.getAttribute('id');
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
}, { passive: true });

/* ── Mobile Hamburger ── */
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinksEl.classList.toggle('open'));
navLinksEl.addEventListener('click', () => navLinksEl.classList.remove('open'));

/* ── Hero Particles ── */
function createParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.classList.add('particle');
    const size = Math.random() * 6 + 2;
    p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;bottom:-10px;animation-duration:${Math.random()*15+10}s;animation-delay:-${Math.random()*15}s;opacity:${Math.random()*0.5+0.2}`;
    container.appendChild(p);
  }
}

/* ── Counter ── */
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const step = target / (2000 / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString('id-ID');
  }, 16);
}

let countersStarted = false;
function checkCounters() {
  if (countersStarted) return;
  const statsSection = document.querySelector('.hero-stats');
  if (!statsSection) return;
  if (statsSection.getBoundingClientRect().top < window.innerHeight) {
    countersStarted = true;
    document.querySelectorAll('.stat-number').forEach(animateCounter);
  }
}

/* ── Scroll Reveal ── */
function initReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => observer.observe(el));
}

function addRevealClasses() {
  document.querySelectorAll('.section-label').forEach(el => el.classList.add('reveal'));
  document.querySelectorAll('.section-title').forEach((el, i) => { el.classList.add('reveal'); el.classList.add('delay-1'); });
  document.querySelectorAll('.section-desc').forEach(el => { el.classList.add('reveal'); el.classList.add('delay-2'); });
  document.querySelectorAll('.wisata-card').forEach((el, i) => { el.classList.add('reveal'); el.classList.add(`delay-${(i%3)+1}`); });
  document.querySelectorAll('.fasilitas-card').forEach((el, i) => { el.classList.add('reveal'); el.classList.add(`delay-${(i%3)+1}`); });
  document.querySelectorAll('.testimoni-card').forEach((el, i) => { el.classList.add('reveal'); el.classList.add(`delay-${i+1}`); });
  document.querySelectorAll('.galeri-item').forEach((el, i) => { el.classList.add('reveal'); el.classList.add(`delay-${(i%4)+1}`); });
  document.querySelectorAll('.value-item').forEach((el, i) => { el.classList.add('reveal'); el.classList.add(`delay-${(i%2)+1}`); });

  const tv = document.querySelector('.tentang-visual');
  const tc = document.querySelector('.tentang-content');
  if (tv) tv.classList.add('reveal-left');
  if (tc) tc.classList.add('reveal-right');
  const ki = document.querySelector('.kontak-info');
  const kf = document.querySelector('.kontak-form-wrapper');
  if (ki) ki.classList.add('reveal-left');
  if (kf) kf.classList.add('reveal-right');
}

/* ── Galeri Tilt ── */
function initGaleriTilt() {
  document.querySelectorAll('.galeri-item').forEach(item => {
    item.addEventListener('mousemove', e => {
      const r = item.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 8;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -8;
      item.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) scale(1.02)`;
    });
    item.addEventListener('mouseleave', () => { item.style.transform = ''; });
  });
}

/* ── Contact Form ── */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('.btn-submit');
    btn.disabled = true;
    btn.innerHTML = '<span>Mengirim...</span>';
    setTimeout(() => {
      if (success) success.style.display = 'block';
      form.reset();
      btn.disabled = false;
      btn.innerHTML = `<span>Kirim Pesan</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>`;
      setTimeout(() => { if (success) success.style.display = 'none'; }, 5000);
    }, 1500);
  });
}

/* ── Smooth Scroll ── */
function initSmoothScroll() {
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
    }
  });
}

/* ── Listen for admin data changes ── */
window.addEventListener('storage', e => {
  if (e.key === SITE_STORAGE_KEY) {
    siteData = loadSiteData();
    countersStarted = false;
    renderAll();
    setTimeout(() => {
      addRevealClasses();
      initReveal();
      initGaleriTilt();
      checkCounters();
    }, 100);
  }
});

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  createParticles();
  setTimeout(() => {
    addRevealClasses();
    initReveal();
    initGaleriTilt();
    initContactForm();
    initSmoothScroll();
    checkCounters();
    if (window.scrollY > 60) navbar.classList.add('scrolled');
  }, 50);
});

window.addEventListener('scroll', checkCounters, { passive: true });
