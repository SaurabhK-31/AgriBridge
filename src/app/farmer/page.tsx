'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import BatchTable from '@/components/BatchTable';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const earningsData = [
  { month: 'Oct', earnings: 4200, msp: 3800 },
  { month: 'Nov', earnings: 3900, msp: 3800 },
  { month: 'Dec', earnings: 5100, msp: 3850 },
  { month: 'Jan', earnings: 4800, msp: 3850 },
  { month: 'Feb', earnings: 5400, msp: 3900 },
  { month: 'Mar', earnings: 5800, msp: 3900 },
];

export default function FarmerDashboard() {
  const [showToast, setShowToast] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // Form state
  const [crop, setCrop] = useState('Alphonso Mango');
  const [quantity, setQuantity] = useState('2400');
  const [harvestDate, setHarvestDate] = useState('2026-03-12');
  const [location, setLocation] = useState('Nashik, Maharashtra');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowToast(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setShowRegisterForm(false);
      setSubmitted(false);
    }, 1500);
  };

  return (
    <DashboardLayout>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-feed-slide-in">
          <div className="bg-[#16a34a] text-white p-4 rounded-xl shadow-xl flex items-center justify-between gap-4 max-w-md">
            <div className="text-xs">
              <p className="font-bold flex items-center gap-1.5">
                <span>✓</span> Batch AG-2847 registered on Polygon Blockchain
              </p>
              <p className="text-green-100 font-mono mt-0.5 text-[11px]">
                TX: 0x7f3a...4d92 — <a href="#polygonscan" className="underline font-bold">View on Polygonscan →</a>
              </p>
            </div>
            <button onClick={() => setShowToast(false)} className="text-green-200 hover:text-white font-bold text-sm">
              ✕
            </button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
          <div>
            <h1 className="text-xl font-extrabold text-[#1a1a1a] flex items-center gap-2">
              🌾 Farmer Dashboard
            </h1>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              Manage crop batches, monitor blockchain verification, and track earnings vs MSP.
            </p>
          </div>
          <button
            onClick={() => setShowRegisterForm(!showRegisterForm)}
            className="px-5 py-2.5 bg-[#16a34a] hover:bg-green-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-green-100 flex items-center gap-2 self-start sm:self-auto"
          >
            <span>➕</span> Register New Batch
          </button>
        </div>

        {/* Register New Batch Form Modal / Section */}
        {showRegisterForm && (
          <div className="bg-white p-6 rounded-xl border-2 border-[#16a34a] shadow-md space-y-4 animate-feed-slide-in">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h2 className="text-sm font-extrabold text-[#1a1a1a] flex items-center gap-2">
                <span>📜</span> Register New Crop Batch on Blockchain
              </h2>
              <button onClick={() => setShowRegisterForm(false)} className="text-gray-400 hover:text-gray-600 font-bold text-sm">
                ✕
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-[#1a1a1a] mb-1">Crop Type</label>
                <select
                  value={crop}
                  onChange={(e) => setCrop(e.target.value)}
                  className="w-full p-2.5 bg-[#FAFAF7] border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] font-medium"
                >
                  <option value="Alphonso Mango">Alphonso Mango</option>
                  <option value="Basmati Rice">Basmati Rice</option>
                  <option value="Nashik Grapes">Nashik Grapes</option>
                  <option value="Kesar Saffron">Kesar Saffron</option>
                  <option value="Darjeeling Tea">Darjeeling Tea</option>
                  <option value="Punjab Wheat">Punjab Wheat</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#1a1a1a] mb-1">Quantity (kg)</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full p-2.5 bg-[#FAFAF7] border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] font-medium"
                  placeholder="e.g. 2400"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1a1a1a] mb-1">Harvest Date</label>
                <input
                  type="date"
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="w-full p-2.5 bg-[#FAFAF7] border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1a1a1a] mb-1">Farm Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2.5 bg-[#FAFAF7] border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#16a34a] font-medium"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-[#1a1a1a] mb-1">Upload Quality Certificate / Soil Test</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center bg-[#FAFAF7] hover:border-[#16a34a] transition-colors cursor-pointer">
                  <span className="text-2xl block mb-1">📄</span>
                  <p className="font-semibold text-gray-700 text-xs">Drag & drop certificate (PDF, JPG, PNG)</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">FSSAI / APEDA / Organic certification accepted</p>
                </div>
              </div>

              <div className="md:col-span-2 flex flex-col items-start gap-1 pt-2">
                <button
                  type="submit"
                  disabled={submitted}
                  className="px-6 py-3 bg-[#16a34a] hover:bg-green-700 text-white font-bold rounded-xl text-xs transition-all shadow-md flex items-center gap-2"
                >
                  {submitted ? '⏳ Registering Smart Contract...' : 'Register on Blockchain →'}
                </button>
                <p className="text-[11px] text-gray-500 font-mono">
                  Will be recorded on Polygon testnet with unique cryptographic hash
                </p>
              </div>
            </form>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-wider">
              <span>Total Batches</span>
              <span className="text-xl">📦</span>
            </div>
            <p className="text-3xl font-extrabold text-[#1a1a1a] mt-2">24</p>
            <span className="inline-block mt-2 text-[11px] font-bold text-[#16a34a] bg-green-50 px-2 py-0.5 rounded-full">
              +4 this month
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-wider">
              <span>Active Shipments</span>
              <span className="text-xl">🚚</span>
            </div>
            <p className="text-3xl font-extrabold text-[#1a1a1a] mt-2">3</p>
            <span className="inline-block mt-2 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
              In Transit
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-wider">
              <span>Avg Trust Score</span>
              <span className="text-xl">⭐</span>
            </div>
            <p className="text-3xl font-extrabold text-[#16a34a] mt-2">87<span className="text-sm font-bold text-gray-400">/100</span></p>
            <span className="inline-block mt-2 text-[11px] font-bold text-[#16a34a] bg-green-50 px-2 py-0.5 rounded-full">
              High Premium Grade
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-wider">
              <span>Earnings vs MSP</span>
              <span className="text-xl">💰</span>
            </div>
            <p className="text-3xl font-extrabold text-[#1a1a1a] mt-2">94%</p>
            <div className="w-full bg-gray-100 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-[#16a34a] h-full" style={{ width: '94%' }}></div>
            </div>
          </div>
        </div>

        {/* Main Content Grid: Left 2/3 (Table & Chart), Right 1/3 (AI Recommendations) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Recent Batches Table */}
            <BatchTable />

            {/* Earnings Chart */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#1a1a1a]">Monthly Earnings vs MSP Baseline</h3>
                  <p className="text-xs text-gray-500 font-medium">Actual realized market earnings (₹/quintal) vs Government MSP</p>
                </div>
                <span className="text-xs font-bold text-[#16a34a] bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                  +14% Above MSP Avg
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={earningsData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f3ee" />
                    <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b7280' }} />
                    <YAxis tick={{ fontSize: 11, fill: '#6b7280' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', fontSize: '12px', border: '1px solid #e5e7eb' }}
                      formatter={(value: any) => [`₹${value}/q`, '']}
                    />
                    <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                    <Bar dataKey="earnings" name="Actual Earnings (₹)" fill="#16a34a" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="msp" name="MSP Baseline (₹)" fill="#d97706" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right Column (4 cols) - AI Quality Recommendations */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-sm font-extrabold text-[#1a1a1a] flex items-center gap-2">
                  <span>🤖</span> AI Quality Recommendations
                </h3>
                <span className="text-[10px] font-bold text-[#16a34a] bg-green-50 px-2 py-0.5 rounded-full">
                  3 New
                </span>
              </div>

              <div className="space-y-3">
                <div className="p-3.5 bg-green-50 rounded-xl border border-green-200 border-l-4 border-l-[#16a34a] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-green-900">Alphonso Mango (AG-2847)</span>
                    <span className="text-[10px] font-bold text-[#16a34a]">Quality Tip</span>
                  </div>
                  <p className="text-gray-700 text-[11px] leading-relaxed">
                    Harvest 2 days earlier next season based on shelf-life patterns to maximize export grade pricing.
                  </p>
                </div>

                <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 border-l-4 border-l-[#d97706] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-amber-900">Nashik Grapes Cold Chain</span>
                    <span className="text-[10px] font-bold text-amber-700">Temp Alert</span>
                  </div>
                  <p className="text-gray-700 text-[11px] leading-relaxed">
                    Maintain cold storage below 4°C. Current avg: 5.2°C — Risk: Medium. Adjust refrigeration immediately.
                  </p>
                </div>

                <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 border-l-4 border-l-blue-600 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-900">Kesar Saffron (AG-2829)</span>
                    <span className="text-[10px] font-bold text-blue-700">GI Certificate</span>
                  </div>
                  <p className="text-gray-700 text-[11px] leading-relaxed">
                    Eligible for official GI certification. Apply before 30 April 2026 to claim a +18% premium export tag.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-3">
              <h4 className="text-xs font-extrabold text-[#1a1a1a] uppercase tracking-wider">Farmer Tools</h4>
              <div className="space-y-2 text-xs">
                <button className="w-full text-left p-2.5 bg-[#FAFAF7] hover:bg-gray-100 rounded-lg font-semibold flex items-center justify-between">
                  <span>📄 Download APEDA Certificates</span>
                  <span>→</span>
                </button>
                <button className="w-full text-left p-2.5 bg-[#FAFAF7] hover:bg-gray-100 rounded-lg font-semibold flex items-center justify-between">
                  <span>⚖️ Check Mandi MSP Prices</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
