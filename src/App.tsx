import { FormEvent, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  FileText,
  Mail,
  Send,
} from 'lucide-react';
import { Header } from './components/Header';
import { ResilientImage } from './components/ResilientImage';
import { ProjectModal } from './components/ProjectModal';
import { CvModal } from './components/CvModal';
import {
  EDUCATIONS,
  EXPERIENCES,
  HERO_METRICS,
  OWNER_PROFILE,
  PRINCIPLES,
  ProjectCategory,
  ProjectItem,
  PROJECTS,
  SKILL_GROUPS,
  TESTIMONIAL,
} from './data/portfolioData';

const CATEGORIES: ProjectCategory[] = ['Semua', 'Sistem Informasi', 'Desain UI', 'Aplikasi Web'];

const PROJECT_TOPICS = [
  'Pembuatan Website',
  'Proyek Sistem Informasi',
  'Kolaborasi Tugas / Riset',
  'Peluang Magang',
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('Semua');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activePrincipleId, setActivePrincipleId] = useState<string>(PRINCIPLES[0].id);
  const [cvModalOpen, setCvModalOpen] = useState(false);

  const [emailCopied, setEmailCopied] = useState(false);

  // Contact form state
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(PROJECT_TOPICS[0]);
  const [messageText, setMessageText] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedMessage, setSubmittedMessage] = useState<{
    name: string;
    email: string;
    topic: string;
    message: string;
  } | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'Semua') return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const activePrinciple = useMemo(
    () => PRINCIPLES.find((p) => p.id === activePrincipleId) ?? PRINCIPLES[0],
    [activePrincipleId]
  );

  const selectedIndex = selectedProject
    ? filteredProjects.findIndex((p) => p.id === selectedProject.id)
    : -1;

  const handleNavigateModal = (direction: 'prev' | 'next') => {
    if (selectedIndex < 0) return;
    const nextIdx = direction === 'prev' ? selectedIndex - 1 : selectedIndex + 1;
    if (nextIdx >= 0 && nextIdx < filteredProjects.length) {
      setSelectedProject(filteredProjects[nextIdx]);
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(OWNER_PROFILE.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      setEmailCopied(false);
    }
  };

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    const trimmedName = senderName.trim();
    const trimmedEmail = senderEmail.trim();
    const trimmedMessage = messageText.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setFormError('Mohon lengkapi nama, alamat email, dan ringkasan kebutuhan Anda.');
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
    if (!emailValid) {
      setFormError('Format alamat email belum valid. Contoh: nama@perusahaan.com');
      return;
    }

    setSubmittedMessage({
      name: trimmedName,
      email: trimmedEmail,
      topic: selectedTopic,
      message: trimmedMessage,
    });
    setSenderName('');
    setSenderEmail('');
    setMessageText('');
  };

  const scrollToProjects = () => {
    document.querySelector('#karya')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div id="beranda" className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      <Header />

      <main className="flex-1">
        {/* SECTION 1: SPLIT-SCREEN HERO + FULL-WIDTH KPI STRIP */}
        <section className="max-w-6xl mx-auto px-6 pt-12 pb-14 md:pt-16 md:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Typographic Column */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-8 py-2">
              <div className="space-y-6">
                <p className="text-sm font-medium text-slate-500">
                  {OWNER_PROFILE.role} <span aria-hidden="true">·</span> {OWNER_PROFILE.location}
                </p>

                <h1 className="font-display text-[clamp(2.25rem,4.2vw,3.65rem)] font-bold leading-[1.08] tracking-tight text-slate-900 [text-wrap:balance]">
                  {OWNER_PROFILE.headline}
                </h1>

                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                  {OWNER_PROFILE.intro}
                </p>
              </div>

              <div className="space-y-6 pt-2">
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={scrollToProjects}
                    className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 active:scale-[0.99] transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 cursor-pointer"
                  >
                    <span>Jelajahi Karya Pilihan</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setCvModalOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-slate-500" aria-hidden="true" />
                    <span>Lihat Ringkasan CV</span>
                  </button>
                </div>

                <p className="text-xs text-slate-500">
                  {OWNER_PROFILE.availability}
                </p>
              </div>
            </div>

            {/* Right Portrait Visual Container matching split height */}
            <div className="lg:col-span-5">
              <div className="h-80 sm:h-96 lg:h-full min-h-[380px] rounded-2xl overflow-hidden border border-slate-200 bg-white">
                <ResilientImage
                  src={OWNER_PROFILE.portrait}
                  alt={OWNER_PROFILE.portraitAlt}
                  titleFallback={OWNER_PROFILE.name}
                  className="w-full h-full object-cover object-[50%_20%]"
                  wrapperClassName="w-full h-full"
                />
              </div>
            </div>
          </div>

          {/* Full-width 4-Column KPI Strip directly below Hero Split */}
          <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-8">
            {HERO_METRICS.map((metric) => (
              <div key={metric.value} className="space-y-1.5">
                <p className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tabular-nums tracking-tight">
                  {metric.value}
                </p>
                <p className="text-xs sm:text-sm text-slate-600 leading-snug">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SUBTLE EDITORIAL MARQUEE DIVIDER */}
        <div
          className="border-y border-slate-200 bg-white py-3.5 overflow-hidden select-none"
          aria-hidden="true"
        >
          <div className="animate-editorial-marquee text-xs font-medium text-slate-500 tracking-wide">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex items-center gap-8 pr-8 whitespace-nowrap">
                <span>Sistem Informasi</span>
                <span>·</span>
                <span>Universitas Komputama Majenang</span>
                <span>·</span>
                <span>Fakultas Sains dan Teknologi</span>
                <span>·</span>
                <span>SMK Sriwijaya Karangpucung</span>
                <span>·</span>
                <span>Pengembangan Web Modern</span>
                <span>·</span>
                <span>Sistem Informasi</span>
                <span>·</span>
                <span>Universitas Komputama Majenang</span>
                <span>·</span>
                <span>Fakultas Sains dan Teknologi</span>
                <span>·</span>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: KARYA PILIHAN (BENTO GRID + INTERACTIVE FILTER) */}
        <section id="karya" className="max-w-6xl mx-auto px-6 py-16 md:py-24 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
                Karya Pilihan
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Pilihan studi kasus yang memadukan riset masalah, struktur antarmuka, dan kode produksi. Klik kartu untuk membaca rincian prosesnya.
              </p>
            </div>

            {/* Interactive Segmented Filter Control (functional buttons) */}
            <div
              role="group"
              aria-label="Filter kategori karya"
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-xl self-start md:self-auto"
            >
              {CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={isActive}
                    className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                      isActive
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => {
              const isFeaturedLayout = activeCategory === 'Semua' && idx === 0;
              return (
                <article
                  key={project.id}
                  className={`group bg-white rounded-2xl border border-slate-200 overflow-hidden transition-colors duration-200 hover:border-slate-300 flex flex-col ${
                    isFeaturedLayout ? 'md:col-span-2 lg:col-span-2' : ''
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="text-left flex flex-col flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-600 cursor-pointer"
                  >
                    <div
                      className={`w-full overflow-hidden bg-slate-100 border-b border-slate-100 ${
                        isFeaturedLayout ? 'aspect-[16/9]' : 'aspect-[4/3]'
                      }`}
                    >
                      <ResilientImage
                        src={project.image}
                        alt={project.imageAlt}
                        titleFallback={project.title}
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.02]"
                        wrapperClassName="w-full h-full"
                      />
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                      <div className="space-y-2.5">
                        {/* Clean unboxed metadata (Zero-Pill Rule) */}
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span>{project.category}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">{project.year}</span>
                          <span aria-hidden="true">·</span>
                          <span className="truncate">{project.client}</span>
                        </div>

                        <h3 className="font-display text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors [text-wrap:balance]">
                          {project.title}
                        </h3>

                        <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                          {project.summary}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                        <span className="font-mono tabular-nums text-xs font-medium text-slate-700">
                          {project.metrics[0]?.value} · {project.metrics[0]?.label}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 whitespace-nowrap shrink-0">
                          <span>Baca Studi Kasus</span>
                          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </div>
                    </div>
                  </button>
                </article>
              );
            })}
          </div>
        </section>

        {/* SECTION 3: TENTANG & PRINSIP KERJA */}
        <section
          id="tentang"
          className="border-t border-slate-200 bg-white py-16 md:py-24"
        >
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Column: Bio & Interactive Working Principles */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-4 max-w-2xl">
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
                  Dari Jurusan Multimedia menuju rekayasa sistem informasi.
                </h2>
                <p className="text-base text-slate-600 leading-relaxed">
                  Setelah lulus dari Jurusan Multimedia di SMK Sriwijaya Karangpucung pada tahun 2024, saya melanjutkan kuliah pada tahun 2026 di Fakultas Sains dan Teknologi, Universitas Komputama Majenang, mengambil jurusan Sistem Informasi. Perpaduan kepekaan visual multimedia dan analisis sistem ini membentuk cara saya merancang aplikasi web yang rapi dan terarah.
                </p>
              </div>

              {/* Interactive Principle Tabs */}
              <div className="space-y-5">
                <p className="text-xs font-semibold text-slate-500">
                  Tiga Prinsip Kerja
                </p>

                <div
                  role="tablist"
                  aria-label="Prinsip kerja"
                  className="flex flex-wrap gap-2 border-b border-slate-200 pb-3"
                >
                  {PRINCIPLES.map((principle) => {
                    const isActive = principle.id === activePrinciple.id;
                    return (
                      <button
                        key={principle.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActivePrincipleId(principle.id)}
                        className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                          isActive
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70'
                        }`}
                      >
                        <span className="font-mono tabular-nums mr-1.5 opacity-75">
                          {principle.number}
                        </span>
                        {principle.title.split(' ')[0]} {principle.title.split(' ')[1]}
                      </button>
                    );
                  })}
                </div>

                <div role="tabpanel" className="pt-2 space-y-3 max-w-2xl">
                  <h3 className="font-display text-xl font-bold text-slate-900">
                    {activePrinciple.number} {activePrinciple.title}
                  </h3>
                  <p className="text-base font-medium text-slate-800 leading-relaxed">
                    {activePrinciple.summary}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {activePrinciple.detail}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Structured Skills Directory (clean hairline dividers, no pill clutter) */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-slate-900">
                  Fokus Keahlian
                </h3>
                <p className="text-sm text-slate-500">
                  Perangkat dan disiplin yang saya gunakan sehari-hari.
                </p>
              </div>

              <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
                {SKILL_GROUPS.map((group) => (
                  <div key={group.category} className="py-5 space-y-2.5">
                    <h4 className="text-sm font-semibold text-slate-900">
                      {group.category}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {group.items.join(' · ')}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: PENDIDIKAN, PENGALAMAN & TESTIMONI */}
        <section id="pendidikan" className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Education & Experience Timeline */}
            <div className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h2 className="font-display text-3xl font-bold tracking-tight text-slate-900">
                    Jejak Pendidikan
                  </h2>
                  <p className="text-sm sm:text-base text-slate-600">
                    Latar belakang akademik yang membentuk dasar sistem informasi dan teknologi web saya.
                  </p>
                </div>

                <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
                  {EDUCATIONS.map((edu) => (
                    <div
                      key={edu.institution}
                      className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6"
                    >
                      <div className="sm:col-span-4 space-y-1">
                        <p className="font-mono tabular-nums text-xs font-medium text-slate-500">
                          {edu.period}
                        </p>
                        <p className="text-xs text-slate-500">{edu.location}</p>
                      </div>
                      <div className="sm:col-span-8 space-y-1.5">
                        <h3 className="text-base font-semibold text-slate-900">
                          {edu.institution}
                        </h3>
                        <p className="text-sm font-medium text-blue-600">
                          {edu.facultyOrMajor}
                        </p>
                        <p className="text-xs text-slate-500">{edu.status}</p>
                        <p className="text-sm text-slate-600 leading-relaxed pt-1">
                          {edu.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-slate-900">
                    Aktivitas & Pengalaman Proyek
                  </h3>
                </div>

                <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
                  {EXPERIENCES.map((exp) => (
                    <div
                      key={exp.period}
                      className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6"
                    >
                      <div className="sm:col-span-4 space-y-1">
                        <p className="font-mono tabular-nums text-xs font-medium text-slate-500">
                          {exp.period}
                        </p>
                        <p className="text-xs text-slate-500">{exp.location}</p>
                      </div>
                      <div className="sm:col-span-8 space-y-1.5">
                        <h4 className="text-base font-semibold text-slate-900">
                          {exp.role}
                        </h4>
                        <p className="text-sm font-medium text-blue-600">
                          {exp.company}
                        </p>
                        <p className="text-sm text-slate-600 leading-relaxed pt-1">
                          {exp.highlight}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Adjacent Attributable Testimonial */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200 p-7 sm:p-8 space-y-6">
                <p className="text-xs font-semibold text-slate-500">
                  Ulasan Pengguna Proyek
                </p>

                <blockquote className="text-base text-slate-800 leading-relaxed">
                  “{TESTIMONIAL.quote}”
                </blockquote>

                <div className="pt-5 border-t border-slate-200 space-y-2">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      {TESTIMONIAL.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {TESTIMONIAL.role} · {TESTIMONIAL.organization}
                    </p>
                  </div>
                  <p className="text-xs font-medium text-blue-600">
                    Hasil: {TESTIMONIAL.outcome}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: KONTAK & KOLABORASI */}
        <section
          id="kontak"
          className="border-t border-slate-200 bg-white py-16 md:py-24"
        >
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 [text-wrap:balance]">
                  Mari terhubung untuk kolaborasi atau proyek baru.
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Saya terbuka untuk kolaborasi proyek web, pengembangan sistem informasi usaha lokal, kegiatan kampus, maupun peluang magang di bidang teknologi dan desain antarmuka.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-slate-500">Email Langsung</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={`mailto:${OWNER_PROFILE.email}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      <Mail className="w-4 h-4 text-slate-400" aria-hidden="true" />
                      <span>{OWNER_PROFILE.email}</span>
                    </a>
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/70 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                    >
                      {emailCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-blue-600" aria-hidden="true" />
                          <span>Email disalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 space-y-2">
                  <p className="text-xs font-medium text-slate-500">Tautan Profil</p>
                  <div className="flex flex-wrap items-center gap-5 text-sm font-medium">
                    {OWNER_PROFILE.socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1 text-slate-700 hover:text-blue-600 transition-colors"
                      >
                        <span>{social.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 sm:p-8">
                {submittedMessage ? (
                  <div className="space-y-6 py-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                      <Check className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display text-2xl font-bold text-slate-900">
                        Terima kasih, {submittedMessage.name}.
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        Pesan Anda mengenai <span className="font-medium text-slate-900">{submittedMessage.topic}</span> telah tercatat. Balasan akan dikirimkan ke <span className="font-medium text-slate-900">{submittedMessage.email}</span> dalam 1–2 hari kerja.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-white border border-slate-200 text-sm text-slate-600">
                      “{submittedMessage.message}”
                    </div>
                    <button
                      type="button"
                      onClick={() => setSubmittedMessage(null)}
                      className="px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      Kirim Pesan Lainnya
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-semibold text-slate-700"
                        >
                          Nama Lengkap
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          value={senderName}
                          onChange={(e) => setSenderName(e.target.value)}
                          placeholder="Contoh: Nadya Larasati"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-semibold text-slate-700"
                        >
                          Alamat Email
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={senderEmail}
                          onChange={(e) => setSenderEmail(e.target.value)}
                          placeholder="nadya@perusahaan.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <span className="block text-xs font-semibold text-slate-700">
                        Topik Diskusi
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {PROJECT_TOPICS.map((topic) => {
                          const isSelected = selectedTopic === topic;
                          return (
                            <button
                              key={topic}
                              type="button"
                              onClick={() => setSelectedTopic(topic)}
                              aria-pressed={isSelected}
                              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                                isSelected
                                  ? 'bg-blue-600 text-white border-blue-600'
                                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-900'
                              }`}
                            >
                              {topic}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold text-slate-700"
                      >
                        Ringkasan Kebutuhan
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Ceritakan konteks produk, target waktu, atau hal yang ingin kita bahas..."
                        className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent resize-y"
                      />
                    </div>

                    {formError && (
                      <p role="alert" className="text-xs font-medium text-rose-600">
                        {formError}
                      </p>
                    )}

                    <div className="flex items-center justify-between gap-4 pt-1">
                      <p className="text-xs text-slate-500">
                        Respons rata-rata dalam 24 jam kerja.
                      </p>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:scale-[0.99] transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                      >
                        <span>Kirim Pesan</span>
                        <Send className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET EDITORIAL FOOTER */}
      <footer className="border-t border-slate-200 bg-[#F8FAFC] py-8 no-print">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 {OWNER_PROFILE.name}. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-6">
            <span>{OWNER_PROFILE.location}</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="font-medium text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
            >
              Kembali ke Atas
            </button>
          </div>
        </div>
      </footer>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onNavigate={handleNavigateModal}
        hasPrev={selectedIndex > 0}
        hasNext={selectedIndex >= 0 && selectedIndex < filteredProjects.length - 1}
      />

      <CvModal open={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </div>
  );
}
