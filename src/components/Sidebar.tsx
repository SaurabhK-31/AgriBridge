'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/farmer', label: 'Farmer Dashboard', icon: '🌾' },
  { href: '/exporter', label: 'Exporter Dashboard', icon: '📦' },
  { href: '/consumer', label: 'Consumer Verify', icon: '👤' },
  { href: '/regulator', label: 'Regulator Panel', icon: '🏛️' },
  { href: '/agents', label: 'AI Agents', icon: '🤖' },
  { href: '/trust-score', label: 'Trust Scores', icon: '📊' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[240px] bg-white border-r border-gray-200 border-l-4 border-l-[#16a34a] min-h-screen flex flex-col justify-between p-4 shadow-xs fixed left-0 top-0 bottom-0 z-40">
      <div>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 px-2 py-3 mb-6 border-b border-gray-100">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-600 to-emerald-700 flex items-center justify-center text-white text-xl shadow-xs">
            🌾
          </div>
          <div>
            <h1 className="text-base font-extrabold text-[#1a1a1a] tracking-tight leading-tight">AgriBridge AI</h1>
            <p className="text-[11px] font-semibold text-[#16a34a] tracking-wider uppercase">Trust Platform</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-green-50 text-[#16a34a] border border-green-200 shadow-2xs'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-[#1a1a1a]'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logged in User info & Logout */}
      <div className="pt-4 border-t border-gray-100 space-y-3">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-green-600 text-white font-bold text-sm flex items-center justify-center shadow-2xs">
            RK
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-[#1a1a1a] truncate">Rajesh Kumar</p>
            <p className="text-[11px] text-gray-500 truncate">Nashik, Maharashtra</p>
          </div>
        </div>
        <button
          onClick={() => (window.location.href = '/')}
          className="w-full text-left flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </aside>
  );
}
