'use client';

import React from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export default function DashboardLayout({
  children,
  title,
  role,
}: {
  children: React.ReactNode;
  title?: string;
  role?: string;
}) {
  return (
    <div className="min-h-screen bg-[#FAFAF7] text-[#1a1a1a]">
      <Sidebar />
      <TopBar title={title} role={role} />
      <main className="ml-[240px] p-6">{children}</main>
    </div>
  );
}
