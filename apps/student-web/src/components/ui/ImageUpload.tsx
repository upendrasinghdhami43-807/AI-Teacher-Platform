import React, { useRef, useState } from 'react';
import { Image as ImageIcon, X, UploadCloud } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  images: File[];
  onChange: (images: File[]) => void;
  maxImages?: number;
  className?: string;
}

export default function ImageUpload({ images, onChange, maxImages = 3, className }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles = Array.from(files).filter(f => f.type.startsWith('image/'));
    const combined = [...images, ...newFiles];
    if (combined.length > maxImages) {
      onChange(combined.slice(0, maxImages));
    } else {
      onChange(combined);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div className={cn('space-y-3', className)}>
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative w-20 h-20 rounded-lg overflow-hidden border border-border group bg-bg-elevated">
              <img
                src={URL.createObjectURL(img)}
                alt={`Upload ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length < maxImages && (
        <div
          className={cn(
            'border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors',
            dragActive ? 'border-primary-500 bg-primary-500/10' : 'border-border hover:border-primary-500/50 hover:bg-bg-elevated'
          )}
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleChange}
          />
          <div className="flex flex-col items-center justify-center gap-2 text-text-muted">
            <UploadCloud size={24} />
            <p className="text-sm">
              <span className="text-primary-400 font-medium">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs">Upload up to {maxImages} images (optional)</p>
          </div>
        </div>
      )}
    </div>
  );
}
