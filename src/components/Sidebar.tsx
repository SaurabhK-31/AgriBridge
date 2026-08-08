'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Tractor,
  Ship,
  QrCode,
  Shield,
  Bot,
  Award,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Leaf,
} from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: LayoutDashboard },
  { href: '/farmer', label: 'Farmer Dashboard', icon: Tractor },
  { href: '/exporter', label: 'Exporter Dashboard', icon: Ship },
  { href: '/consumer', label: 'Consumer Verify', icon: QrCode },
  { href: '/regulator', label: 'Regulator Panel', icon: Shield },
  { href: '/agents', label: 'AI Agents', icon: Bot },
  { href: '/trust-score', label: 'Trust Score', icon: Award },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-sm z-40 transition-all duration-300 flex flex-col ${
        collapsed ? 'w-[72px]' : 'w-[260px]'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-gray-100">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center flex-shrink-0">
          <Leaf className="w-6 h-6 text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <h1 className="text-lg font-bold text-gray-900 leading-tight">AgriBridge</h1>
            <p className="text-xs font-medium text-green-600">AI Platform</p>
          </div>
        )}
      </div>

      {/* Role Badge */}
      {!collapsed && (
        <div className="mx-4 mt-4 px-3 py-2 bg-green-50 rounded-lg border border-green-100">
          <p className="text-xs font-medium text-green-700">Active Role</p>
          <p className="text-sm font-semibold text-green-800">Administrator</p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-green-600 text-white shadow-md shadow-green-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 ${
                  isActive ? 'text-white' : 'text-gray-400 group-hover:text-green-600'
                }`}
              />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mx-3 mb-2 flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors"
      >
        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        {!collapsed && <span>Collapse</span>}
      </button>

      {/* Logout */}
      <div className="border-t border-gray-100 p-3">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors w-full">
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
