"use client";

import React from "react";

interface UploadButtonProps {
  section: string;
  onUploaded: () => void;
}

export default function UploadButton({
  section,
  onUploaded,
}: UploadButtonProps) {
  // const site = process.env.NEXT_PUBLIC_SITE_NAME!;
  const siteName = sessionStorage.getItem("siteName");

  const upload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (!e.target.files) return;

    const formData = new FormData();
    Array.from(e.target.files).forEach((file) =>
      formData.append("images", file)
    );

    await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE}/sites/${siteName}/upload/${section}`,
      {
        method: "POST",
        credentials: "include",
        body: formData,
      }
    );

    onUploaded();
    e.target.value = "";
  };

  return <input type="file" multiple onChange={upload} />;
}
