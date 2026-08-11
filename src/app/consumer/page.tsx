'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import TrustScoreGauge from '@/components/TrustScoreGauge';

export default function ConsumerPage() {
  const [scanned, setScanned] = useState(true); // Default verified for AG-2835
  const [batchIdInput, setBatchIdInput] = useState('AG-2835');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    {
      sender: 'user',
      text: 'Is this product authentic?',
    },
    {
      sender: 'bot',
      text: 'Yes ✓ Batch AG-2835 (Basmati Rice) has been verified across 6 blockchain checkpoints. Farmer Rajesh Kumar registered this batch on 02 March 2026 from Amritsar, Punjab. All ownership transfers are recorded on Polygon blockchain and cannot be altered. Certificate hash matches government registry. Trust Score: 89/100.',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');

  const handleQuestionChip = (q: string) => {
    let answer = 'Yes ✓ Batch AG-2835 (Basmati Rice) is 100% authentic and verified on-chain.';
    if (q === 'Cold chain status?') {
      answer = '✓ Cold chain temperature was logged continuously at 4.2°C during transit from Amritsar to JNPT Port and shipping to Dubai. Zero temperature breaches recorded.';
    } else if (q === 'Pesticide levels safe?') {
      answer = '✓ Pesticide residue testing passed with zero banned organophosphates. Compliant with both EU EC 396/2005 and FSSAI 2026 maximum residue limits.';
    }

    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: q },
      { sender: 'bot', text: answer },
    ]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;
    const q = inputQuery;
    setInputQuery('');
    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: q },
      {
        sender: 'bot',
        text: `Regarding "${q}": AgriBridge AI Agent has verified Polygon Blockchain TX #0x3b1c90e1 and APEDA Certificate #AP-8841. Authenticity and safety status are 100% verified.`,
      },
    ]);
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-extrabold text-[#1a1a1a] flex items-center gap-2">
              <span>📱</span> Consumer QR Verification
            </h1>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              Scan product QR code or enter Batch ID to view complete authenticated farm-to-fork history.
            </p>
          </div>
          <button
            onClick={() => setScanned(!scanned)}
            className="px-4 py-2 bg-green-50 text-[#16a34a] border border-green-200 font-bold text-xs rounded-xl hover:bg-green-100 transition-colors"
          >
            {scanned ? '📷 Switch to Scanner UI' : '✨ View Verified Demo (AG-2835)'}
          </button>
        </div>

        {/* QR Scanner Area */}
        {!scanned ? (
          <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-xs flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-72 h-72 rounded-2xl border-4 border-dashed border-[#16a34a] p-4 flex flex-col items-center justify-center bg-[#FAFAF7] relative overflow-hidden">
              <div className="absolute w-full h-1 bg-[#16a34a] animate-scan-line shadow-sm"></div>
              <span className="text-5xl mb-3">📷</span>
              <p className="text-sm font-bold text-[#1a1a1a]">Point camera at product QR code</p>
              <p className="text-xs text-gray-500 mt-1 font-medium">Position code inside dashed frame</p>
            </div>

            <div className="flex items-center gap-3 w-full max-w-sm">
              <hr className="flex-1 border-gray-200" />
              <span className="text-xs font-bold text-gray-400 uppercase">OR MANUALLY ENTER</span>
              <hr className="flex-1 border-gray-200" />
            </div>

            <div className="flex gap-2 w-full max-w-sm">
              <input
                type="text"
                placeholder="Enter Batch ID (e.g. AG-2835)"
                value={batchIdInput}
                onChange={(e) => setBatchIdInput(e.target.value)}
                className="flex-1 p-2.5 bg-[#FAFAF7] border border-gray-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#16a34a]"
              />
              <button
                onClick={() => setScanned(true)}
                className="px-5 py-2.5 bg-[#16a34a] hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Verify →
              </button>
            </div>
          </div>
        ) : (
          /* Scanned Result View */
          <div className="space-y-6 animate-feed-slide-in">
            {/* Product Header & Trust Score */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-3xl">
                  🌾
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#16a34a] bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full">
                      ✓ Polygon Verified
                    </span>
                    <span className="text-[11px] font-mono text-gray-400">TX: 0x3b1c...90e1</span>
                  </div>
                  <h2 className="text-xl font-extrabold text-[#1a1a1a] mt-1">Basmati Rice — Batch AG-2835</h2>
                  <p className="text-xs font-semibold text-gray-600">
                    Rajesh Kumar, Amritsar Punjab (GI Tagged Premium Export Grade)
                  </p>
                </div>
              </div>

              {/* Trust Score Gauge */}
              <div className="text-center flex flex-col items-center">
                <TrustScoreGauge score={89} size={130} />
                <span className="text-xs font-bold text-[#16a34a] mt-1">Authenticity Guaranteed</span>
              </div>
            </div>

            {/* Journey Timeline (Horizontal Steps) */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-4">
              <h3 className="text-sm font-extrabold text-[#1a1a1a] flex items-center gap-2">
                <span>📍</span> Authenticated Product Journey
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2 relative">
                {[
                  { icon: '🌾', step: 'Farm', date: '02 Mar 2026', loc: 'Amritsar, Punjab' },
                  { icon: '⚖️', step: 'Mandi', date: '05 Mar 2026', loc: 'APMC Hub' },
                  { icon: '📦', step: 'Exporter', date: '08 Mar 2026', loc: 'AgriPro JNPT' },
                  { icon: '🚢', step: 'Shipped', date: '10 Mar 2026', loc: 'Maersk Shipping' },
                  { icon: '🏪', step: 'Retail', date: '18 Mar 2026', loc: 'Al Maya Dubai' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-[#FAFAF7] p-3 rounded-xl border border-gray-200 text-center space-y-1 relative">
                    <div className="w-5 h-5 rounded-full bg-[#16a34a] text-white text-[10px] font-bold flex items-center justify-center mx-auto">
                      ✓
                    </div>
                    <div className="text-xl pt-1">{item.icon}</div>
                    <p className="text-xs font-extrabold text-[#1a1a1a]">{item.step}</p>
                    <p className="text-[10px] text-[#16a34a] font-bold">{item.date}</p>
                    <p className="text-[10px] text-gray-500 font-medium truncate">{item.loc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Score Breakdown (6 Progress Bars) */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-4">
              <h3 className="text-sm font-extrabold text-[#1a1a1a]">Trust Score Factor Breakdown</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {[
                  { label: 'Blockchain Verified', score: 20, max: 20 },
                  { label: 'Certificate Authentic', score: 18, max: 20 },
                  { label: 'Cold Chain Maintained', score: 16, max: 20 },
                  { label: 'Inspection Passed', score: 15, max: 20 },
                  { label: 'Compliance Status', score: 10, max: 10 },
                  { label: 'ML Quality Score', score: 10, max: 10 },
                ].map((factor, idx) => (
                  <div key={idx} className="space-y-1 bg-[#FAFAF7] p-3 rounded-lg border border-gray-100">
                    <div className="flex justify-between font-bold text-[#1a1a1a]">
                      <span>{factor.label}</span>
                      <span className="text-[#16a34a]">{factor.score}/{factor.max}</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#16a34a] h-full" style={{ width: `${(factor.score / factor.max) * 100}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Assistant Chat */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-4">
              <h3 className="text-sm font-extrabold text-[#1a1a1a] flex items-center gap-2">
                <span>🤖</span> Ask about this product
              </h3>

              {/* Suggestion Chips */}
              <div className="flex flex-wrap gap-2">
                {['Is this authentic?', 'Cold chain status?', 'Pesticide levels safe?'].map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuestionChip(chip)}
                    className="px-3 py-1.5 bg-green-50 border border-green-200 hover:bg-green-100 text-[#16a34a] font-bold text-xs rounded-full transition-colors"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Chat Conversation */}
              <div className="space-y-3 bg-[#FAFAF7] p-4 rounded-xl border border-gray-200 max-h-80 overflow-y-auto text-xs">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-[#16a34a] text-white font-bold rounded-br-none'
                          : 'bg-white text-[#1a1a1a] border border-gray-200 rounded-bl-none shadow-2xs font-medium'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask anything about Batch AG-2835..."
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  className="flex-1 p-2.5 bg-[#FAFAF7] border border-gray-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-[#16a34a]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#16a34a] hover:bg-green-700 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Send →
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
