'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';

export default function RegulatorDashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
          <div>
            <h1 className="text-xl font-extrabold text-[#1a1a1a] flex items-center gap-2">
              <span>🏛️</span> Regulator Dashboard
            </h1>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              National Agricultural Compliance & Fraud Monitoring Console for FSSAI, APEDA, and Customs Authorities.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs">
              🚨 Issue National Recall Notice
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200 border-l-4 border-l-[#dc2626] shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-wider">
              <span>Critical Alerts</span>
              <span className="text-xl">🚨</span>
            </div>
            <p className="text-3xl font-extrabold text-[#dc2626] mt-2">3</p>
            <span className="inline-block mt-2 text-[11px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full">
              Requires Enforcement
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 border-l-4 border-l-[#d97706] shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-wider">
              <span>Under Investigation</span>
              <span className="text-xl">🔍</span>
            </div>
            <p className="text-3xl font-extrabold text-[#d97706] mt-2">8</p>
            <span className="inline-block mt-2 text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full">
              In Progress
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 border-l-4 border-l-[#16a34a] shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-wider">
              <span>Resolved Today</span>
              <span className="text-xl">✓</span>
            </div>
            <p className="text-3xl font-extrabold text-[#16a34a] mt-2">12</p>
            <span className="inline-block mt-2 text-[11px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
              Audits Passed
            </span>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 border-l-4 border-l-blue-600 shadow-xs">
            <div className="flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-wider">
              <span>Compliance Rate</span>
              <span className="text-xl">📊</span>
            </div>
            <p className="text-3xl font-extrabold text-blue-700 mt-2">94.2%</p>
            <span className="inline-block mt-2 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
              National Average
            </span>
          </div>
        </div>

        {/* 2 Column: Left India Alert Zones Map Placeholder, Right Recent Audit Activity Log */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: India Alert Map Placeholder */}
          <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-[#1a1a1a] flex items-center gap-2">
                <span>🗺️</span> Alert Zones Across India
              </h3>
              <span className="text-xs font-semibold text-gray-500">Live APMC & Mandi Nodes</span>
            </div>

            {/* Map visual box */}
            <div className="h-80 bg-[#FAFAF7] rounded-xl border border-gray-200 relative p-4 flex flex-col justify-between overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#16a34a_1px,transparent_1px)] [background-size:16px_16px]"></div>

              {/* Pins */}
              <div className="relative z-10 h-full w-full">
                {/* Punjab */}
                <div className="absolute top-[20%] left-[30%] flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-amber-300 shadow-xs">
                  <span className="pulsing-dot bg-amber-500"></span>
                  <span className="text-[10px] font-bold text-gray-800">Amritsar (1 Alert)</span>
                </div>

                {/* Nashik */}
                <div className="absolute top-[50%] left-[25%] flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-red-300 shadow-xs">
                  <span className="pulsing-dot bg-red-600"></span>
                  <span className="text-[10px] font-bold text-red-700">Nashik (3 Critical)</span>
                </div>

                {/* Darjeeling */}
                <div className="absolute top-[35%] right-[25%] flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-green-300 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#16a34a]"></span>
                  <span className="text-[10px] font-bold text-gray-800">Darjeeling (Clear)</span>
                </div>

                {/* Coimbatore */}
                <div className="absolute bottom-[20%] left-[40%] flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-amber-300 shadow-xs">
                  <span className="pulsing-dot bg-amber-500"></span>
                  <span className="text-[10px] font-bold text-gray-800">Coimbatore (2 Alerts)</span>
                </div>

                {/* Jaipur */}
                <div className="absolute top-[35%] left-[20%] flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-amber-300 shadow-xs">
                  <span className="pulsing-dot bg-amber-500"></span>
                  <span className="text-[10px] font-bold text-gray-800">Jaipur (1 Alert)</span>
                </div>
              </div>

              {/* Legend */}
              <div className="relative z-10 flex items-center justify-between text-[11px] font-bold bg-white/90 p-2.5 rounded-lg border border-gray-200 backdrop-blur-xs">
                <span className="text-gray-500">Legend:</span>
                <span className="flex items-center gap-1 text-red-700"><span className="w-2 h-2 rounded-full bg-red-600"></span> Critical</span>
                <span className="flex items-center gap-1 text-amber-800"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Warning</span>
                <span className="flex items-center gap-1 text-green-700"><span className="w-2 h-2 rounded-full bg-green-600"></span> Clear</span>
              </div>
            </div>
          </div>

          {/* Right: Recent Audit Log */}
          <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-[#1a1a1a] flex items-center gap-2">
                <span>📋</span> Recent Audit Activity
              </h3>
              <span className="text-[10px] font-bold text-[#16a34a] bg-green-50 px-2 py-0.5 rounded-full">8 Logged</span>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto text-xs pr-1">
              {[
                { time: '14:30 IST', desc: 'Inspector Amit Sharma approved Shipment #EX-1886 after on-site verification' },
                { time: '13:15 IST', desc: 'Fraud alert escalated for Shipment #EX-1917 — certificate hash mismatch confirmed' },
                { time: '11:45 IST', desc: 'Compliance review completed for 12 pending shipments — 10 approved, 2 flagged' },
                { time: '16:20 IST', desc: 'Weight discrepancy investigation opened for Shipment #EX-1904' },
                { time: '14:00 IST', desc: 'Pesticide residue test results received for Batch #AG-2817 — within limits' },
                { time: '10:30 IST', desc: 'Monthly compliance report generated for Maharashtra region — 94.2% compliant' },
                { time: '15:45 IST', desc: 'Cold chain breach confirmed for Shipment #EX-1886 — corrective action initiated' },
                { time: '09:00 IST', desc: 'New EU regulation 2024/1234 imported into compliance database' },
              ].map((log, idx) => (
                <div key={idx} className="p-2.5 bg-[#FAFAF7] rounded-lg border border-gray-200 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-gray-400 font-bold">[{log.time}]</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16a34a]"></span>
                  </div>
                  <p className="text-[11px] font-semibold text-[#1a1a1a]">{log.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Flagged Shipments Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-[#dc2626] flex items-center gap-2">
              <span>🚨</span> Flagged Shipments for Regulatory Intervention
            </h3>
            <span className="text-xs font-semibold text-gray-500">7 Shipments Flagged</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1a1a1a]">
              <thead className="bg-[#FAFAF7] text-gray-500 font-semibold border-b border-gray-200 uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Shipment ID</th>
                  <th className="py-3 px-4">Exporter</th>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Issue Type</th>
                  <th className="py-3 px-4">Severity</th>
                  <th className="py-3 px-4">Detected By</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {[
                  { id: 'EX-1917', exp: 'Sunrise Exports Ltd', prod: 'Basmati Rice', issue: 'Certificate Fraud', sev: 'Critical', agent: 'Fraud Agent' },
                  { id: 'EX-1904', exp: 'Green Valley Traders', prod: 'Nashik Grapes', issue: 'Weight Discrepancy', sev: 'Critical', agent: 'Quality Agent' },
                  { id: 'EX-1898', exp: 'Kerala Spice Corp', prod: 'Kesar Saffron', issue: 'Pesticide Residue', sev: 'Critical', agent: 'Compliance Agent' },
                  { id: 'EX-1892', exp: 'Punjab Agri Foods', prod: 'Punjab Wheat', issue: 'Documentation Gap', sev: 'High', agent: 'Traceability Agent' },
                  { id: 'EX-1886', exp: 'Mumbai Fresh Ltd', prod: 'Alphonso Mango', issue: 'Cold Chain Breach', sev: 'High', agent: 'Spoilage Agent' },
                  { id: 'EX-1880', exp: 'Tamil Harvest Co', prod: 'Darjeeling Tea', issue: 'Label Mismatch', sev: 'Medium', agent: 'Quality Agent' },
                  { id: 'EX-1874', exp: 'Deccan Exports', prod: 'Basmati Rice', issue: 'Delayed Docs', sev: 'Medium', agent: 'Compliance Agent' },
                ].map((row, idx) => (
                  <tr key={row.id} className={idx % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-[#FAFAF7]/50 hover:bg-gray-50'}>
                    <td className="py-3 px-4 font-mono font-bold text-red-700">{row.id}</td>
                    <td className="py-3 px-4 font-bold">{row.exp}</td>
                    <td className="py-3 px-4">{row.prod}</td>
                    <td className="py-3 px-4 text-gray-700">{row.issue}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        row.sev === 'Critical' ? 'bg-red-100 text-red-700' : row.sev === 'High' ? 'bg-amber-100 text-amber-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {row.sev}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-500 font-mono text-[11px]">{row.agent}</td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button className="px-2.5 py-1 bg-[#16a34a] hover:bg-green-700 text-white font-bold rounded-lg text-[11px]">
                        Approve
                      </button>
                      <button className="px-2.5 py-1 bg-[#dc2626] hover:bg-red-700 text-white font-bold rounded-lg text-[11px]">
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
