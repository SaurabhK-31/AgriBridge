'use client';

import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1a1a1a]">
      <Sidebar />
      <TopBar />
      <main className="ml-[240px] p-6">{children}</main>
    </div>
  );
}
