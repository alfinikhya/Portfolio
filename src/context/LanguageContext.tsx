import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'id';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const translations = {
  en: {
    // Navbar
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.testimonials': 'Testimonials',
    'nav.pricing': 'Pricing',
    'nav.faq': 'FAQ',
    'nav.getTemplate': 'Get Template',
    'nav.ownerStudio': '🔐 Owner Studio',
    'nav.cmsItems': 'CMS Items',

    // Hero
    'hero.badge': 'AVAILABILITY: Q3/Q4 PARTNERSHIPS OPEN',
    'hero.title.part1': 'On-Demand Design',
    'hero.title.part2': 'for',
    'hero.title.serif': 'Scaling Brands.',
    'hero.desc': 'Design subscription, made for those who move fast and scale faster.',
    'hero.btn.book': 'Book a Call',
    'hero.btn.pricing': 'See Pricing',
    'hero.metrics': '300+ Scaled Brands',
    'hero.clock.title': 'STUDIO LOCAL TIME',
    'hero.clock.desc': 'Operating live from our digital lab',
    'hero.design.title': 'DESIGN STANDARD',
    'hero.design.value': '99.8% Perfect',
    'hero.design.desc': 'Pixel-perfect Framer guidelines',
    'hero.partners.title': 'GLOBAL PARTNERS',
    'hero.partners.value': '40+ Scaling Techs',
    'hero.partners.desc': 'From VC startups to enterprise',

    // Marquee
    'marquee.title': 'TRUSTED BY VANGUARD COMPANIES',

    // About Us / Work Experience
    'about.indicator': '01 / WORK EXPERIENCE',
    'about.heading': 'A timeline of structured delivery and professional milestones.',
    'about.mission.title': 'Our Core Mission',
    'about.mission.text': 'We craft digital systems where performance meets unparalleled aesthetics. Guided by rigorous geometry, modern minimalist principles, and buttery-smooth animation mechanics, we build premium pipelines that convert everyday visitors into loyal collectors of your services.',
    'about.mission.footer': 'ESTABLISHED IN 2022',
    'about.geo.title': 'Geographic Focus',
    'about.geo.text': 'We are a remote-first studio anchored across Zürich, Switzerland (design coordination) & San Francisco, California (advanced interactive engineering). This dual-node sync ensures absolute high-fidelity results.',
    'about.geo.footer': 'ZÜRICH × SF',
    'about.vanguard.title': 'Vanguard Philosophy',
    'about.vanguard.text': 'We believe that design should never be treated as static decoration. Every border, margin, opacity level, and easing curve can serve as an intuitive guide for your customers.',
    'about.vanguard.footer': 'HUMAN INTERACTION',
    'about.eng.title': 'Engineering Core Competence',
    'about.eng.text': 'We develop fully optimized React interfaces, customized Framer integrations, and advanced vector loaders from scratch. Our codebases pass extreme audits for speed, access codes, and SEO crawlers before final deployment in Cloud containers.',
    'about.eng.footer': 'ZERO DEPENDENCY BLOAT',
    'about.interactive.heading': 'Interested in specifying our professional trajectories in real-time?',
    'about.interactive.body': 'Toggle our dynamic work experience database using the CMS Panel button in the navigation bar to insert, edit, or delete items instantly.',
    'about.interactive.btn': 'Launch Live Experience CMS',

    // Work Experience CMS Fields
    'experience.company': 'Company Name',
    'experience.role': 'Role / Job Title',
    'experience.duration': 'Duration / Tenure',
    'experience.description': 'Description & Responsibilities',
    'experience.tags': 'Skills & Tags (comma separated)',
    'experience.icon': 'Icon Visualizer Style',
    'experience.add': 'Add New Work Experience',
    'experience.save': 'Save Dynamic Experience',
    'experience.label': 'Work Experience Database',

    // Services
    'services.indicator': '02 / SERVICES',
    'services.heading': 'Delivering tactile digital products with surgical precision.',
    'services.desc': 'We don\'t do generic templates. We construct hyper-customized corporate portfolios, fast branding modules, and complex WebGL visual layers tailored to scale-up foundations.',
    'services.process.indicator': 'OUR PROCESS PILLARS',
    'services.process.heading': 'Honest execution, structured delivery.',
    'services.step1.title': 'Deep Discovery',
    'services.step1.text': 'Mapping organizational scopes, user archetypes, conversion tunnels, and interface benchmarks.',
    'services.step2.title': 'Interactive Canvas',
    'services.step2.text': 'Developing organic responsive models in high-fidelity Figma systems with complete component guidelines.',
    'services.step3.title': 'Fluid Engineering',
    'services.step3.text': 'Hand-coding clean React structures backed by framer-motion grids, lightweight modules, and SEO optimization.',
    'services.step4.title': 'Quality Assurance',
    'services.step4.text': 'Applying performance optimizations, accessibility checkers, and cloud-container pipeline deployment.',

    // Portfolio
    'portfolio.indicator': '03 / EXPERIENCIAL IMAGE LABS',
    'portfolio.heading': 'Infinite Fluid Galleries.',
    'portfolio.desc': 'Flexible geometric proportions side-by-side, scrolling continuously. Built dynamically for premium design collectors.',
    'portfolio.btn.owner': '🔐 Owner Customizer Mode',
    'portfolio.btn.owner.close': 'Close Owner Studio',
    'portfolio.publisher.title': 'Instant Image Publisher',
    'portfolio.publisher.desc': 'Publish customized assets directly into the infinite running rows.',
    'portfolio.label.image': 'Image Asset *',
    'portfolio.dragdrop.main': 'Drag & drop image file, or',
    'portfolio.dragdrop.browse': 'browse file',
    'portfolio.dragdrop.formats': 'Supports JPEG, PNG, WEBP',
    'portfolio.dragdrop.synced': '✔️ Local Image Synced',
    'portfolio.dragdrop.discard': 'Discard & reselect',
    'portfolio.label.ratio': 'Aspect Ratio Preset',
    'portfolio.label.cat': 'Category Tag',
    'portfolio.label.title': 'Title *',
    'portfolio.placeholder.title': 'e.g. Neo-Brutalist Portal',
    'portfolio.label.desc': 'Brief Description *',
    'portfolio.placeholder.desc': 'Enter specific parameters or artistic context of this study...',
    'portfolio.label.link': 'Website Link URL (Clickable destination)',
    'portfolio.btn.publish': '🚀 Publish Custom Case Study',
    'portfolio.speed.title': 'Active Runner Controllers',
    'portfolio.speed.subtitle': 'SPEED SYSTEM CALIBRATION',
    'portfolio.speed.row1': 'Row 1 Speed (Left)',
    'portfolio.speed.row1.desc': 'Drag to left for hyper speed, right for therapeutic slow.',
    'portfolio.speed.row2': 'Row 2 Speed (Right)',
    'portfolio.speed.row2.desc': 'Controls the reverse vector of lower row.',
    'portfolio.modify.title': 'MODIFY INDIVIDUAL GEOMETRIES & PURGE PROJECTS',
    'portfolio.modify.cycle': 'Cycle aspect ratio',
    'portfolio.warning': 'All items uploaded or resized here are stashed locally in your browser state, keeping load times incredibly fast. Your changes are live instantly in the horizontal tracks below!',
    'portfolio.indicator.tap': '💡 Tap on any artwork panel in the tracks to inspect details, explore links, or view interactive elements',
    'portfolio.modal.synopsis': 'CASE WORK SYNOPSIS',
    'portfolio.modal.coordinate': 'DESIGN COORDINATE',
    'portfolio.modal.status': 'DEPLOY STATUS',
    'portfolio.modal.explore': 'EXPLORE DEPLOYMENT URL',
    'portfolio.modal.return': 'Return to gallery',

    // Testimonials
    'testimonials.indicator': '04 / CLIENT VOICES',
    'testimonials.heading': 'Endorsed by industry leaders.',
    'testimonials.desc': 'Read direct statements from VP of products, creative directors, and founders who have scaled operations with our structures.',

    // FAQ
    'faq.indicator': '05 / COMMON QUESTIONS',
    'faq.heading': 'Clarifying our subscription guidelines.',
    'faq.desc': 'Transparent specifications on response ratios, custom asset production, and framework configurations.',

    // CTA / Pricing
    'cta.indicator': '06 / ENTRANCE GATE',
    'cta.heading': 'Ready to accelerate your brand footprint?',
    'cta.desc': 'Select an engagement speed below or request a high-fidelity introductory design review of your current interface.',
    'pricing.monthly.title': 'Monthly Subscription',
    'pricing.monthly.price': '$4,999/mo',
    'pricing.quarterly.title': 'Quarterly Bundle',
    'pricing.quarterly.price': '$12,999/3mo',
  },
  id: {
    // Navbar
    'nav.home': 'Beranda',
    'nav.services': 'Layanan',
    'nav.testimonials': 'Testimoni',
    'nav.pricing': 'Harga',
    'nav.faq': 'FAQ',
    'nav.getTemplate': 'Dapatkan Templat',
    'nav.ownerStudio': '🔐 Studio Pemilik',
    'nav.cmsItems': 'Item CMS',

    // Hero
    'hero.badge': 'KETERSEDIAAN: KELOMPOK KERJASAMA Q3/Q4 DIBUKA',
    'hero.title.part1': 'Desain Sesuai Kebutuhan',
    'hero.title.part2': 'untuk',
    'hero.title.serif': 'Merek yang Berkembang.',
    'hero.desc': 'Langganan desain, dibuat khusus untuk mereka yang bergerak cepat dan berkembang lebih cepat.',
    'hero.btn.book': 'Jadwalkan Panggilan',
    'hero.btn.pricing': 'Lihat Harga',
    'hero.metrics': '300+ Merek Berkembang',
    'hero.clock.title': 'WAKTU LOKAL STUDIO',
    'hero.clock.desc': 'Beroperasi langsung dari lab digital kami',
    'hero.design.title': 'STANDAR DESAIN',
    'hero.design.value': '99.8% Sempurna',
    'hero.design.desc': 'Panduan Framer yang pixel-perfect',
    'hero.partners.title': 'MITRA GLOBAL',
    'hero.partners.value': '40+ Tekno Berkembang',
    'hero.partners.desc': 'Dari startup VC hingga korporasi',

    // Marquee
    'marquee.title': 'DIPERCAYA OLEH PERUSAHAAN VANGUARD',

    // About Us / Work Experience
    'about.indicator': '01 / PENGALAMAN KERJA',
    'about.heading': 'Kronologi pengiriman terstruktur dan pencapaian profesional.',
    'about.mission.title': 'Misi Utama Kami',
    'about.mission.text': 'Kami merancang sistem digital di mana performa bertemu dengan estetika yang tak tertandingi. Didasari geometri yang ketat, prinsip minimalis modern, dan mekanika animasi super mulus, kami membangun alur premium yang mengubah pengunjung biasa menjadi kolektor setia layanan Anda.',
    'about.mission.footer': 'DIDIRIKAN PADA TAHUN 2022',
    'about.geo.title': 'Fokus Geografis',
    'about.geo.text': 'Kami adalah studio yang mengutamakan kerja jarak jauh, berbasis di Zürich, Swiss (koordinasi desain) & San Francisco, California (rekayasa interaktif tingkat lanjut). Sinkronisasi dua pusat ini memastikan hasil berkualitas paling tinggi.',
    'about.geo.footer': 'ZÜRICH × SF',
    'about.vanguard.title': 'Filosofi Vanguard',
    'about.vanguard.text': 'Kami percaya bahwa desain tidak boleh hanya dianggap sebagai dekorasi statis. Setiap tepi, margin, tingkat opasitas, dan kurva transisi dapat berfungsi sebagai panduan intuitif bagi pelanggan Anda.',
    'about.vanguard.footer': 'INTERAKSI MANUSIA',
    'about.eng.title': 'Kompetensi Inti Rekayasa',
    'about.eng.text': 'Kami mengembangkan antarmuka React yang dioptimalkan sepenuhnya, integrasi Framer kustom, dan pemuat vektor canggih dari awal. Kode kami lolos audit ketat untuk kecepatan, akses kode, dan perayap SEO sebelum diterapkan di kontainer Cloud.',
    'about.eng.footer': 'TANPA KENAIKAN BEBAN DEPENDENSI',
    'about.interactive.heading': 'Tertarik untuk menentukan lintasan profesional kami secara real-time?',
    'about.interactive.body': 'Aktifkan database pengalaman kerja kami melalui panel CMS untuk menyisipkan, mengedit, atau menghapus item secara instan.',
    'about.interactive.btn': 'Luncurkan CMS Pengalaman Langsung',

    // Work Experience CMS Fields
    'experience.company': 'Nama Perusahaan',
    'experience.role': 'Jabatan / Peran',
    'experience.duration': 'Durasi Masa Kerja',
    'experience.description': 'Deskripsi & Tanggung Jawab',
    'experience.tags': 'Keterampilan / Tag (pisahkan dengan koma)',
    'experience.icon': 'Gaya Visualisasi Ikon',
    'experience.add': 'Tambah Pengalaman Kerja Baru',
    'experience.save': 'Simpan Pengalaman Kerja',
    'experience.label': 'Database Pengalaman Kerja',

    // Services
    'services.indicator': '02 / LAYANAN',
    'services.heading': 'Menghadirkan produk digital taktil dengan presisi bedah.',
    'services.desc': 'Kami tidak menggunakan templat biasa. Kami membangun portofolio perusahaan yang sangat terkustomisasi, modul branding cepat, dan lapisan visual WebGL kompleks yang disesuaikan untuk skala bisnis Anda.',
    'services.process.indicator': 'PILAR PROSES KAMI',
    'services.process.heading': 'Eksekusi jujur, pengiriman terstruktur.',
    'services.step1.title': 'Penemuan Mendalam',
    'services.step1.text': 'Memetakan ruang lingkup organisasi, arketipe pengguna, terowongan konversi, dan tolok ukur antarmuka.',
    'services.step2.title': 'Kanvas Interaktif',
    'services.step2.text': 'Mengembangkan model responsif organik dalam sistem Figma dengan panduan komponen lengkap.',
    'services.step3.title': 'Rekayasa Fleksibel',
    'services.step3.text': 'Menulis struktur React yang bersih secara manual dengan grid framer-motion, modul ringan, dan optimasi SEO.',
    'services.step4.title': 'Jaminan Kualitas',
    'services.step4.text': 'Menerapkan optimasi kinerja, pemeriksa aksesibilitas, dan penyebaran jalur pipa kontainer cloud.',

    // Portfolio
    'portfolio.indicator': '03 / LABORATORIUM GAMBAR EKSPERIENSIAL',
    'portfolio.heading': 'Galeri Dinamis Tanpa Batas.',
    'portfolio.desc': 'Proporsi geometris yang fleksibel bersisian, bergulir terus menerus. Dibuat secara dinamis untuk para kolektor desain premium.',
    'portfolio.btn.owner': '🔐 Mode Kustomisasi Pemilik',
    'portfolio.btn.owner.close': 'Tutup Studio Pemilik',
    'portfolio.publisher.title': 'Penerbit Gambar Instan',
    'portfolio.publisher.desc': 'Kirim aset khusus secara langsung ke dalam baris tak terbatas yang terus berjalan.',
    'portfolio.label.image': 'Aset Gambar *',
    'portfolio.dragdrop.main': 'Seret & letakkan file gambar, atau',
    'portfolio.dragdrop.browse': 'telusuri file',
    'portfolio.dragdrop.formats': 'Mendukung JPEG, PNG, WEBP',
    'portfolio.dragdrop.synced': '✔️ Gambar Lokal Berhasil Disinkronkan',
    'portfolio.dragdrop.discard': 'Buang & pilih ulang',
    'portfolio.label.ratio': 'Prasetel Aspek Rasio',
    'portfolio.label.cat': 'Tag Kategori',
    'portfolio.label.title': 'Judul *',
    'portfolio.placeholder.title': 'misal: Portal Neo-Brutalist',
    'portfolio.label.desc': 'Deskripsi Singkat *',
    'portfolio.placeholder.desc': 'Masukkan parameter tertentu atau konteks artistik dari studi kasus ini...',
    'portfolio.label.link': 'Tautan URL Situs Web (Tujuan yang dapat diklik)',
    'portfolio.btn.publish': '🚀 Terbitkan Studi Kasus Ubahan',
    'portfolio.speed.title': 'Kontroler Pelari Aktif',
    'portfolio.speed.subtitle': 'KALIBRASI SISTEM KECEPATAN',
    'portfolio.speed.row1': 'Kecepatan Baris 1 (Kiri)',
    'portfolio.speed.row1.desc': 'Geser ke kiri untuk kecepatan sangat tinggi, ke kanan untuk perlambatan terapeutik.',
    'portfolio.speed.row2': 'Kecepatan Baris 2 (Kanan)',
    'portfolio.speed.row2.desc': 'Mengontrol arah balik vektor baris bawah.',
    'portfolio.modify.title': 'UBAH GEOMETRI INDIVIDUAL & HAPUS PROYEK',
    'portfolio.modify.cycle': 'Siklus rasio aspek',
    'portfolio.warning': 'Semua item yang diunggah atau diubah ukurannya di sini disimpan secara lokal di browser Anda, menjaga waktu pemuatan tetap sangat cepat. Perubahan Anda langsung aktif di trek horizontal di bawah!',
    'portfolio.indicator.tap': '💡 Ketuk panel karya seni mana saja di trek untuk memeriksa detail, menjelajahi tautan, atau melihat elemen interaktif',
    'portfolio.modal.synopsis': 'SINOPSIS STUDI KASUS',
    'portfolio.modal.coordinate': 'KOORDINAT DESAIN',
    'portfolio.modal.status': 'STATUS DEPLOY',
    'portfolio.modal.explore': 'JELAJAHI URL DEPLOYMENT',
    'portfolio.modal.return': 'Kembali ke galeri',

    // Testimonials
    'testimonials.indicator': '04 / SUARA KLIEN',
    'testimonials.heading': 'Dukungan penuh oleh para pemimpin industri.',
    'testimonials.desc': 'Baca pernyataan langsung dari VP produk, direktur kreatif, dan pendiri yang telah mengembangkan bisnis dengan struktur rancangan kami.',

    // FAQ
    'faq.indicator': '05 / PERTANYAAN UMUM',
    'faq.heading': 'Klarifikasi pedoman langganan kami.',
    'faq.desc': 'Spesifikasi transparan pada rasio respons, produksi aset khusus, dan konfigurasi framework.',

    // CTA / Pricing
    'cta.indicator': '06 / GERBANG MASUK',
    'cta.heading': 'Siap mempercepat jejak merek Anda?',
    'cta.desc': 'Pilih kecepatan keterlibatan di bawah ini atau minta tinjauan desain pengantar dengan fidelitas tinggi dari antarmuka Anda saat ini.',
    'pricing.monthly.title': 'Langganan Bulanan',
    'pricing.monthly.price': '$4.999/bln',
    'pricing.quarterly.title': 'Paket Triwulan',
    'pricing.quarterly.price': '$12.999/3bln',
  }
};

export const serviceTranslations = {
  en: {
    's1.title': 'Brand Identity',
    's1.description': 'We carve distinctive aesthetic styles with pristine typography guidelines, color theories, and conceptual structures that elevate your market presence.',
    's2.title': 'Interactive Web & Framer',
    's2.description': 'Bespoke front-end developments built on speed, interactive micro-animations, custom canvases, and seamless Framer layouts optimized for conversions.',
    's3.title': '3D & Immersive Motion',
    's3.description': 'High-fidelity three-dimensional animations and organic physics rigs that make products feel physical, tactile, and highly memorable.',
    's4.title': 'Mobile First Product Design',
    's4.description': 'Human-centric user interface designs rigorously designed across strict layout rhythms, responsive states, and intuitive task architectures.',
  },
  id: {
    's1.title': 'Identitas Merek',
    's1.description': 'Kami mengukir gaya estetika yang khas dengan panduan tipografi murni, teori warna, dan struktur konseptual yang meningkatkan kehadiran pasar Anda.',
    's2.title': 'Web Interaktif & Framer',
    's2.description': 'Pengembangan front-end pesanan khusus yang mengutamakan kecepatan, mikro-animasi interaktif, kanvas khusus, dan tata letak Framer mulus yang dioptimalkan untuk konversi.',
    's3.title': 'Gerak 3D & Imersif',
    's3.description': 'Animasi tiga dimensi dengan kesetiaan tinggi dan rig fisika organik yang membuat produk terasa nyata, taktil, dan sangat berkesan.',
    's4.title': 'Desain Produk Ramah Seluler',
    's4.description': 'Desain antarmuka pengguna yang berpusat pada manusia yang dirancang secara ketat di seluruh ritme tata letak, kondisi responsif, dan arsitektur tugas yang intuitif.',
  }
};

export const portfolioTranslations = {
  en: {
    'p1.title': 'Linea Dynamic System',
    'p1.description': 'A modular, high-fidelity landing architecture built on motion grid coordinates for modern fintech clients seeking pristine interactions.',
    'p1.category': 'Interactive Design',
    'p2.title': 'Solstice Luxury Brand',
    'p2.description': 'Elegant rebrand for a solar luxury lifestyle house, spanning high-fashion physical typography, stationery systems, and editorial packaging.',
    'p2.category': 'Brand Identity',
    'p3.title': 'Aether 3D Synthesizer',
    'p3.description': 'Interactive sound sculpting platform showcasing 3D WebGL soundwaves and tactile control knobs built directly on Web Audio specifications.',
    'p3.category': 'Immersive Dev',
    'p4.title': 'Hyperion Spatial Suite',
    'p4.description': 'A comprehensive visual interface suite designed for hardware interfaces, focusing on dynamic layouts and sleek high-contrast components.',
    'p4.category': 'UI/UX Design',
    'p5.title': 'Helix AI Research Portal',
    'p5.description': 'Next-gen analytics engine visualization interface representing complex sequence pathways with responsive, color-guided nodes.',
    'p5.category': 'Interactive Design',
    'p6.title': 'Krypton Physical Ledger',
    'p6.description': 'Branding and ergonomic engineering mockup series for a titanium cryptographic storage device built on tactical black metal surfaces.',
    'p6.category': 'Brand Identity',
  },
  id: {
    'p1.title': 'Sistem Dinamis Linea',
    'p1.description': 'Arsitektur pendaratan modular dengan fidelitas tinggi yang dibangun di atas koordinat kisi gerakan untuk klien fintech modern yang mencari interaksi murni.',
    'p1.category': 'Desain Interaktif',
    'p2.title': 'Merek Mewah Solstice',
    'p2.description': 'Rebranding elegan untuk gaya hidup mewah tenaga surya, mencakup tipografi fisik kelas atas, sistem alat tulis, dan kemasan editorial.',
    'p2.category': 'Identitas Merek',
    'p3.title': 'Sintesis 3D Aether',
    'p3.description': 'Platform pemahatan suara interaktif yang menampilkan gelombang suara WebGL 3D dan kenop kontrol taktil yang dibangun langsung sesuai spesifikasi Web Audio.',
    'p3.category': 'Pengembangan Imersif',
    'p4.title': 'Rangkaian Spasial Hyperion',
    'p4.description': 'Rangkaian antarmuka visual komprehensif yang dirancang untuk antarmuka perangkat keras, berfokus pada tata letak dinamis dan komponen kontras tinggi yang ramping.',
    'p4.category': 'Desain UI/UX',
    'p5.title': 'Portal Riset AI Helix',
    'p5.description': 'Antarmuka visualisasi mesin analitik generasi berikutnya yang merepresentasikan jalur rangkaian kompleks dengan node responsif berpanduan warna.',
    'p5.category': 'Desain Interaktif',
    'p6.title': 'Buku Besar Fisik Krypton',
    'p6.description': 'Seri mockup branding dan rekayasa ergonomis untuk perangkat penyimpanan kriptografi titanium yang dibangun di atas permukaan logam hitam taktis.',
    'p6.category': 'Identitas Merek',
  }
};

export const testimonialTranslations = {
  en: {
    't1.name': 'Sienna Sterling',
    't1.position': 'Creative Director',
    't1.company': 'Aether Labs',
    't1.testimonial': 'The level of interactive precision they brought to Solstice was unmatched. They did not just design a static layout; they handcrafted user experiences with flawless transitions. Absolute game-changers.',
    't2.name': 'Marcus Chen',
    't2.position': 'VP of Product',
    't2.company': 'Linea Financial',
    't2.testimonial': 'Most agencies build websites that look good only in design files. Working with this team felt like we were debugging high-speed software. Every Framer motion was butter-smooth and highly responsive.',
    't3.name': 'Elena Rostova',
    't3.position': 'Head of Marketing',
    't3.company': 'Novis Inc',
    't3.testimonial': 'They helped us transition from looking like a traditional tech startup to a premium luxury brand. Our conversion rates spiked by 42% after launching the new spatial interfaces.',
  },
  id: {
    't1.name': 'Sienna Sterling',
    't1.position': 'Direktur Kreatif',
    't1.company': 'Aether Labs',
    't1.testimonial': 'Tingkat presisi interaktif yang mereka bawakan ke Solstice tidak tertandingi. Mereka tidak hanya merancang tata letak statis; mereka membuat pengalaman pengguna secara manual dengan transisi yang sempurna. Benar-benar pengubah permainan.',
    't2.name': 'Marcus Chen',
    't2.position': 'Wakil Presiden Produk',
    't2.company': 'Linea Financial',
    't2.testimonial': 'Sebagian besar agensi membangun situs web yang hanya terlihat bagus di file desain. Bekerja dengan tim ini terasa seperti kami sedang merancang perangkat lunak berkecepatan tinggi. Setiap gerakan Framer terasa sangat halus dan sangat responsif.',
    't3.name': 'Elena Rostova',
    't3.position': 'Kepala Pemasaran',
    't3.company': 'Novis Inc',
    't3.testimonial': 'Mereka membantu kami bertransisi dari terlihat seperti startup teknologi tradisional menjadi merek mewah premium. Rasio konversi kami melonjak sebesar 42% setelah meluncurkan antarmuka spasial baru.',
  }
};

export const faqTranslations = {
  en: {
    'f0.question': 'How long does a customized premium design process take?',
    'f0.answer': 'A standard comprehensive design cycle takes between 4 to 8 weeks. This spans from our intense alignment meetings, interactive low-fidelity wireframing, custom motion guidelines, up to the full high-fidelity reactive web architecture.',
    'f1.question': 'Are the Framer templates self-servicing and CMS ready?',
    'f1.answer': 'Absolutely. Every layout we build utilizes standard CSS models and structured JSON states. Our CMS schema maps directly to Framer, enabling you or your content editors to publish new works, update case studies, and change team photos instantly.',
    'f2.question': 'Can you integrate custom WebGL, ThreeJS, or custom physics?',
    'f2.answer': 'Yes. We specialize in custom interactive front-ends. We can bundle lightweight Spline instances, native WebGL shaders, or canvas-based physics rigs that keep page load times fast while delivering breathtaking sensory feedback.',
    'f3.question': 'Do you offer post-launch optimization and SEO maintenance?',
    'f3.answer': 'We design websites with clean semantic HTML tags, pre-rendered metadata structures, and highly optimized image dimensions. After launching, we provide 3 months of analytical telemetry surveillance to guarantee maximum performance ratios.',
    'f4.question': 'What is your operational sweet-spot in terms of project size?',
    'f4.answer': 'We focus on premium boutique projects that demand immense detail and micro-interactive custom logic. We typically partner with luxury lifestyle houses, series-A tech foundations, and fast-growing creative platforms.',
  },
  id: {
    'f0.question': 'Berapa lama proses desain premium yang disesuaikan?',
    'f0.answer': 'Siklus desain komprehensif standar memakan waktu antara 4 hingga 8 minggu. Ini terbentang dari pertemuan penyelarasan intensif kami, pembuatan rangka gambar interaktif berfidelitas rendah, pedoman gerakan kustom, hingga arsitektur web reaktif fidelitas tinggi penuh.',
    'f1.question': 'Apakah templat Framer mandiri dan siap CMS?',
    'f1.answer': 'Sangat siap. Setiap tata letak yang kami bangun menggunakan model CSS standar dan kondisi JSON terstruktur. Skema CMS kami terpetakan langsung ke Framer, memungkinkan Anda atau penyunting konten Anda untuk menerbitkan karya baru, memperbarui studi kasus, dan mengubah foto tim secara instan.',
    'f2.question': 'Bisakah Anda mengintegrasikan WebGL kustom, ThreeJS, atau simulasi fisika kustom?',
    'f2.answer': 'Ya. Kami berspesialisasi dalam front-end interaktif kustom. Kami dapat menyatukan instans Spline ringan, shader WebGL bawaan, atau rig fisika berbasis kanvas yang menjaga waktu pemuatan halaman tetap cepat sekaligus memberikan umpan balik sensorik yang mendebarkan.',
    'f3.question': 'Apakah Anda menawarkan pengoptimalan pasca-peluncuran dan pemeliharaan SEO?',
    'f3.answer': 'Kami merancang situs web dengan tag HTML semantik yang bersih, struktur metadata yang dirender sebelumnya, dan dimensi gambar yang sangat dioptimalkan. Setelah diluncurkan, kami menyediakan pemantauan metrik analitis selama 3 bulan untuk menjamin rasio performa maksimal.',
    'f4.question': 'Berapa ukuran proyek yang paling cocok dengan operasional Anda?',
    'f4.answer': 'Kami fokus pada proyek butik premium yang menuntut detail luar biasa dan logika kustom mikro-interaktif. Kami biasanya bermitra dengan rumah gaya hidup mewah, yayasan teknologi seri-A, dan platform kreatif yang berkembang cepat.',
  }
};

export const experienceTranslations = {
  en: {
    'exp1.company': 'Linea Studio',
    'exp1.role': 'Lead Interactive Developer',
    'exp1.duration': '2024 - PRESENT',
    'exp1.description': 'Orchestrated premium UI structures, buttery-smooth React motion pipelines, and customized Framer components. Led design-engineering alignment to build lightning-fast web applications with zero visual lag.',
    'exp2.company': 'Aether Labs',
    'exp2.role': 'Senior UX Engineer',
    'exp2.duration': '2022 - 2024',
    'exp2.description': 'Designed and developed immersive three-dimensional spatial dashboards and sensory sound systems. Handcoded customized shaders and interactive canvas environments.',
    'exp3.company': 'Vanguard Corp',
    'exp3.role': 'Product Interaction Designer',
    'exp3.duration': '2020 - 2022',
    'exp3.description': 'Built high-contrast tactical design architectures and design systems from the absolute ground up. Optimized responsive layout conversions by over 45% using rigorous grid principles.',
    'exp4.company': 'Krypton Labs',
    'exp4.role': 'Frontend Developer',
    'exp4.duration': '2018 - 2020',
    'exp4.description': 'Maintained and optimized secure cryptographic wallet interfaces, creating highly accessible, pixel-perfect user journeys.',
  },
  id: {
    'exp1.company': 'Linea Studio',
    'exp1.role': 'Pengembang Interaktif Utama',
    'exp1.duration': '2024 - SEKARANG',
    'exp1.description': 'Mengorkestrasi struktur UI premium, alur gerakan React super mulus, dan komponen Framer kustom. Mempimpin keselarasan desain-rekayasa untuk membangan aplikasi web yang sangat cepat tanpa visual lag.',
    'exp2.company': 'Aether Labs',
    'exp2.role': 'Insinyur UX Senior',
    'exp2.duration': '2022 - 2024',
    'exp2.description': 'Merancang dan mengembangkan dasbor spasial tiga dimensi yang imersif dan sistem suara sensorik. Menulis kode shader kustom dan lingkungan kanvas interaktif secara manual.',
    'exp3.company': 'Vanguard Corp',
    'exp3.role': 'Desainer Interaksi Produk',
    'exp3.duration': '2020 - 2022',
    'exp3.description': 'Membangun arsitektur desain taktis kontras tinggi dan sistem desain dari nol. Mengoptimalkan konversi tata letak responsif hingga lebih dari 45% menggunakan prinsip grid yang ketat.',
    'exp4.company': 'Krypton Labs',
    'exp4.role': 'Pengembang Frontend',
    'exp4.duration': '2018 - 2020',
    'exp4.description': 'Memelihara dan mengoptimalkan antarmuka dompet kriptografi yang aman, menciptakan perjalanan pengguna ramah aksesibilitas dan piksel sempurna.',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('agency_vibe_lang');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('agency_vibe_lang', lang);
  };

  const t = (key: string): string => {
    const dict = translations[language];
    return (dict as any)[key] || (translations['en'] as any)[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
