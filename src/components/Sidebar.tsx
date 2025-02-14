"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiMenu, FiX, FiGrid, FiRefreshCw, FiBarChart, FiFileText, FiLogOut } from "react-icons/fi";

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) => {
  const router = useRouter();

  const menuItems = [
    { name: "Dashboard", icon: <FiGrid size={20} />, path: "/dashboard" },
    { name: "Update", icon: <FiRefreshCw size={20} />, path: "/update" },
    { name: "Reports", icon: <FiFileText size={20} />, path: "/reports" },
    { name: "Financials", icon: <FiBarChart size={20} />, path: "/financials" },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-screen bg-gray-900 text-white flex flex-col transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        {isOpen && <h1 className="text-xl font-bold font-gabarito">Gross Margin Pro</h1>}
        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Logo */}
      <div className="flex justify-center py-4">
        <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
          <span className="text-white text-xl font-bold font-gabarito">G</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className="flex items-center gap-3 w-full p-3 rounded-lg text-left hover:bg-blue-700 transition"
            onClick={() => router.push(item.path)}
          >
            {item.icon}
            {isOpen && <span className="font-gabarito">{item.name}</span>}
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4">
        <button
          className="flex items-center gap-3 w-full p-3 rounded-lg text-left bg-red-600 hover:bg-red-700 transition"
          onClick={() => router.push("/login")}
        >
          <FiLogOut size={20} />
          {isOpen && <span className="font-gabarito">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
