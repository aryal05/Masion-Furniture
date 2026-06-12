"use client";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { motion, Reorder } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import type { ProductImage } from "@/types";

interface Props {
  images: ProductImage[];
  onImagesChange: (images: ProductImage[]) => void;
}

export function ImageUploader({ images, onImagesChange }: Props) {
  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/jpeg": [], "image/png": [], "image/webp": [] },
    maxSize: 5 * 1024 * 1024,
    onDrop: async (files) => {
      setUploading(true);
      const newImages: ProductImage[] = [];

      for (const file of files) {
        const path = `products/${crypto.randomUUID()}-${file.name}`;
        const { error } = await supabase.storage
          .from("product-images")
          .upload(path, file);

        if (!error) {
          const { data: { publicUrl } } = supabase.storage
            .from("product-images")
            .getPublicUrl(path);

          newImages.push({
            id: crypto.randomUUID(),
            product_id: "",
            url: publicUrl,
            alt: file.name,
            sort_order: images.length + newImages.length,
          });
        }
      }

      onImagesChange([...images, ...newImages]);
      setUploading(false);
    },
  });

  const handleRemove = (id: string) => {
    onImagesChange(images.filter((img) => img.id !== id));
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`
          grid cursor-pointer place-items-center rounded-card border-2 border-dashed p-8
          transition-colors ${isDragActive ? "border-walnut bg-walnut/5" : "border-walnut/20"}
        `}
      >
        <input {...getInputProps()} />
        {uploading ? (
          <p>Uploading...</p>
        ) : (
          <div className="text-center">
            <p className="text-muted">Drag & drop images here</p>
            <p className="mt-1 text-xs text-muted">JPEG, PNG, WebP — max 5MB</p>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <Reorder.Group
          axis="x"
          values={images}
          onReorder={onImagesChange}
          className="flex gap-4 overflow-x-auto pb-2"
        >
          {images.map((img) => (
            <Reorder.Item key={img.id} value={img}>
              <motion.div
                layout
                className="relative h-24 w-24 shrink-0 cursor-grab rounded-btn overflow-hidden"
              >
                <Image src={img.url} alt={img.alt || ""} fill className="object-cover" />
                <button
                  onClick={() => handleRemove(img.id)}
                  className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-white/80 text-xs hover:bg-white"
                >
                  ✕
                </button>
              </motion.div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </div>
  );
}
