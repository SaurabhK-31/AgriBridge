'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';

const complianceByCountry: Record<string, Array<{ name: string; status: 'passed' | 'pending' | 'missing' }>> = {
  UK: [
    { name: 'EU Pesticide Residue MRL Limits (EC 396/2005)', status: 'passed' },
    { name: 'GLOBALG.A.P Certification', status: 'passed' },
    { name: 'APEDA Phytosanitary Certificate', status: 'passed' },
    { name: 'UKCA Product Safety Marking', status: 'pending' },
    { name: 'Cold Chain Temp Log (JNPT → Felixstowe)', status: 'passed' },
    { name: 'Allergen Declaration Form', status: 'missing' },
  ],
  UAE: [
    { name: 'MOIAT Halal & Food Safety Standard', status: 'passed' },
    { name: 'Phytosanitary Clearance (Dubai Customs)', status: 'passed' },
    { name: 'Pesticide MRL Compliance', status: 'passed' },
    { name: 'Cold Chain Logistics Certificate', status: 'passed' },
  ],
  USA: [
    { name: 'US FDA Food Facility Registration', status: 'passed' },
    { name: 'USDA APHIS Plant Protection Permit', status: 'pending' },
    { name: 'Chlorpyrifos Residue Limit (<0.01 ppm)', status: 'missing' },
    { name: 'Prior Notice Filing (FDA)', status: 'passed' },
  ],
  Japan: [
    { name: 'Japan Food Sanitation Act Clearance', status: 'passed' },
    { name: 'Chlorpyrifos Residue Limit (<0.01 ppm)', status: 'passed' },
    { name: 'APEDA Quality Audit Certificate', status: 'passed' },
  ],
};

export default function ExporterDashboard() {
  const [selectedCountry, setSelectedCountry] = useState('UK');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
          <div>
            <h1 className="text-xl font-extrabold text-[#1a1a1a] flex items-center gap-2">
              📦 Exporter Dashboard
            </h1>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              Manage international shipments, automated RAG compliance checks, and certificate authentication.
            </p>
          </div>
          <button className="px-5 py-2.5 bg-[#16a34a] hover:bg-green-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-green-100 flex items-center gap-2">
            <span>🚢</span> Create Export Shipment
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-wider">
              <span>Pending Shipments</span>
              <span className="text-xl">📦</span>
            </div>
            <p className="text-3xl font-extrabold text-[#d97706] mt-2">7</p>
            <span className="inline-block mt-2 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
              Requires Review
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-wider">
              <span>Compliance Rate</span>
              <span className="text-xl">⚖️</span>
            </div>
            <p className="text-3xl font-extrabold text-[#16a34a] mt-2">96%</p>
            <span className="inline-block mt-2 text-[11px] font-bold text-[#16a34a] bg-green-50 px-2 py-0.5 rounded-full">
              47 Countries Verified
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-wider">
              <span>Fraud Alerts</span>
              <span className="text-xl">🚨</span>
            </div>
            <p className="text-3xl font-extrabold text-[#dc2626] mt-2">2</p>
            <span className="inline-block mt-2 text-[11px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full">
              Action Required
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-wider">
              <span>Avg Processing Time</span>
              <span className="text-xl">⏱️</span>
            </div>
            <p className="text-3xl font-extrabold text-[#1a1a1a] mt-2">3.2 <span className="text-sm font-bold text-gray-400">days</span></p>
            <span className="inline-block mt-2 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
              -1.4 days faster
            </span>
          </div>
        </div>

        {/* Shipments Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-[#1a1a1a]">Active International Shipments</h3>
            <span className="text-xs font-medium text-gray-500">7 Active Orders</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1a1a1a]">
              <thead className="bg-[#FAFAF7] text-gray-500 font-semibold border-b border-gray-200 uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Shipment ID</th>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Destination</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Certificate</th>
                  <th className="py-3 px-4">Compliance</th>
                  <th className="py-3 px-4">Risk Score</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {[
                  { id: 'EX-1923', product: 'Alphonso Mango', dest: '🇬🇧 UK (London)', qty: '2,500 kg', cert: 'Verified', comp: 'Compliant', risk: 12 },
                  { id: 'EX-1917', product: 'Basmati Rice', dest: '🇦🇪 UAE (Dubai)', qty: '5,000 kg', cert: 'Pending', comp: 'Review Req.', risk: 45 },
                  { id: 'EX-1911', product: 'Darjeeling Tea', dest: '🇩🇪 Germany (Hamburg)', qty: '1,200 kg', cert: 'Verified', comp: 'Compliant', risk: 8 },
                  { id: 'EX-1904', product: 'Nashik Grapes', dest: '🇸🇬 Singapore', qty: '3,000 kg', cert: 'Expired', comp: 'Non-Compliant', risk: 78 },
                  { id: 'EX-1898', product: 'Kesar Saffron', dest: '🇯🇵 Japan (Tokyo)', qty: '100 kg', cert: 'Verified', comp: 'Compliant', risk: 5 },
                  { id: 'EX-1892', product: 'Punjab Wheat', dest: '🇺🇸 USA (New York)', qty: '15,000 kg', cert: 'Pending', comp: 'Under Review', risk: 23 },
                ].map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-[#FAFAF7]/50 hover:bg-gray-50'}>
                    <td className="py-3 px-4 font-mono font-bold text-[#16a34a]">{row.id}</td>
                    <td className="py-3 px-4 font-bold">{row.product}</td>
                    <td className="py-3 px-4">{row.dest}</td>
                    <td className="py-3 px-4 text-gray-600">{row.qty}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        row.cert === 'Verified' ? 'bg-green-100 text-green-700' : row.cert === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-700'
                      }`}>
                        {row.cert}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        row.comp === 'Compliant' ? 'bg-green-100 text-green-700' : row.comp.includes('Review') ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-700'
                      }`}>
                        {row.comp}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`font-mono font-extrabold text-xs ${
                        row.risk < 30 ? 'text-[#16a34a]' : row.risk < 60 ? 'text-[#d97706]' : 'text-[#dc2626]'
                      }`}>
                        {row.risk}/100
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button className="text-xs font-semibold text-[#16a34a] hover:underline">Manage →</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2-Column Section: Left (Compliance Checker & Certificate Upload), Right (Active Fraud Alerts) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Compliance Checker Panel */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#1a1a1a] flex items-center gap-2">
                    <span>🌐</span> RAG Compliance Checker
                  </h3>
                  <p className="text-xs text-gray-500">Instant AI verification against 47 destination country regulations</p>
                </div>
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="p-2 bg-[#FAFAF7] border border-gray-200 rounded-lg text-xs font-bold text-[#1a1a1a]"
                >
                  <option value="UK">🇬🇧 United Kingdom</option>
                  <option value="UAE">🇦🇪 United Arab Emirates</option>
                  <option value="USA">🇺🇸 United States</option>
                  <option value="Japan">🇯🇵 Japan</option>
                </select>
              </div>

              <div className="space-y-2">
                {complianceByCountry[selectedCountry]?.map((req, idx) => (
                  <div key={idx} className="p-3 bg-[#FAFAF7] rounded-xl border border-gray-200 flex items-center justify-between text-xs">
                    <span className="font-semibold text-gray-800">{req.name}</span>
                    {req.status === 'passed' && (
                      <span className="font-bold text-[#16a34a] bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        ✓ Passed
                      </span>
                    )}
                    {req.status === 'pending' && (
                      <span className="font-bold text-[#d97706] bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        ⚠️ Pending Review
                      </span>
                    )}
                    {req.status === 'missing' && (
                      <span className="font-bold text-[#dc2626] bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        ✗ Missing Document
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Certificate Upload Section */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-3">
              <h3 className="text-base font-bold text-[#1a1a1a] flex items-center gap-2">
                <span>📄</span> Upload Phytosanitary / Export Certificate
              </h3>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center bg-[#FAFAF7] hover:border-[#16a34a] transition-colors cursor-pointer">
                <span className="text-3xl block mb-2">📤</span>
                <p className="font-bold text-[#1a1a1a] text-xs">Upload export certificate for cryptographic verification</p>
                <p className="text-[11px] text-gray-400 mt-1">Supported formats: PDF, JPEG, PNG (Max 15MB)</p>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols) - Active Fraud Alerts */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-base font-extrabold text-[#dc2626] flex items-center gap-2">
                  <span>🚨</span> Active Fraud Alerts
                </h3>
                <span className="text-xs font-bold text-red-700 bg-red-100 px-2.5 py-0.5 rounded-full">
                  2 Flagged
                </span>
              </div>

              <div className="space-y-4 text-xs">
                {/* Alert 1 */}
                <div className="p-4 bg-red-50 rounded-xl border border-red-200 border-l-4 border-l-[#dc2626] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-red-900">CRITICAL: Duplicate Certificate Hash</span>
                    <span className="text-[10px] font-bold text-red-700 bg-red-200 px-2 py-0.5 rounded-full">
                      Shipment EX-1923
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-[11px]">
                    Certificate hash for Shipment #EX-1923 matches a previously used certificate from a different batch in February 2026. Possible certificate reuse fraud.
                  </p>
                  <div className="pt-2 border-t border-red-200 flex items-center justify-between text-[11px] font-bold">
                    <span className="text-red-800">Detected by: Fraud Agent</span>
                    <button className="px-3 py-1 bg-[#dc2626] hover:bg-red-700 text-white rounded-lg transition-colors">
                      Investigate →
                    </button>
                  </div>
                </div>

                {/* Alert 2 */}
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 border-l-4 border-l-[#d97706] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-amber-900">HIGH: Anomalous Weight Discrepancy</span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-200 px-2 py-0.5 rounded-full">
                      Shipment EX-1904
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-[11px]">
                    Shipment #EX-1904 shows 18% weight loss between source mandi and Mumbai JNPT hub. Exceeds acceptable 3% transit loss threshold.
                  </p>
                  <div className="pt-2 border-t border-amber-200 flex items-center justify-between text-[11px] font-bold">
                    <span className="text-amber-800">Detected by: Quality Agent</span>
                    <button className="px-3 py-1 bg-[#d97706] hover:bg-amber-700 text-white rounded-lg transition-colors">
                      Inspect →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
