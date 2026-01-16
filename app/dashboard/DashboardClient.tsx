"use client";

import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import ImageGrid from "@/components/ImageGrid";
import UploadButton from "@/components/UploadButton";
import type { SiteImage } from "@/types/image";

export default function DashboardClient() {
  const params = useSearchParams();
  const section = params.get("section") ?? "hero";

  const [siteName] = useState<string | undefined>(() => {
    if (typeof window === "undefined") return undefined;
    return sessionStorage.getItem("siteName") ?? undefined;
  });

  const [images, setImages] = useState<SiteImage[]>([]);

  const fetchImages = useCallback(async (): Promise<void> => {
    if (!siteName) return;

    const res = await api.get<SiteImage[]>(
      `/sites/${siteName}/images/${section}`
    );
    setImages(res.data);
  }, [section, siteName]);

  useEffect(() => {
    if (!siteName) return;

    let active = true;

    (async () => {
      try {
        const res = await api.get<SiteImage[]>(
          `/sites/${siteName}/images/${section}`
        );
        if (active) setImages(res.data);
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      active = false;
    };
  }, [section, siteName]);

  if (siteName === undefined) {
    return null;
  }

  if (!siteName) {
    return <p className="p-4">No site selected</p>;
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        {section.toUpperCase()}
      </h1>

      <UploadButton
        section={section}
        onUploaded={fetchImages}
      />

      <ImageGrid
        images={images}
        section={section}
        siteName={siteName}
        onDelete={fetchImages}
      />
    </>
  );
}
