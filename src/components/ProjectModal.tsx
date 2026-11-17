import { useEffect } from 'react';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';
import { ProjectItem } from '../data/portfolioData';
import { ResilientImage } from './ResilientImage';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  hasPrev: boolean;
  hasNext: boolean;
}

export function ProjectModal({
  project,
  onClose,
  onNavigate,
  hasPrev,
  hasNext,
}: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate('prev');
      if (e.key === 'ArrowRight' && hasNext) onNavigate('next');
    };
    window.addEventListener('keydown', onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [project, onClose, onNavigate, hasPrev, hasNext]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-slate-200 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar inside modal */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-white/95 backdrop-blur-sm border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium truncate">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums">{project.year}</span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{project.client}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup studi kasus"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-8">
          {/* Header & Title */}
          <div className="space-y-3">
            <h2
              id="modal-project-title"
              className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 [text-wrap:balance]"
            >
              {project.title}
            </h2>
            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              {project.summary}
            </p>
            <p className="text-xs text-slate-500 pt-1">
              Peran: <span className="text-slate-800 font-medium">{project.role}</span>
            </p>
          </div>

          {/* High-res Visual */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 aspect-[16/10]">
            <ResilientImage
              src={project.image}
              alt={project.imageAlt}
              titleFallback={project.title}
              className="w-full h-full object-cover"
              wrapperClassName="w-full h-full"
            />
          </div>

          {/* Measured Outcomes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-6 border-y border-slate-200">
            {project.metrics.map((metric) => (
              <div key={metric.label} className="space-y-1">
                <p className="font-mono tabular-nums text-2xl font-semibold text-slate-900">
                  {metric.value}
                </p>
                <p className="text-xs text-slate-500">{metric.label}</p>
              </div>
            ))}
          </div>

          {/* Case Study Narrative */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-900">Tantangan</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{project.problem}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-900">Pendekatan</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{project.approach}</p>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-900">Dampak Nyata</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{project.impact}</p>
            </div>
          </div>

          {/* Deliverables (unboxed typographic separation) */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              <span className="font-medium text-slate-700 mr-2">Lingkup Kerja:</span>
              {project.deliverables.join(' · ')}
            </div>
          </div>

          {/* Prev / Next Navigation */}
          <div className="pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => onNavigate('prev')}
              disabled={!hasPrev}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Karya Sebelumnya</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('next')}
              disabled={!hasNext}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Karya Berikutnya</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
