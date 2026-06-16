'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

interface FileDropzoneProps {
  files: File[];
  onChange: (files: File[]) => void;
}

export function FileDropzone({ files, onChange }: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Create and revoke object URLs
  useEffect(() => {
    const urls = files.map(f => URL.createObjectURL(f));
    setPreviews(urls);
    return () => urls.forEach(url => URL.revokeObjectURL(url));
  }, [files]);

  const validateAndAdd = useCallback((incoming: FileList | null) => {
    if (!incoming) return;
    setError(null);
    const valid: File[] = [];

    for (let i = 0; i < incoming.length; i++) {
      const file = incoming[i];
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError(`"${file.name}" is not a valid image. Use JPEG, PNG, GIF, or WebP.`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError(`"${file.name}" is too large. Maximum file size is 5MB.`);
        return;
      }
      valid.push(file);
    }

    onChange([...files, ...valid].slice(0, 3)); // Max 3 files
  }, [files, onChange]);

  const removeFile = useCallback((index: number) => {
    onChange(files.filter((_, i) => i !== index));
  }, [files, onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    validateAndAdd(e.dataTransfer.files);
  }, [validateAndAdd]);

  return (
    <div>
      <label className="block text-sm font-medium text-ink mb-2">
        Attachments <span className="text-muted font-normal">(optional, max 3 images, 5MB each)</span>
      </label>

      {/* Drop zone */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-colors cursor-pointer ${
          isDragging ? 'border-primary bg-primary/5' : 'border-line hover:border-primary/50'
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
        aria-label="Upload images"
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={(e) => validateAndAdd(e.target.files)}
        />
        <svg className="w-8 h-8 mx-auto text-muted mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="text-sm text-body">
          <span className="font-semibold text-primary">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-muted mt-1">JPEG, PNG, GIF, WebP up to 5MB</p>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <m.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-red-500 text-xs mt-1"
          >
            {error}
          </m.p>
        )}
      </AnimatePresence>

      {/* Previews */}
      {previews.length > 0 && (
        <div className="flex gap-3 mt-3">
          {previews.map((url, i) => (
            <div key={i} className="relative group w-16 h-16 rounded-xl overflow-hidden border border-line">
              <img src={url} alt={`Upload ${i + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeFile(i); }}
                className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                aria-label={`Remove file ${i + 1}`}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
