/* ============================================================
   ADMIN SCRIPT.JS – Full admin panel logic
   ============================================================ */

const ADMIN_PASSWORD = 'admin123';
let adminData = {};
let currentSection = 'dashboard';

/* ============================================================
   LOGIN
   ============================================================ */
const loginScreen = document.getElementById('loginScreen');
const adminApp = document.getElementById('adminApp');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const eyeBtn = document.getElementById('eyeBtn');
const pwInput = document.getElementById('loginPassword');

function checkLogin() {
  if (sessionStorage.getItem('kangbejo_admin') === '1') showAdmin();
}

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  if (pwInput.value === ADMIN_PASSWORD) {
    sessionStorage.setItem('kangbejo_admin', '1');
    loginError.classList.remove('show');
    loginScreen.style.animation = 'loginOut 0.3s ease forwards';
    loginScreen.addEventListener('animationend', () => {
      loginScreen.style.display = 'none';
      showAdmin();
    }, { once: true });
  } else {
    loginError.classList.add('show');
    pwInput.value = '';
    pwInput.focus();
  }
});

// Add keyframe for loginOut
const style = document.createElement('style');
style.textContent = '@keyframes loginOut { to { opacity:0; transform: scale(1.05); } }';
document.head.appendChild(style);

eyeBtn.addEventListener('click', () => {
  pwInput.type = pwInput.type === 'password' ? 'text' : 'password';
  eyeBtn.textContent = pwInput.type === 'password' ? '👁' : '🙈';
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  sessionStorage.removeItem('kangbejo_admin');
  adminApp.style.display = 'none';
  loginScreen.style.display = 'flex';
  loginScreen.style.animation = '';
  pwInput.value = '';
});

/* ============================================================
   ADMIN INIT
   ============================================================ */
function showAdmin() {
  adminApp.style.display = 'flex';
  adminData = loadSiteData();
  populateAllForms();
  updateDashboardStats();
}

/* ============================================================
   SIDEBAR NAVIGATION
   ============================================================ */
const sidebarItems = document.querySelectorAll('.sidebar-item[data-section]');
const adminSections = document.querySelectorAll('.admin-section[data-panel]');
const topbarTitle = document.getElementById('topbarTitle');
const sidebar = document.getElementById('sidebar');

const sectionTitles = {
  dashboard: 'Dashboard',
  siteInfo: 'Pengaturan Umum',
  navbar: 'Navigasi',
  hero: 'Hero / Banner',
  tentang: 'Tentang Kami',
  wisata: 'Paket Wisata',
  galeri: 'Galeri',
  fasilitas: 'Fasilitas',
  testimoni: 'Testimoni',
  kontak: 'Kontak',
  footer: 'Footer'
};

sidebarItems.forEach(item => {
  item.addEventListener('click', () => {
    const section = item.dataset.section;
    switchSection(section);
  });
});

function switchSection(section) {
  currentSection = section;
  sidebarItems.forEach(i => i.classList.remove('active'));
  document.querySelector(`.sidebar-item[data-section="${section}"]`).classList.add('active');
  adminSections.forEach(s => s.classList.remove('active'));
  document.querySelector(`.admin-section[data-panel="${section}"]`).classList.add('active');
  topbarTitle.textContent = sectionTitles[section] || section;
}

document.getElementById('sidebarToggle').addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
});

/* ============================================================
   GLOBAL SAVE
   ============================================================ */
document.getElementById('btnSaveGlobal').addEventListener('click', () => {
  collectAllForms();
  if (saveSiteData(adminData)) {
    showToast('✅ Perubahan berhasil disimpan dan dipublish!', 'success');
    updateDashboardStats();
  } else {
    showToast('❌ Gagal menyimpan. Coba lagi.', 'error');
  }
});

function showToast(msg, type = 'success') {
  const toast = document.getElementById('adminToast');
  toast.textContent = msg;
  toast.className = `admin-toast ${type}`;
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => { toast.className = 'admin-toast'; }, 3500);
}

/* ============================================================
   COLLECT FORMS → adminData
   ============================================================ */
function collectAllForms() {
  collectSiteInfo();
  collectHero();
  collectTentang();
  collectWisata();
  collectGaleri();
  collectFasilitas();
  collectTestimoni();
  collectKontak();
  collectFooter();
  // navbar collected live
}

function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}
function checked(id) {
  const el = document.getElementById(id);
  return el ? el.checked : false;
}

function collectSiteInfo() {
  adminData.siteInfo = {
    ...(adminData.siteInfo || {}),
    logoEmoji: val('si_logoEmoji'),
    logoText: val('si_logoText'),
    logoBold: val('si_logoBold'),
    ctaText: val('si_ctaText'),
    ctaHref: val('si_ctaHref'),
    waNumber: val('si_waNumber'),
    metaTitle: val('si_metaTitle'),
    metaDesc: val('si_metaDesc')
  };
}
function collectHero() {
  adminData.hero = {
    ...(adminData.hero || {}),
    badge: val('hero_badge'),
    title: val('hero_title'),
    titleHighlight: val('hero_titleHighlight'),
    subtitle: val('hero_subtitle'),
    btn1Text: val('hero_btn1Text'),
    btn1Href: val('hero_btn1Href'),
    btn2Text: val('hero_btn2Text'),
    btn2Href: val('hero_btn2Href'),
    bgImage: val('hero_bgImage'),
    stats: adminData.hero.stats || []
  };
}
function collectTentang() {
  adminData.tentang = {
    ...(adminData.tentang || {}),
    label: val('tent_label'),
    title: val('tent_title'),
    titleAccent: val('tent_titleAccent'),
    desc1: val('tent_desc1'),
    desc2: val('tent_desc2'),
    badgeIcon: val('tent_badgeIcon'),
    badgeTitle: val('tent_badgeTitle'),
    badgeSub: val('tent_badgeSub'),
    expNumber: val('tent_expNumber'),
    expText: val('tent_expText'),
    ctaText: val('tent_ctaText'),
    image: val('tent_image'),
    values: adminData.tentang.values || []
  };
}
function collectWisata() {
  adminData.wisata = {
    ...(adminData.wisata || {}),
    label: val('wis_label'),
    title: val('wis_title'),
    titleAccent: val('wis_titleAccent'),
    desc: val('wis_desc'),
    packages: adminData.wisata.packages || []
  };
}
function collectGaleri() {
  adminData.galeri = {
    ...(adminData.galeri || {}),
    label: val('gal_label'),
    title: val('gal_title'),
    titleAccent: val('gal_titleAccent'),
    desc: val('gal_desc'),
    items: adminData.galeri.items || []
  };
}
function collectFasilitas() {
  adminData.fasilitas = {
    ...(adminData.fasilitas || {}),
    label: val('fas_label'),
    title: val('fas_title'),
    titleAccent: val('fas_titleAccent'),
    desc: val('fas_desc'),
    items: adminData.fasilitas.items || []
  };
}
function collectTestimoni() {
  adminData.testimoni = {
    ...(adminData.testimoni || {}),
    label: val('tes_label'),
    title: val('tes_title'),
    titleAccent: val('tes_titleAccent'),
    items: adminData.testimoni.items || []
  };
}
function collectKontak() {
  adminData.kontak = {
    label: val('kon_label'),
    title: val('kon_title'),
    titleAccent: val('kon_titleAccent'),
    desc: val('kon_desc'),
    alamat: val('kon_alamat'),
    telepon: val('kon_telepon'),
    email: val('kon_email'),
    jam: val('kon_jam'),
    waNumber: val('kon_waNumber'),
    instagram: val('kon_instagram'),
    facebook: val('kon_facebook'),
    whatsapp: val('kon_whatsapp'),
    youtube: val('kon_youtube')
  };
}
function collectFooter() {
  adminData.footer = {
    tagline: val('foot_tagline'),
    copyright: val('foot_copyright'),
    credit: val('foot_credit')
  };
}

/* ============================================================
   POPULATE FORMS ← adminData
   ============================================================ */
function populateAllForms() {
  populateSiteInfo();
  populateHero();
  populateTentang();
  populateWisata();
  populateGaleri();
  populateFasilitas();
  populateTestimoni();
  populateKontak();
  populateFooter();
  populateNavbar();
}

function setVal(id, v) {
  const el = document.getElementById(id);
  if (el && v !== undefined) el.value = v;
}
function setCheck(id, v) {
  const el = document.getElementById(id);
  if (el) el.checked = !!v;
}

function populateSiteInfo() {
  const s = adminData.siteInfo || {};
  setVal('si_logoEmoji', s.logoEmoji);
  setVal('si_logoText', s.logoText);
  setVal('si_logoBold', s.logoBold);
  setVal('si_ctaText', s.ctaText);
  setVal('si_ctaHref', s.ctaHref);
  setVal('si_waNumber', s.waNumber);
  setVal('si_metaTitle', s.metaTitle);
  setVal('si_metaDesc', s.metaDesc);
}
function populateHero() {
  const h = adminData.hero || {};
  setVal('hero_badge', h.badge);
  setVal('hero_title', h.title);
  setVal('hero_titleHighlight', h.titleHighlight);
  setVal('hero_subtitle', h.subtitle);
  setVal('hero_btn1Text', h.btn1Text);
  setVal('hero_btn1Href', h.btn1Href);
  setVal('hero_btn2Text', h.btn2Text);
  setVal('hero_btn2Href', h.btn2Href);
  setVal('hero_bgImage', h.bgImage);
  showImgPreview('hero_bgPreview', h.bgImage);
  renderHeroStatList();

  document.getElementById('hero_bgUpload').addEventListener('change', function() {
    handleImageUpload(this, 'hero_bgImage', 'hero_bgPreview', val => { adminData.hero.bgImage = val; });
  });
}
function populateTentang() {
  const t = adminData.tentang || {};
  setVal('tent_label', t.label);
  setVal('tent_title', t.title);
  setVal('tent_titleAccent', t.titleAccent);
  setVal('tent_desc1', t.desc1);
  setVal('tent_desc2', t.desc2);
  setVal('tent_badgeIcon', t.badgeIcon);
  setVal('tent_badgeTitle', t.badgeTitle);
  setVal('tent_badgeSub', t.badgeSub);
  setVal('tent_expNumber', t.expNumber);
  setVal('tent_expText', t.expText);
  setVal('tent_ctaText', t.ctaText);
  setVal('tent_image', t.image);
  showImgPreview('tent_imgPreview', t.image);
  renderValueList();

  document.getElementById('tent_imgUpload').addEventListener('change', function() {
    handleImageUpload(this, 'tent_image', 'tent_imgPreview', val => { adminData.tentang.image = val; });
  });
}
function populateWisata() {
  const w = adminData.wisata || {};
  setVal('wis_label', w.label);
  setVal('wis_title', w.title);
  setVal('wis_titleAccent', w.titleAccent);
  setVal('wis_desc', w.desc);
  renderPackageList();
}
function populateGaleri() {
  const g = adminData.galeri || {};
  setVal('gal_label', g.label);
  setVal('gal_title', g.title);
  setVal('gal_titleAccent', g.titleAccent);
  setVal('gal_desc', g.desc);
  renderGalleryList();
}
function populateFasilitas() {
  const f = adminData.fasilitas || {};
  setVal('fas_label', f.label);
  setVal('fas_title', f.title);
  setVal('fas_titleAccent', f.titleAccent);
  setVal('fas_desc', f.desc);
  renderFasilitasList();
}
function populateTestimoni() {
  const t = adminData.testimoni || {};
  setVal('tes_label', t.label);
  setVal('tes_title', t.title);
  setVal('tes_titleAccent', t.titleAccent);
  renderTestimoniList();
}
function populateKontak() {
  const k = adminData.kontak || {};
  setVal('kon_label', k.label);
  setVal('kon_title', k.title);
  setVal('kon_titleAccent', k.titleAccent);
  setVal('kon_desc', k.desc);
  setVal('kon_alamat', k.alamat);
  setVal('kon_telepon', k.telepon);
  setVal('kon_email', k.email);
  setVal('kon_jam', k.jam);
  setVal('kon_waNumber', k.waNumber);
  setVal('kon_instagram', k.instagram);
  setVal('kon_facebook', k.facebook);
  setVal('kon_whatsapp', k.whatsapp);
  setVal('kon_youtube', k.youtube);
}
function populateFooter() {
  const f = adminData.footer || {};
  setVal('foot_tagline', f.tagline);
  setVal('foot_copyright', f.copyright);
  setVal('foot_credit', f.credit);
}

/* ============================================================
   IMAGE UPLOAD HELPER
   ============================================================ */
function handleImageUpload(input, textInputId, previewId, callback) {
  const file = input.files[0];
  if (!file) return;
  if (file.size > 3 * 1024 * 1024) {
    showToast('⚠️ Gambar terlalu besar. Maks 3MB.', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = e => {
    const dataUrl = e.target.result;
    const textInput = document.getElementById(textInputId);
    if (textInput) textInput.value = dataUrl;
    showImgPreview(previewId, dataUrl);
    if (callback) callback(dataUrl);
  };
  reader.readAsDataURL(file);
}

function showImgPreview(previewId, src) {
  const el = document.getElementById(previewId);
  if (!el || !src) return;
  el.src = src.startsWith('data:') ? src : `../${src}`;
  el.style.display = 'block';
}

/* ============================================================
   NAVBAR EDITOR
   ============================================================ */
function populateNavbar() {
  renderNavItemList();
  document.getElementById('addNavItem').addEventListener('click', () => {
    adminData.navbar.push({ id: generateId('n'), text: 'Menu Baru', href: '#' });
    renderNavItemList();
  });
}

function renderNavItemList() {
  const list = document.getElementById('navItemList');
  if (!list) return;
  list.innerHTML = '';
  adminData.navbar.forEach((item, idx) => {
    const card = createItemCard({
      icon: '🧭',
      name: item.text,
      meta: item.href,
      body: `
        <div class="form-row" style="margin-top:16px">
          <div class="form-group">
            <label>Teks Menu</label>
            <input type="text" data-field="text" value="${esc(item.text)}" placeholder="Beranda" />
          </div>
          <div class="form-group">
            <label>Link / Href</label>
            <input type="text" data-field="href" value="${esc(item.href)}" placeholder="#home" />
          </div>
        </div>`,
      onDelete: () => { adminData.navbar.splice(idx, 1); renderNavItemList(); },
      onInput: (field, value) => { adminData.navbar[idx][field] = value; renderNavItemList(); waitRender(); }
    });
    list.appendChild(card);
  });
  initDraggable(list, adminData.navbar, renderNavItemList);
}

/* ============================================================
   HERO STATS EDITOR
   ============================================================ */
function renderHeroStatList() {
  const list = document.getElementById('heroStatList');
  if (!list) return;
  list.innerHTML = '';
  (adminData.hero.stats || []).forEach((stat, idx) => {
    const card = createItemCard({
      icon: '📊',
      name: stat.label,
      meta: `${stat.number}${stat.suffix}`,
      body: `
        <div class="form-row" style="margin-top:16px">
          <div class="form-group">
            <label>Angka</label>
            <input type="number" data-field="number" value="${stat.number}" />
          </div>
          <div class="form-group">
            <label>Suffix (+ atau %)</label>
            <input type="text" data-field="suffix" value="${esc(stat.suffix)}" maxlength="3" />
          </div>
          <div class="form-group">
            <label>Label</label>
            <input type="text" data-field="label" value="${esc(stat.label)}" />
          </div>
        </div>`,
      onDelete: () => { adminData.hero.stats.splice(idx, 1); renderHeroStatList(); },
      onInput: (field, value) => { adminData.hero.stats[idx][field] = field === 'number' ? +value : value; }
    });
    list.appendChild(card);
  });
  initDraggable(list, adminData.hero.stats, renderHeroStatList);

  document.getElementById('addHeroStat').onclick = () => {
    adminData.hero.stats.push({ id: generateId('s'), number: 100, suffix: '+', label: 'Label Baru' });
    renderHeroStatList();
  };
}

/* ============================================================
   VALUES EDITOR (Tentang)
   ============================================================ */
function renderValueList() {
  const list = document.getElementById('valueList');
  if (!list) return;
  list.innerHTML = '';
  (adminData.tentang.values || []).forEach((v, idx) => {
    const card = createItemCard({
      icon: v.icon,
      name: v.title,
      meta: v.desc,
      body: `
        <div class="form-row" style="margin-top:16px">
          <div class="form-group" style="max-width:80px">
            <label>Icon</label>
            <input type="text" data-field="icon" value="${esc(v.icon)}" maxlength="4" />
          </div>
          <div class="form-group">
            <label>Judul</label>
            <input type="text" data-field="title" value="${esc(v.title)}" />
          </div>
          <div class="form-group">
            <label>Deskripsi</label>
            <input type="text" data-field="desc" value="${esc(v.desc)}" />
          </div>
        </div>`,
      onDelete: () => { adminData.tentang.values.splice(idx, 1); renderValueList(); },
      onInput: (field, value) => { adminData.tentang.values[idx][field] = value; }
    });
    list.appendChild(card);
  });
  initDraggable(list, adminData.tentang.values, renderValueList);

  document.getElementById('addValue').onclick = () => {
    adminData.tentang.values.push({ id: generateId('v'), icon: '⭐', title: 'Nilai Baru', desc: 'Deskripsi' });
    renderValueList();
  };
}

/* ============================================================
   PACKAGE EDITOR
   ============================================================ */
function renderPackageList() {
  const list = document.getElementById('packageList');
  if (!list) return;
  list.innerHTML = '';
  (adminData.wisata.packages || []).forEach((pkg, idx) => {
    const imgSrc = pkg.image ? (pkg.image.startsWith('data:') ? pkg.image : `../${pkg.image}`) : '';
    const infoStr = (pkg.info || []).join('\n');
    const card = createItemCard({
      thumb: imgSrc,
      icon: pkg.icon,
      name: pkg.title,
      meta: `${pkg.price} · ${pkg.featured ? '⭐ Unggulan' : 'Reguler'}`,
      body: `
        <div class="form-row" style="margin-top:16px">
          <div class="form-group" style="max-width:80px">
            <label>Icon</label>
            <input type="text" data-field="icon" value="${esc(pkg.icon)}" maxlength="4" />
          </div>
          <div class="form-group">
            <label>Judul Paket</label>
            <input type="text" data-field="title" value="${esc(pkg.title)}" />
          </div>
          <div class="form-group">
            <label>Teks Badge</label>
            <input type="text" data-field="badge" value="${esc(pkg.badge || '')}" placeholder="Populer" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group full">
            <label>Deskripsi</label>
            <textarea data-field="desc" rows="2">${esc(pkg.desc)}</textarea>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group full">
            <label>Info (satu per baris, min. ⏱ ⊕ 📍)</label>
            <textarea data-field="info_raw" rows="3">${infoStr}</textarea>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Harga</label>
            <input type="text" data-field="price" value="${esc(pkg.price)}" />
          </div>
          <div class="form-group">
            <label>Per</label>
            <input type="text" data-field="pricePer" value="${esc(pkg.pricePer || '/orang')}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group full">
            <label>Gambar</label>
            <div class="img-upload-wrap">
              ${imgSrc ? `<img src="${imgSrc}" class="img-preview" style="width:80px;height:60px;object-fit:cover;border-radius:6px;border:1px solid rgba(255,255,255,0.08)" />` : ''}
              <label class="img-upload-btn" for="pkg_upload_${pkg.id}">📁 Upload
                <input type="file" id="pkg_upload_${pkg.id}" accept="image/*" style="display:none" data-pkg="${idx}" />
              </label>
              <input type="text" data-field="image" value="${esc(pkg.image || '')}" placeholder="eco_tour.png" />
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <div class="checkbox-row">
              <input type="checkbox" data-field="featured" id="pkg_feat_${pkg.id}" ${pkg.featured ? 'checked' : ''} />
              <label for="pkg_feat_${pkg.id}">Tandai sebagai Paket Unggulan</label>
            </div>
          </div>
          <div class="form-group">
            <div class="checkbox-row">
              <input type="checkbox" data-field="badgeGold" id="pkg_gold_${pkg.id}" ${pkg.badgeGold ? 'checked' : ''} />
              <label for="pkg_gold_${pkg.id}">Badge warna emas</label>
            </div>
          </div>
        </div>`,
      onDelete: () => { adminData.wisata.packages.splice(idx, 1); renderPackageList(); },
      onInput: (field, value, type) => {
        if (field === 'info_raw') {
          adminData.wisata.packages[idx].info = value.split('\n').map(s => s.trim()).filter(Boolean);
        } else if (field === 'featured' || field === 'badgeGold') {
          adminData.wisata.packages[idx][field] = !!value;
        } else {
          adminData.wisata.packages[idx][field] = value;
        }
      }
    });

    // File upload handler
    list.appendChild(card);
    const uploadInput = card.querySelector(`#pkg_upload_${pkg.id}`);
    if (uploadInput) {
      uploadInput.addEventListener('change', function() {
        const pidx = +this.dataset.pkg;
        handleImageUpload(this, null, null, dataUrl => {
          adminData.wisata.packages[pidx].image = dataUrl;
          renderPackageList();
        });
      });
    }
  });

  initDraggable(list, adminData.wisata.packages, renderPackageList);

  document.getElementById('addPackage').onclick = () => {
    adminData.wisata.packages.push({
      id: generateId('p'), image: 'eco_tour.png', badge: '', badgeGold: false,
      icon: '🌟', title: 'Paket Baru', desc: 'Deskripsi paket wisata baru.',
      info: ['⏱ Durasi', '👥 Maks Peserta'], price: 'Rp 0', pricePer: '/orang', featured: false
    });
    renderPackageList();
  };
}

/* ============================================================
   GALLERY EDITOR
   ============================================================ */
function renderGalleryList() {
  const list = document.getElementById('galleryList');
  if (!list) return;
  list.innerHTML = '';
  (adminData.galeri.items || []).forEach((item, idx) => {
    const imgSrc = item.image ? (item.image.startsWith('data:') ? item.image : `../${item.image}`) : '';
    const card = createItemCard({
      thumb: imgSrc,
      name: item.label,
      meta: `Ukuran: ${item.size}`,
      body: `
        <div class="form-row" style="margin-top:16px">
          <div class="form-group">
            <label>Label Foto</label>
            <input type="text" data-field="label" value="${esc(item.label)}" />
          </div>
          <div class="form-group">
            <label>Ukuran Grid</label>
            <select data-field="size">
              <option value="normal" ${item.size === 'normal' ? 'selected' : ''}>Normal (1 kolom)</option>
              <option value="large" ${item.size === 'large' ? 'selected' : ''}>Large (2 kolom atas)</option>
              <option value="wide" ${item.size === 'wide' ? 'selected' : ''}>Wide (2 kolom bawah)</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group full">
            <label>Gambar</label>
            <div class="img-upload-wrap">
              ${imgSrc ? `<img src="${imgSrc}" class="img-preview" style="width:80px;height:60px;object-fit:cover;border-radius:6px;border:1px solid rgba(255,255,255,0.08)" />` : ''}
              <label class="img-upload-btn" for="gal_upload_${item.id}">📁 Upload
                <input type="file" id="gal_upload_${item.id}" accept="image/*" style="display:none" data-gal="${idx}" />
              </label>
              <input type="text" data-field="image" value="${esc(item.image || '')}" placeholder="hero_village.png" />
            </div>
          </div>
        </div>`,
      onDelete: () => { adminData.galeri.items.splice(idx, 1); renderGalleryList(); },
      onInput: (field, value) => { adminData.galeri.items[idx][field] = value; }
    });
    list.appendChild(card);

    const uploadInput = card.querySelector(`#gal_upload_${item.id}`);
    if (uploadInput) {
      uploadInput.addEventListener('change', function() {
        const gidx = +this.dataset.gal;
        handleImageUpload(this, null, null, dataUrl => {
          adminData.galeri.items[gidx].image = dataUrl;
          renderGalleryList();
        });
      });
    }
  });

  initDraggable(list, adminData.galeri.items, renderGalleryList);

  document.getElementById('addGalleryItem').onclick = () => {
    adminData.galeri.items.push({ id: generateId('g'), image: 'hero_village.png', label: 'Foto Baru', size: 'normal' });
    renderGalleryList();
  };
}

/* ============================================================
   FASILITAS EDITOR
   ============================================================ */
function renderFasilitasList() {
  const list = document.getElementById('fasilitasList');
  if (!list) return;
  list.innerHTML = '';
  (adminData.fasilitas.items || []).forEach((item, idx) => {
    const card = createItemCard({
      icon: item.icon,
      name: item.title,
      meta: item.desc.substring(0, 50) + '...',
      body: `
        <div class="form-row" style="margin-top:16px">
          <div class="form-group" style="max-width:80px">
            <label>Icon</label>
            <input type="text" data-field="icon" value="${esc(item.icon)}" maxlength="4" />
          </div>
          <div class="form-group">
            <label>Judul</label>
            <input type="text" data-field="title" value="${esc(item.title)}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group full">
            <label>Deskripsi</label>
            <textarea data-field="desc" rows="2">${esc(item.desc)}</textarea>
          </div>
        </div>`,
      onDelete: () => { adminData.fasilitas.items.splice(idx, 1); renderFasilitasList(); },
      onInput: (field, value) => { adminData.fasilitas.items[idx][field] = value; }
    });
    list.appendChild(card);
  });

  initDraggable(list, adminData.fasilitas.items, renderFasilitasList);

  document.getElementById('addFasilitas').onclick = () => {
    adminData.fasilitas.items.push({ id: generateId('f'), icon: '🌟', title: 'Fasilitas Baru', desc: 'Deskripsi fasilitas baru.' });
    renderFasilitasList();
  };
}

/* ============================================================
   TESTIMONI EDITOR
   ============================================================ */
function renderTestimoniList() {
  const list = document.getElementById('testimoniList');
  if (!list) return;
  list.innerHTML = '';
  (adminData.testimoni.items || []).forEach((item, idx) => {
    const card = createItemCard({
      name: item.name,
      meta: item.origin + ' · ' + '⭐'.repeat(item.stars),
      body: `
        <div class="form-row" style="margin-top:16px">
          <div class="form-group">
            <label>Nama</label>
            <input type="text" data-field="name" value="${esc(item.name)}" />
          </div>
          <div class="form-group">
            <label>Asal</label>
            <input type="text" data-field="origin" value="${esc(item.origin)}" />
          </div>
          <div class="form-group" style="max-width:70px">
            <label>Inisial</label>
            <input type="text" data-field="initial" value="${esc(item.initial)}" maxlength="2" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group full">
            <label>Komentar</label>
            <textarea data-field="quote" rows="3">${esc(item.quote)}</textarea>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Bintang (1-5)</label>
            <input type="number" data-field="stars" value="${item.stars}" min="1" max="5" />
          </div>
        </div>`,
      onDelete: () => { adminData.testimoni.items.splice(idx, 1); renderTestimoniList(); },
      onInput: (field, value) => {
        adminData.testimoni.items[idx][field] = field === 'stars' ? Math.min(5, Math.max(1, +value)) : value;
      }
    });
    list.appendChild(card);
  });

  initDraggable(list, adminData.testimoni.items, renderTestimoniList);

  document.getElementById('addTestimoni').onclick = () => {
    adminData.testimoni.items.push({ id: generateId('t'), stars: 5, quote: 'Komentar baru...', name: 'Nama Tamu', origin: 'Kota, Indonesia', initial: 'T' });
    renderTestimoniList();
  };
}

/* ============================================================
   CREATE ITEM CARD (generic expandable card)
   ============================================================ */
function createItemCard({ thumb, icon, name, meta, body, onDelete, onInput }) {
  const card = document.createElement('div');
  card.className = 'item-card';
  card.draggable = true;
  card.innerHTML = `
    <div class="item-card-header">
      <span class="btn-icon btn-drag" title="Seret untuk urutkan">⣿</span>
      ${thumb ? `<img src="${thumb}" class="item-card-thumb" onerror="this.style.display='none'" />` : `<span style="font-size:1.5rem;flex-shrink:0">${icon || '📌'}</span>`}
      <div class="item-card-info">
        <div class="item-card-name">${name || 'Item'}</div>
        <div class="item-card-meta">${meta || ''}</div>
      </div>
      <div class="item-card-actions">
        <button class="btn-icon btn-delete" title="Hapus">🗑</button>
        <span class="item-toggle">▼</span>
      </div>
    </div>
    <div class="item-card-body">${body}</div>`;

  // Toggle expand
  card.querySelector('.item-card-header').addEventListener('click', e => {
    if (e.target.closest('.btn-delete') || e.target.closest('.btn-drag')) return;
    card.classList.toggle('expanded');
  });

  // Delete
  card.querySelector('.btn-delete').addEventListener('click', e => {
    e.stopPropagation();
    if (confirm('Hapus item ini?')) onDelete();
  });

  // Input events
  if (onInput) {
    card.querySelectorAll('[data-field]').forEach(el => {
      const event = (el.tagName === 'SELECT' || el.type === 'checkbox') ? 'change' : 'input';
      el.addEventListener(event, () => {
        const v = el.type === 'checkbox' ? el.checked : el.value;
        onInput(el.dataset.field, v, el.type);
      });
    });
  }

  return card;
}

/* ============================================================
   DRAG & DROP REORDER
   ============================================================ */
function initDraggable(list, dataArray, rerender) {
  let dragSrc = null;

  list.querySelectorAll('.item-card').forEach((card, idx) => {
    card.dataset.idx = idx;

    card.addEventListener('dragstart', e => {
      dragSrc = card;
      card.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      list.querySelectorAll('.item-card').forEach(c => c.classList.remove('drag-over'));
    });
    card.addEventListener('dragover', e => {
      e.preventDefault();
      if (card !== dragSrc) {
        list.querySelectorAll('.item-card').forEach(c => c.classList.remove('drag-over'));
        card.classList.add('drag-over');
      }
    });
    card.addEventListener('drop', e => {
      e.preventDefault();
      if (dragSrc && card !== dragSrc) {
        const fromIdx = +dragSrc.dataset.idx;
        const toIdx = +card.dataset.idx;
        const [moved] = dataArray.splice(fromIdx, 1);
        dataArray.splice(toIdx, 0, moved);
        rerender();
      }
    });
  });
}

/* ============================================================
   DASHBOARD STATS
   ============================================================ */
function updateDashboardStats() {
  const d = loadSiteData();
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  set('statNavItems', (d.navbar || []).length);
  set('statPackages', (d.wisata?.packages || []).length);
  set('statGallery', (d.galeri?.items || []).length);
  set('statTestimonials', (d.testimoni?.items || []).length);
}

/* ============================================================
   UTILS
   ============================================================ */
function esc(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

let renderWait;
function waitRender() {
  clearTimeout(renderWait);
  renderWait = setTimeout(() => {}, 300);
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  checkLogin();
});
