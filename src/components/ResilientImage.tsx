import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  titleFallback?: string;
  className?: string;
  wrapperClassName?: string;
}

export function ResilientImage({
  src,
  alt,
  titleFallback,
  className = '',
  wrapperClassName = '',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50/60 border border-slate-200 text-slate-500 p-6 text-center ${wrapperClassName}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-3 text-slate-400">
          <ImageIcon className="w-5 h-5" aria-hidden="true" />
        </div>
        <p className="text-sm font-medium text-slate-700 max-w-xs">
          {titleFallback || alt}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
}
