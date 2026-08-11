'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import TrustScoreGauge from '@/components/TrustScoreGauge';

const batchTrustData: Record<string, { crop: string; farmer: string; score: number; factors: Array<{ name: string; score: number; max: number; desc: string; shap: number }>; risks: string[]; plainAi: string }> = {
  'AG-2847': {
    crop: 'Alphonso Mango',
    farmer: 'Rajesh Kumar (Nashik, Maharashtra)',
    score: 87,
    factors: [
      { name: 'Blockchain Verification', score: 18, max: 20, desc: 'All 12 supply chain events recorded on Polygon blockchain with valid hashes', shap: 3.2 },
      { name: 'Certificate Authenticity', score: 16, max: 20, desc: 'Phytosanitary and GLOBALG.A.P certificates verified against APEDA registry', shap: 2.1 },
      { name: 'Cold Chain Integrity', score: 15, max: 20, desc: 'Minor temperature deviation of 1.2°C during JNPT port transfer (13°C → 14.2°C)', shap: -0.8 },
      { name: 'Inspection Results', score: 17, max: 20, desc: 'APEDA pre-shipment inspection passed with Grade A export classification', shap: 2.8 },
      { name: 'Regulatory Compliance', score: 12, max: 20, desc: 'EU allergen declaration form pending review — non-critical documentation gap', shap: -1.5 },
      { name: 'ML Quality Assessment', score: 9, max: 20, desc: 'Computer vision detected 8% color variation from premium grade baseline', shap: -2.3 },
    ],
    risks: [
      'ML Quality Score Below Peak Baseline: Computer vision detected 8% color variation in ripening stage compared to premium baseline.',
      'Regulatory Compliance Gap: EU allergen declaration form pending final clearance by exporter.',
      'Minor Cold Chain Temperature Breach: 1.2°C temporary increase during Mumbai JNPT loading stage.',
    ],
    plainAi:
      'Rajesh bhai, your Alphonso Mango batch AG-2847 has received a Trust Score of 87 out of 100. This is a HIGH PREMIUM score. Your strongest factors are complete blockchain registration and Grade A APEDA inspection clearance. The score was slightly adjusted due to an 8% color variation detected by our quality camera and a temporary 1.2°C temperature shift during port loading at JNPT. Buyers can trust this batch with high confidence!',
  },
  'AG-2841': {
    crop: 'Nashik Grapes',
    farmer: 'Suresh Patil (Nashik, Maharashtra)',
    score: 76,
    factors: [
      { name: 'Blockchain Verification', score: 16, max: 20, desc: '8 supply chain events confirmed on-chain', shap: 1.5 },
      { name: 'Certificate Authenticity', score: 15, max: 20, desc: 'Phytosanitary certificate valid', shap: 1.2 },
      { name: 'Cold Chain Integrity', score: 12, max: 20, desc: 'Temp reached 5.2°C in transit (Threshold: 4.0°C)', shap: -2.4 },
      { name: 'Inspection Results', score: 14, max: 20, desc: 'Standard Grade B classification', shap: 0.8 },
      { name: 'Regulatory Compliance', score: 10, max: 20, desc: 'UKCA marking pending approval', shap: -1.8 },
      { name: 'ML Quality Assessment', score: 9, max: 20, desc: 'Sugar brix content normal', shap: -0.5 },
    ],
    risks: [
      'Cold Storage Temp Alert: Temperature exceeded 4°C during truck transit.',
      'UK Compliance Clearance Pending: Documentation awaiting final UKCA safety audit.',
    ],
    plainAi:
      'Suresh bhai, your Grapes batch AG-2841 scored 76/100. The score is solid, but cold chain temperature rose to 5.2°C during highway transit, which reduced the freshness score. Ensure refrigeration is kept below 4°C for future shipments.',
  },
  'AG-2835': {
    crop: 'Basmati Rice',
    farmer: 'Rajesh Kumar (Amritsar, Punjab)',
    score: 92,
    factors: [
      { name: 'Blockchain Verification', score: 20, max: 20, desc: '100% of transaction events verified on Polygon', shap: 4.0 },
      { name: 'Certificate Authenticity', score: 18, max: 20, desc: 'GI tag & FSSAI certificates fully validated', shap: 3.1 },
      { name: 'Cold Chain Integrity', score: 18, max: 20, desc: 'Optimal dry ambient temperature maintained', shap: 2.2 },
      { name: 'Inspection Results', score: 18, max: 20, desc: 'Export Grade A+ certified by APEDA', shap: 3.5 },
      { name: 'Regulatory Compliance', score: 10, max: 10, desc: '100% compliance across UAE & EU standards', shap: 1.8 },
      { name: 'ML Quality Assessment', score: 8, max: 10, desc: 'Grain length & moisture analysis verified', shap: 0.9 },
    ],
    risks: ['Minor moisture content fluctuation (11.8% vs target 12.0%). Fully within safe limits.'],
    plainAi:
      'Rajesh bhai, your Basmati Rice batch AG-2835 achieved a top-tier Trust Score of 92/100! All blockchain records, GI certification, and export checks are 100% authentic with zero safety flags.',
  },
  'AG-2829': {
    crop: 'Kesar Saffron',
    farmer: 'Meena Sharma (Kashmiri Hub)',
    score: 95,
    factors: [
      { name: 'Blockchain Verification', score: 20, max: 20, desc: 'Cryptographic hash verified on Polygon testnet', shap: 4.2 },
      { name: 'Certificate Authenticity', score: 19, max: 20, desc: 'Kashmir GI Tag & ISO 3632 Grade 1 certified', shap: 3.8 },
      { name: 'Cold Chain Integrity', score: 19, max: 20, desc: 'Humidity controlled <12%', shap: 2.9 },
      { name: 'Inspection Results', score: 19, max: 20, desc: 'Crocin color strength 240+ (Highest Grade)', shap: 3.6 },
      { name: 'Regulatory Compliance', score: 10, max: 10, desc: 'Full compliance for Japan & USA FDA', shap: 2.0 },
      { name: 'ML Quality Assessment', score: 8, max: 10, desc: 'Spectral purity scan 99.4%', shap: 1.1 },
    ],
    risks: ['No active risks detected. Certified World Class Premium Quality.'],
    plainAi:
      'Meenaji, your Kesar Saffron batch AG-2829 achieved an extraordinary 95/100 Trust Score. It has passed all optical purity scans and GI verification with flying colors!',
  },
};

export default function TrustScorePage() {
  const [selectedBatch, setSelectedBatch] = useState('AG-2847');
  const batchData = batchTrustData[selectedBatch] || batchTrustData['AG-2847'];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
          <div>
            <h1 className="text-xl font-extrabold text-[#1a1a1a] flex items-center gap-2">
              <span>📊</span> Explainable Trust Intelligence
            </h1>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              Transparent, SHAP-driven AI trust scoring explaining exact positive and negative factor contributions.
            </p>
          </div>

          {/* Batch Selector */}
          <div className="flex items-center gap-2 bg-[#FAFAF7] p-2 rounded-xl border border-gray-200">
            <span className="text-xs font-bold text-gray-600">Select Batch:</span>
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="bg-white p-1.5 rounded-lg border border-gray-300 text-xs font-extrabold text-[#16a34a]"
            >
              <option value="AG-2847">AG-2847 (Alphonso Mango - 87)</option>
              <option value="AG-2841">AG-2841 (Nashik Grapes - 76)</option>
              <option value="AG-2835">AG-2835 (Basmati Rice - 92)</option>
              <option value="AG-2829">AG-2829 (Kesar Saffron - 95)</option>
            </select>
          </div>
        </div>

        {/* Top Section: Trust Score Instrument Gauge */}
        <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-xs text-center flex flex-col items-center justify-center space-y-4">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
            Overall Verified Trust Score — {batchData.crop} ({selectedBatch})
          </span>

          <TrustScoreGauge score={batchData.score} size={200} />

          <div>
            <p className="text-base font-extrabold text-[#1a1a1a]">{batchData.farmer}</p>
            <p className="text-xs text-[#16a34a] font-bold mt-0.5">✓ Polygon Blockchain Hash Verified: 0x7f3a...4d92</p>
          </div>
        </div>

        {/* SHAP Factor Breakdown Cards (2x3 Grid) */}
        <div className="space-y-3">
          <h2 className="text-sm font-extrabold text-[#1a1a1a] flex items-center gap-2">
            <span>🔍</span> SHAP Explainability & Factor Weight Breakdown
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {batchData.factors.map((factor, idx) => {
              const isPositive = factor.shap >= 0;
              return (
                <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold text-[#1a1a1a]">{factor.name}</span>
                    <span className="font-extrabold text-[#16a34a]">{factor.score}/{factor.max}</span>
                  </div>

                  <p className="text-[11px] text-gray-600 font-medium leading-relaxed">{factor.desc}</p>

                  {/* SHAP Weight Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[10px] font-bold">
                      <span className="text-gray-400">SHAP Impact Weight</span>
                      <span className={isPositive ? 'text-[#16a34a]' : 'text-[#dc2626]'}>
                        {isPositive ? `+${factor.shap}` : factor.shap}
                      </span>
                    </div>

                    <div className="w-full bg-gray-100 h-2 rounded-full relative overflow-hidden flex items-center">
                      <div className="w-1/2 h-full border-r border-gray-300"></div>
                      <div
                        className={`h-full ${isPositive ? 'bg-[#16a34a]' : 'bg-[#dc2626]'}`}
                        style={{
                          width: `${Math.abs(factor.shap) * 15}%`,
                          marginLeft: isPositive ? '0' : `-${Math.abs(factor.shap) * 15}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Risk Factors Panel */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-xs space-y-3">
          <h2 className="text-sm font-extrabold text-[#dc2626] flex items-center gap-2">
            <span>⚠️</span> Identified Score Penalization & Risk Factors
          </h2>

          <div className="space-y-2 text-xs">
            {batchData.risks.map((risk, idx) => (
              <div key={idx} className="p-3 bg-amber-50 rounded-xl border border-amber-200 border-l-4 border-l-[#d97706] font-semibold text-amber-900">
                • {risk}
              </div>
            ))}
          </div>
        </div>

        {/* Farmer-Friendly AI Plain Language Explanation */}
        <div className="bg-white p-6 rounded-xl border-2 border-[#16a34a] shadow-xs space-y-3">
          <h2 className="text-sm font-extrabold text-[#16a34a] flex items-center gap-2">
            <span>🤖</span> AI Explanation — In Simple Words for Farmer
          </h2>
          <div className="p-4 bg-green-50 rounded-xl border border-green-200 text-xs font-semibold text-green-950 leading-relaxed">
            "{batchData.plainAi}"
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
