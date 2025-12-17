"use client";

import { api } from "@/lib/api";
import type { SiteImage } from "@/types/image";
import Image from "next/image";

interface ImageGridProps {
  images: SiteImage[];
  section: string;
  onDelete: () => void;
}

export default function ImageGrid({
  images,
  section,
  onDelete,
}: ImageGridProps) {
  const siteName = sessionStorage.getItem("siteName");

  const remove = async (id: number): Promise<void> => {
    await api.delete(`/sites/${siteName}/${section}/${id}`);
    onDelete();
  };

  return (
    <div className="
      grid
      grid-cols-1
      sm:grid-cols-2
      lg:grid-cols-3
      xl:grid-cols-4
      gap-4
      mt-4
    ">
      {images.map((img) => (
        <div key={img.id} className="relative aspect-video">
          <Image
            src={img.url}
            alt=""
            fill
            className="object-cover rounded"
            sizes="(max-width: 640px) 100vw,
                   (max-width: 1024px) 50vw,
                   (max-width: 1280px) 33vw,
                   25vw"
          />

          <button
            onClick={() => remove(img.id)}
            className="
              absolute
              top-2 right-2
              bg-red-600 text-white
              px-2 py-1
              text-sm
              rounded
              z-10
            "
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
