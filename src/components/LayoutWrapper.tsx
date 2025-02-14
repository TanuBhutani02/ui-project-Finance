"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login"; 

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {!isAuthPage && <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />}
      <main
        className={`flex-1 p-6 transition-all duration-300 ${
          !isAuthPage ? (isSidebarOpen ? "ml-64" : "ml-20") : "ml-0"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
