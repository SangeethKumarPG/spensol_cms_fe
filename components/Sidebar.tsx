"use client";

import { useRouter } from "next/navigation";
import { localApi } from "@/lib/localApi";

const sections = ["hero", "main", "gallery", "features", "services"];

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const router = useRouter();

  const logout = async (): Promise<void> => {
    try {
      await localApi.post("/api/auth/logout");
    } finally {
      sessionStorage.removeItem("siteName");
      router.push("/login");
    }
  };

  const navigate = (section: string) => {
    router.push(`/dashboard?section=${section}`);
    onClose?.();
  };

  return (
    <div className="h-full flex flex-col justify-between p-4 text-white">
      <div className="space-y-2">
        {sections.map((section) => (
          <button
            key={section}
            onClick={() => navigate(section)}
            className="w-full text-left p-3 rounded hover:bg-gray-700"
          >
            {section.toUpperCase()}
          </button>
        ))}
      </div>

      <button
        onClick={logout}
        className="mt-6 p-3 rounded bg-red-600 hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
}
