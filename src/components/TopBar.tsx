'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';

const pageTitles: Record<string, string> = {
  '/farmer': 'Farmer Dashboard',
  '/exporter': 'Exporter Dashboard',
  '/consumer': 'Consumer Verification',
  '/regulator': 'Regulator Panel',
  '/agents': 'AI Agent Command Center',
  '/trust-score': 'Trust Score Breakdown',
};

export default function TopBar() {
  const pathname = usePathname();
  const title = pageTitles[pathname] || 'Dashboard';
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-30 ml-[240px]">
      {/* Breadcrumb & Title */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span className="font-medium">AgriBridge AI</span>
        <span>/</span>
        <span className="font-bold text-[#1a1a1a] text-sm">{title}</span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search batch, crop, or certificate..."
            className="w-64 pl-9 pr-4 py-1.5 text-xs bg-[#FAFAF7] border border-gray-200 rounded-lg text-[#1a1a1a] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#16a34a]"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs">🔍</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors text-base"
          >
            🔔
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 p-3 space-y-2 z-50 animate-feed-slide-in">
              <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                <span className="text-xs font-bold text-[#1a1a1a]">Notifications</span>
                <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">3 New</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-green-50 rounded-lg border border-green-100">
                  <p className="font-bold text-green-800">✓ Batch AG-2847 Registered</p>
                  <p className="text-gray-600 text-[11px] mt-0.5">Recorded on Polygon testnet — TX: 0x7f3a...</p>
                </div>
                <div className="p-2 bg-amber-50 rounded-lg border border-amber-100">
                  <p className="font-bold text-amber-800">⚠️ Cold Chain Temp Alert</p>
                  <p className="text-gray-600 text-[11px] mt-0.5">Batch AG-2841 temperature reached 5.2°C</p>
                </div>
                <div className="p-2 bg-red-50 rounded-lg border border-red-100">
                  <p className="font-bold text-red-800">🚨 Duplicate Certificate</p>
                  <p className="text-gray-600 text-[11px] mt-0.5">Shipment EX-1923 flagged by Fraud Agent</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-3 border-l border-gray-200">
          <div className="w-8 h-8 rounded-full bg-[#16a34a] text-white font-bold text-xs flex items-center justify-center">
            RK
          </div>
          <span className="text-xs font-semibold text-[#1a1a1a] hidden md:inline">Rajesh Kumar</span>
        </div>
      </div>
    </header>
  );
}
