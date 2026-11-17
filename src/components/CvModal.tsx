import { useEffect, useState } from 'react';
import { Check, Copy, Printer, X } from 'lucide-react';
import { EDUCATIONS, EXPERIENCES, OWNER_PROFILE, SKILL_GROUPS } from '../data/portfolioData';

interface CvModalProps {
  open: boolean;
  onClose: () => void;
}

export function CvModal({ open, onClose }: CvModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleCopySummary = async () => {
    const summaryText = [
      `${OWNER_PROFILE.name} — ${OWNER_PROFILE.role}`,
      `${OWNER_PROFILE.university} (${OWNER_PROFILE.faculty}, ${OWNER_PROFILE.major})`,
      `${OWNER_PROFILE.highSchool}`,
      `${OWNER_PROFILE.location} | ${OWNER_PROFILE.email}`,
      '',
      'Pendidikan:',
      ...EDUCATIONS.map((ed) => `- ${ed.period}: ${ed.institution} — ${ed.facultyOrMajor}`),
      '',
      'Aktivitas & Pengalaman:',
      ...EXPERIENCES.map((e) => `- ${e.period}: ${e.role} di ${e.company} (${e.highlight})`),
    ].join('\n');

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-slate-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-slate-200 no-print">
          <span className="text-sm font-medium text-slate-600">Ringkasan Riwayat Hidup</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopySummary}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200/70 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-blue-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Tersalin' : 'Salin Teks'}</span>
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak / Simpan PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup ringkasan CV"
              className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-10 space-y-8">
          <div className="border-b border-slate-200 pb-6 space-y-2">
            <h2 id="cv-modal-title" className="font-display text-2xl sm:text-3xl font-bold text-slate-900">
              {OWNER_PROFILE.name}
            </h2>
            <p className="text-sm font-medium text-blue-600">{OWNER_PROFILE.role}</p>
            <p className="text-xs text-slate-500">
              {OWNER_PROFILE.location} · {OWNER_PROFILE.email}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">Profil Singkat</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{OWNER_PROFILE.intro}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">Riwayat Pendidikan</h3>
            <div className="divide-y divide-slate-200">
              {EDUCATIONS.map((edu) => (
                <div key={edu.institution} className="py-4 first:pt-0 last:pb-0 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <p className="text-sm font-semibold text-slate-900">
                      {edu.institution}
                    </p>
                    <span className="font-mono tabular-nums text-xs text-slate-500">{edu.period}</span>
                  </div>
                  <p className="text-xs font-medium text-blue-600">{edu.facultyOrMajor}</p>
                  <p className="text-xs text-slate-500">{edu.location}</p>
                  <p className="text-sm text-slate-600 leading-relaxed pt-1">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">Aktivitas & Pengalaman Proyek</h3>
            <div className="divide-y divide-slate-200">
              {EXPERIENCES.map((exp) => (
                <div key={exp.period} className="py-4 first:pt-0 last:pb-0 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <p className="text-sm font-semibold text-slate-900">
                      {exp.role} · {exp.company}
                    </p>
                    <span className="font-mono tabular-nums text-xs text-slate-500">{exp.period}</span>
                  </div>
                  <p className="text-xs text-slate-500">{exp.location}</p>
                  <p className="text-sm text-slate-600 leading-relaxed pt-1">{exp.highlight}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">Kompetensi Utama</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {SKILL_GROUPS.map((group) => (
                <div key={group.category} className="space-y-2">
                  <p className="text-xs font-semibold text-slate-800">{group.category}</p>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
