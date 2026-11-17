import projectFintechImg from '../assets/images/project_fintech_app_1794882547991.jpg';
import projectDesignSystemImg from '../assets/images/project_design_system_1794882550041.jpg';
import projectWorkspaceImg from '../assets/images/project_workspace_analytics_1794882550147.jpg';
import projectCommerceImg from '../assets/images/project_commerce_editorial_1794882550189.jpg';

export type ProjectCategory = 'Semua' | 'Sistem Informasi' | 'Desain UI' | 'Aplikasi Web';

export interface ProjectItem {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'Semua'>;
  year: string;
  client: string;
  role: string;
  summary: string;
  problem: string;
  approach: string;
  impact: string;
  metrics: { label: string; value: string }[];
  image: string;
  imageAlt: string;
  featured?: boolean;
  deliverables: string[];
}

export interface PrincipleItem {
  id: string;
  number: string;
  title: string;
  summary: string;
  detail: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface EducationItem {
  period: string;
  institution: string;
  facultyOrMajor: string;
  location: string;
  status: string;
  description: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  highlight: string;
}

export interface TestimonialItem {
  quote: string;
  name: string;
  role: string;
  organization: string;
  outcome: string;
}

export const OWNER_PROFILE = {
  name: 'Meisi Akhmad Hidayat',
  shortName: 'Meisi Hidayat',
  role: 'Mahasiswa Sistem Informasi · Pengembang Web & Antarmuka',
  university: 'Universitas Komputama Majenang',
  faculty: 'Fakultas Sains dan Teknologi',
  major: 'Sistem Informasi (Angkatan 2026)',
  highSchool: 'SMK Sriwijaya Karangpucung — Jurusan Multimedia (Lulus 2024)',
  location: 'Majenang & Karangpucung, Cilacap',
  email: 'meisiakhmadhidayat7@gmail.com',
  availability: 'Terbuka untuk kolaborasi proyek web, magang, & riset kampus',
  portrait: '/assets/aistudio/WhatsApp_Image_2026-09-22_at_6.12.24_PM_9abd1dfa.jpeg',
  portraitAlt: 'Foto profil Meisi Akhmad Hidayat.',
  headline: 'Merancang sistem informasi dan antarmuka web yang rapi, cepat, dan mudah digunakan.',
  intro:
    'Nama saya Meisi Akhmad Hidayat, mahasiswa jurusan Sistem Informasi di Fakultas Sains dan Teknologi, Universitas Komputama Majenang (masuk 2026), serta lulusan Jurusan Multimedia di SMK Sriwijaya Karangpucung tahun 2024. Bekal visual multimedia dan pemahaman sistem informasi saya padukan untuk membangun web modern yang nyaman dipakai.',
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com', handle: 'linkedin.com/in/meisihidayat' },
    { label: 'GitHub', href: 'https://github.com', handle: 'github.com/meisihidayat' },
    { label: 'Instagram', href: 'https://instagram.com', handle: 'instagram.com/meisihidayat' },
  ],
};

export const HERO_METRICS = [
  { value: '2026', label: 'Mahasiswa Sistem Informasi, Universitas Komputama Majenang' },
  { value: '2024', label: 'Lulusan Jurusan Multimedia, SMK Sriwijaya Karangpucung' },
  { value: '10+ Karya', label: 'Proyek web, desain visual, dan prototipe sistem informasi' },
  { value: 'FST Unikma', label: 'Fakultas Sains dan Teknologi — fokus rekayasa web & data' },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'kas-umkm-majenang',
    title: 'Catatan Kas & Stok Harian UMKM',
    category: 'Sistem Informasi',
    year: '2026',
    client: 'Studi Kasus UMKM Lokal Majenang',
    role: 'Analisis Sistem & Pengembang Front-End',
    summary:
      'Aplikasi web pencatatan arus kas masuk, pengeluaran operasional, dan pemantauan stok barang bagi pelaku usaha kecil di sekitar Majenang.',
    problem:
      'Sebagian besar pemilik toko masih mencatat transaksi di buku tulis terpisah sehingga rekap bulanan memakan waktu lama dan rawan selisih stok.',
    approach:
      'Merancang alur input transaksi tiga langkah yang ringan di ponsel maupun laptop, dilengkapi ringkasan saldo otomatis dan grafik tren 7 hari.',
    impact:
      'Mempercepat proses rekap harian dari 30 menit menjadi kurang dari 5 menit dalam uji coba bersama tiga pemilik usaha ritel lokal.',
    metrics: [
      { label: 'Waktu Rekap', value: '< 5 menit' },
      { label: 'Uji Pengguna', value: '3 UMKM lokal' },
      { label: 'Kecepatan Muat', value: '97 Lighthouse' },
    ],
    image: projectFintechImg,
    imageAlt: 'Tampilan aplikasi pencatatan kas dan analitik keuangan pada laptop dan ponsel.',
    featured: true,
    deliverables: ['Diagram Alur Data', 'Desain Antarmuka', 'Implementasi React & TypeScript'],
  },
  {
    id: 'panduan-ui-aksara',
    title: 'Kit Komponen & Panduan Tipografi Web',
    category: 'Desain UI',
    year: '2025',
    client: 'Eksplorasi Mandiri Pasca-SMK',
    role: 'UI Designer & Front-End Builder',
    summary:
      'Kumpulan standar komponen tombol, formulir, tabel data, dan skala tipografi yang saya susun agar pengembangan berbagai proyek web lebih konsisten.',
    problem:
      'Saat mengerjakan proyek web berulang, penataan jarak, warna, dan ukuran huruf sering dibuat ulang dari nol sehingga tampilan antar-halaman tidak seragam.',
    approach:
      'Mendokumentasikan sistem grid 4px, palet warna kontras WCAG AA, dan komponen siap pakai menggunakan Tailwind CSS serta React.',
    impact:
      'Memangkas waktu penyusunan tata letak awal proyek baru hingga separuhnya dengan konsistensi visual yang terjaga.',
    metrics: [
      { label: 'Komponen Inti', value: '28 modul' },
      { label: 'Standar Kontras', value: 'WCAG AA' },
      { label: 'Efisiensi Setup', value: '2x lebih cepat' },
    ],
    image: projectDesignSystemImg,
    imageAlt: 'Dokumentasi tipografi dan spesifikasi komponen UI terbuka di atas meja kerja.',
    deliverables: ['Sistem Grid & Warna', 'Komponen Tailwind', 'Dokumentasi Pemakaian'],
  },
  {
    id: 'perencana-tugas-kuliah',
    title: 'Agenda Kuliah & Jadwal Proyek Tim',
    category: 'Aplikasi Web',
    year: '2026',
    client: 'Proyek Mahasiswa Sistem Informasi',
    role: 'Perancang UX & Pengembang Web',
    summary:
      'Aplikasi perencana mingguan untuk memetakan jadwal kuliah, tenggat tugas praktikum, dan pembagian peran kerja kelompok secara tertib.',
    problem:
      'Informasi tenggat tugas kelompok sering tenggelam di grup percakapan sehingga pembagian progres antar anggota tidak terlihat jelas.',
    approach:
      'Menghadirkan papan ringkas dengan tampilan kalender, daftar tugas prioritas, dan catatan dokumen terstruktur tanpa notifikasi berlebihan.',
    impact:
      'Digunakan oleh kelompok belajar untuk memantau seluruh tugas semester awal dengan visibilitas progres yang jelas.',
    metrics: [
      { label: 'Ketepatan Tugas', value: '100% tepat' },
      { label: 'Tampilan', value: 'Desktop & HP' },
      { label: 'Respon UI', value: '< 60 ms' },
    ],
    image: projectWorkspaceImg,
    imageAlt: 'Layar monitor menampilkan aplikasi perencana tugas dan jadwal kerja editorial.',
    deliverables: ['Pemetaan Kebutuhan', 'Desain Responsif', 'State Management React'],
  },
  {
    id: 'etalase-karya-karangpucung',
    title: 'Katalog Digital Kerajinan & Kopi Lokal',
    category: 'Aplikasi Web',
    year: '2024',
    client: 'Proyek Akhir & Portofolio SMK',
    role: 'Web Designer & Front-End Developer',
    summary:
      'Situs etalase digital bertema editorial untuk memperkenalkan produk kerajinan tangan dan hasil seduhan kopi lokal kepada pembeli daring.',
    problem:
      'Promosi produk lokal sebelumnya hanya mengandalkan unggahan foto acak tanpa informasi ukuran, harga, atau cerita pembuatnya.',
    approach:
      'Menyusun tata letak katalog yang bersih dengan fokus pada fotografi produk, detail spesifikasi singkat, dan tombol pemesanan langsung.',
    impact:
      'Menjadi proyek percontohan yang memperkuat fondasi keterampilan HTML, CSS, dan JavaScript sebelum melangkah ke jenjang kuliah.',
    metrics: [
      { label: 'Produk Terkatalog', value: '16 item' },
      { label: 'Skor Aksesibilitas', value: '96 / 100' },
      { label: 'Tahun Rilis', value: '2024' },
    ],
    image: projectCommerceImg,
    imageAlt: 'Tampilan situs katalog kerajinan dan kopi lokal pada perangkat tablet.',
    deliverables: ['Tata Letak Editorial', 'Katalog Responsif', 'Optimasi Gambar Web'],
  },
];

export const PRINCIPLES: PrincipleItem[] = [
  {
    id: 'analisis',
    number: '01.',
    title: 'Memahami Masalah Sebelum Menulis Kode',
    summary: 'Sebagai mahasiswa Sistem Informasi, saya memulai setiap proyek dengan memetakan alur data dan kebutuhan pengguna.',
    detail:
      'Teknologi terbaik adalah yang menjawab kebutuhan nyata di lapangan. Saya terbiasa menyusun struktur informasi yang jelas terlebih dahulu sebelum menentukan tampilan atau pustaka kode yang dipakai.',
  },
  {
    id: 'antarmuka',
    number: '02.',
    title: 'Antarmuka Bersih & Mudah Dipelajari',
    summary: 'Pengguna baru seharusnya langsung paham cara memakai aplikasi tanpa perlu membaca panduan panjang.',
    detail:
      'Saya menghindari elemen dekoratif yang membingungkan, menjaga kontras teks tetap nyaman dibaca, serta memastikan setiap tombol memberi umpan balik yang jelas.',
  },
  {
    id: 'belajar',
    number: '03.',
    title: 'Terus Bertumbuh dari Praktik Nyata',
    summary: 'Bekal Multimedia dari SMK Sriwijaya Karangpucung terus saya kembangkan di bangku kuliah Universitas Komputama Majenang.',
    detail:
      'Kepekaan visual yang saya pelajari di jurusan Multimedia kini berpadu dengan ilmu Sistem Informasi—membantu saya memperdalam TypeScript, arsitektur basis data, dan desain antarmuka web modern.',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Pengembangan Web & Front-End',
    items: ['HTML5 & CSS3 Modern', 'TypeScript & JavaScript', 'React & Vite', 'Tailwind CSS', 'Desain Web Responsif'],
  },
  {
    category: 'Sistem Informasi & Desain UI',
    items: ['Analisis Kebutuhan Sistem', 'Pemodelan Alur Data & ERD', 'Perancangan Antarmuka (Figma)', 'Wireframing & Prototipe', 'Dasar Basis Data SQL'],
  },
  {
    category: 'Dasar Multimedia & Produksi Visual',
    items: ['Desain Grafis & Tata Letak', 'Pengolahan Aset Visual Digital', 'Tipografi Web', 'Git & Dokumentasi Teknis'],
  },
];

export const EDUCATIONS: EducationItem[] = [
  {
    period: '2026 — Sekarang',
    institution: 'Universitas Komputama Majenang',
    facultyOrMajor: 'Fakultas Sains dan Teknologi · Jurusan Sistem Informasi',
    location: 'Majenang, Cilacap, Jawa Tengah',
    status: 'Mahasiswa Aktif (Masuk 2026)',
    description:
      'Menempuh pendidikan tinggi di bidang Sistem Informasi untuk memperdalam analisis proses bisnis, perancangan basis data, dan rekayasa sistem perangkat lunak.',
  },
  {
    period: 'Lulus 2024',
    institution: 'SMK Sriwijaya Karangpucung',
    facultyOrMajor: 'Jurusan Multimedia',
    location: 'Karangpucung, Cilacap, Jawa Tengah',
    status: 'Alumni Tahun 2024',
    description:
      'Menyelesaikan pendidikan kejuruan di Jurusan Multimedia dengan fokus desain grafis, komposisi visual, pengolahan media digital, dan dasar pembuatan halaman web.',
  },
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: '2026 — Sekarang',
    role: 'Mahasiswa & Pembangun Proyek Mandiri',
    company: 'Universitas Komputama Majenang',
    location: 'Majenang, Cilacap',
    highlight:
      'Aktif mengeksplorasi studi kasus sistem informasi kampus serta merancang aplikasi web berbasis React dan TypeScript.',
  },
  {
    period: '2024 — 2026',
    role: 'Pengembang Web Lepas & Eksplorasi Desain UI',
    company: 'Proyek Mandiri & UMKM Lokal',
    location: 'Karangpucung & Majenang',
    highlight:
      'Membantu pembuatan landing page, katalog digital usaha kecil, dan memperdalam arsitektur antarmuka setelah lulus dari SMK Sriwijaya Karangpucung.',
  },
];

export const TESTIMONIAL: TestimonialItem = {
  quote:
    'Meisi telaten menerjemahkan kebutuhan catatan harian toko kami ke dalam tampilan web yang sederhana. Karyawan yang sebelumnya hanya terbiasa mencatat di kertas langsung bisa memakainya tanpa kebingungan.',
  name: 'Hendra Wijaya',
  role: 'Pemilik Usaha',
  organization: 'Toko Sembako & Ritel Mitra Majenang',
  outcome: 'Rekap penjualan dan stok harian menjadi lebih tertata dan mudah dicek dari ponsel',
};
