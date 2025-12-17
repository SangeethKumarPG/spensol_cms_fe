"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-40
          h-full
          w-64
          bg-gray-900
          transform
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          transition-transform
          duration-300
        `}
      >
        <Sidebar onClose={() => setOpen(false)} />
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Mobile header */}
        <div className="md:hidden p-4 border-b flex items-center">
          <button
            onClick={() => setOpen(true)}
            className="text-xl"
          >
            ☰
          </button>
          <span className="ml-4 font-semibold">
            Dashboard
          </span>
        </div>

        <div className="p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
}
