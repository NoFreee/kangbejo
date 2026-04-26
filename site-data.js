/* ============================================================
   SITE-DATA.JS — Shared default data for Desa Wisata Kangbejo
   ============================================================ */

const SITE_STORAGE_KEY = 'kangbejo_site_data';

const defaultSiteData = {
  siteInfo: {
    logoEmoji: '🌿',
    logoText: 'Desa Wisata',
    logoBold: 'Kangbejo',
    ctaText: 'Kunjungi Kami',
    ctaHref: '#kontak',
    waNumber: '6281234567890',
    metaTitle: 'Desa Wisata Kangbejo – Surga Alam & Budaya Nusantara',
    metaDesc: 'Desa Wisata Kangbejo menawarkan pengalaman wisata alam, budaya lokal, kuliner tradisional, dan kerajinan tangan autentik.'
  },
  navbar: [
    { id: 'n1', text: 'Beranda', href: '#home' },
    { id: 'n2', text: 'Tentang', href: '#tentang' },
    { id: 'n3', text: 'Wisata', href: '#wisata' },
    { id: 'n4', text: 'Galeri', href: '#galeri' },
    { id: 'n5', text: 'Fasilitas', href: '#fasilitas' },
    { id: 'n6', text: 'Kontak', href: '#kontak' }
  ],
  hero: {
    badge: '✦ Destinasi Unggulan Jawa Tengah ✦',
    title: 'Jelajahi Keindahan',
    titleHighlight: 'Desa Wisata Kangbejo',
    subtitle: 'Nikmati pengalaman wisata autentik di tengah hamparan alam hijau yang memukau, budaya lokal yang kaya, dan keramahan warga desa yang tulus.',
    btn1Text: 'Jelajahi Sekarang',
    btn1Href: '#wisata',
    btn2Text: 'Tentang Kami',
    btn2Href: '#tentang',
    bgImage: 'hero_village.png',
    stats: [
      { id: 's1', number: 5000, suffix: '+', label: 'Wisatawan/Tahun' },
      { id: 's2', number: 12, suffix: '+', label: 'Paket Wisata' },
      { id: 's3', number: 98, suffix: '%', label: 'Kepuasan Tamu' }
    ]
  },
  tentang: {
    label: 'Tentang Kami',
    title: 'Warisan Alam & Budaya',
    titleAccent: 'yang Terjaga',
    desc1: 'Desa Wisata Kangbejo adalah sebuah desa yang terletak di jantung keindahan alam Jawa Tengah. Dengan panorama sawah yang membentang luas, pegunungan yang megah, dan kebudayaan lokal yang masih terjaga, Kangbejo menjadi destinasi wisata yang menawarkan pengalaman tak terlupakan.',
    desc2: 'Kami berkomitmen untuk menjaga kelestarian alam dan budaya lokal sambil memberikan pengalaman wisata terbaik bagi setiap tamu yang datang. Setiap kunjungan berkontribusi langsung pada kesejahteraan masyarakat desa.',
    badgeIcon: '🏆',
    badgeTitle: 'Desa Wisata Terbaik',
    badgeSub: 'Penghargaan Nasional 2024',
    expNumber: '10+',
    expText: 'Tahun Melayani Wisatawan',
    ctaText: 'Hubungi Kami',
    ctaHref: '#kontak',
    image: 'hero_village.png',
    values: [
      { id: 'v1', icon: '🌿', title: 'Ramah Lingkungan', desc: 'Ekowisata berkelanjutan' },
      { id: 'v2', icon: '🤝', title: 'Berbasis Komunitas', desc: 'Memberdayakan warga lokal' },
      { id: 'v3', icon: '🎯', title: 'Autentik & Asli', desc: 'Pengalaman budaya nyata' },
      { id: 'v4', icon: '⭐', title: 'Pelayanan Terbaik', desc: 'Kepuasan tamu prioritas' }
    ]
  },
  wisata: {
    label: 'Paket Wisata',
    title: 'Pilih Pengalaman',
    titleAccent: 'Petualangan Anda',
    desc: 'Kami menyediakan berbagai paket wisata yang disesuaikan dengan kebutuhan dan minat Anda',
    packages: [
      {
        id: 'p1', image: 'eco_tour.png', badge: 'Populer', badgeGold: false,
        icon: '🌿', title: 'Wisata Alam & Trekking',
        desc: 'Jelajahi jalur-jalur alam tersembunyi, sawah hijau, dan hutan bambu yang menenangkan jiwa.',
        info: ['⏱ 4–6 Jam', '👥 Maks 20 Orang', '📍 Jalur Utama'],
        price: 'Rp 75.000', pricePer: '/orang', featured: false
      },
      {
        id: 'p2', image: 'culture_dance.png', badge: 'Unggulan', badgeGold: true,
        icon: '🎭', title: 'Wisata Budaya & Seni',
        desc: 'Saksikan pertunjukan seni tradisional, belajar membatik, dan nikmati penampilan kesenian lokal yang memukau.',
        info: ['⏱ 1 Hari', '👥 Maks 30 Orang', '🎪 Panggung Seni'],
        price: 'Rp 120.000', pricePer: '/orang', featured: true
      },
      {
        id: 'p3', image: 'local_food.png', badge: '', badgeGold: false,
        icon: '🍃', title: 'Wisata Kuliner Tradisional',
        desc: 'Rasakan cita rasa autentik masakan rumahan khas desa, belajar memasak bersama ibu-ibu desa.',
        info: ['⏱ 3–4 Jam', '👥 Maks 15 Orang', '🍽 Dapur Desa'],
        price: 'Rp 95.000', pricePer: '/orang', featured: false
      }
    ]
  },
  galeri: {
    label: 'Galeri',
    title: 'Keindahan',
    titleAccent: 'Kangbejo',
    desc: 'Sepintas keindahan yang menanti Anda di Desa Wisata Kangbejo',
    items: [
      { id: 'g1', image: 'hero_village.png', label: 'Panorama Sawah', size: 'large' },
      { id: 'g2', image: 'culture_dance.png', label: 'Tari Tradisional', size: 'normal' },
      { id: 'g3', image: 'local_food.png', label: 'Kuliner Lokal', size: 'normal' },
      { id: 'g4', image: 'eco_tour.png', label: 'Jalur Ekowisata', size: 'wide' }
    ]
  },
  fasilitas: {
    label: 'Fasilitas',
    title: 'Fasilitas Lengkap',
    titleAccent: 'Untuk Kenyamanan Anda',
    desc: 'Kami menyediakan fasilitas terbaik untuk memastikan kunjungan Anda berkesan',
    items: [
      { id: 'f1', icon: '🏡', title: 'Homestay Nyaman', desc: 'Penginapan bersama keluarga angkat desa dengan suasana hangat dan autentik' },
      { id: 'f2', icon: '🧭', title: 'Pemandu Lokal', desc: 'Pemandu berpengalaman yang fasih berbahasa Indonesia dan Inggris' },
      { id: 'f3', icon: '🚐', title: 'Transportasi', desc: 'Layanan antar-jemput dari dan ke lokasi Anda dengan armada nyaman' },
      { id: 'f4', icon: '🎨', title: 'Workshop Kerajinan', desc: 'Belajar langsung membuat kerajinan tangan khas desa bersama pengrajin lokal' },
      { id: 'f5', icon: '🍚', title: 'Catering Tradisional', desc: 'Sajian makan siang dan makan malam dengan menu otentik masakan desa' },
      { id: 'f6', icon: '📸', title: 'Area Fotografi', desc: 'Spot foto Instagramable dengan latar pemandangan alam dan budaya yang memukau' }
    ]
  },
  testimoni: {
    label: 'Testimoni',
    title: 'Apa Kata',
    titleAccent: 'Wisatawan Kami',
    items: [
      { id: 't1', stars: 5, quote: 'Pengalaman yang luar biasa! Alam yang indah, penduduk yang ramah, dan kuliner yang sangat lezat. Pasti akan kembali lagi!', name: 'Sari Dewi', origin: 'Jakarta, Indonesia', initial: 'S' },
      { id: 't2', stars: 5, quote: 'Tempat yang sangat menenangkan. Pemandangan sawahnya menakjubkan. Paket wisata budayanya membuka wawasan kami tentang kekayaan budaya lokal.', name: 'Budi Santoso', origin: 'Surabaya, Indonesia', initial: 'B' },
      { id: 't3', stars: 5, quote: 'A truly authentic Indonesian experience! The village guides were knowledgeable and friendly. Highly recommended for families and groups!', name: 'Michael Chen', origin: 'Singapore', initial: 'M' }
    ]
  },
  kontak: {
    label: 'Hubungi Kami',
    title: 'Rencanakan',
    titleAccent: 'Perjalanan Anda',
    desc: 'Hubungi kami untuk informasi lebih lanjut mengenai paket wisata, pemesanan, dan segala pertanyaan Anda.',
    alamat: 'Desa Kangbejo, Kec. Ngombol\nKab. Purworejo, Jawa Tengah 54174',
    telepon: '+62 812-3456-7890',
    email: 'info@desawisatakangbejo.id',
    jam: 'Senin – Minggu: 07.00 – 18.00 WIB',
    waNumber: '6281234567890',
    instagram: '#',
    facebook: '#',
    whatsapp: '#',
    youtube: '#'
  },
  footer: {
    tagline: 'Menjaga kelestarian alam dan budaya untuk generasi mendatang, sambil berbagi keindahan dengan dunia.',
    copyright: '© 2025 Desa Wisata Kangbejo. Seluruh hak cipta dilindungi.',
    credit: 'Dibuat dengan ❤️ untuk memajukan pariwisata desa Indonesia'
  }
};

function loadSiteData() {
  try {
    const saved = localStorage.getItem(SITE_STORAGE_KEY);
    if (!saved) return JSON.parse(JSON.stringify(defaultSiteData));
    const parsed = JSON.parse(saved);
    return deepMerge(JSON.parse(JSON.stringify(defaultSiteData)), parsed);
  } catch (e) {
    return JSON.parse(JSON.stringify(defaultSiteData));
  }
}

function saveSiteData(data) {
  try {
    localStorage.setItem(SITE_STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Save failed:', e);
    return false;
  }
}

function deepMerge(target, source) {
  if (!source) return target;
  const out = Object.assign({}, target);
  Object.keys(source).forEach(k => {
    if (source[k] && typeof source[k] === 'object' && !Array.isArray(source[k])) {
      out[k] = deepMerge(target[k] || {}, source[k]);
    } else {
      out[k] = source[k];
    }
  });
  return out;
}

function generateId(prefix) {
  return prefix + '_' + Date.now() + '_' + Math.random().toString(36).substr(2,5);
}
