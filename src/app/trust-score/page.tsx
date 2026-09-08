'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import TrustScoreGauge from '@/components/TrustScoreGauge';

export default function TrustScorePage() {
  const [selectedBatchCode, setSelectedBatchCode] = useState('AG-2847');
  const [scoreData, setScoreData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchScore = async (batchCode: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/trust-score/${batchCode}`);
      const json = await res.json();
      if (json.success) {
        setScoreData(json.data);
      }
    } catch (e) {
      console.error('Failed to fetch trust score:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchScore(selectedBatchCode);
  }, [selectedBatchCode]);

  return (
    <DashboardLayout title="Trust Score Engine" role="Farmer">
      {/* Header Selector */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-[#1a1a1a]">⭐ Explainable Trust Score Breakdown</h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Dynamic 100-point algorithm backed by SHAP contribution weights & Polygon audit trails.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-gray-500">Select Batch:</span>
          {['AG-2847', 'AG-2841', 'AG-2835', 'AG-2829'].map((code) => (
            <button
              key={code}
              onClick={() => setSelectedBatchCode(code)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold border transition-all ${selectedBatchCode === code
                  ? 'bg-[#16a34a] text-white border-[#16a34a]'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                }`}
            >
              {code}
            </button>
          ))}
        </div>
      </div>

      {scoreData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gauge & Plain AI Card */}
          <div className="lg:col-span-1 bg-white rounded-2xl p-6 border border-gray-200 shadow-xs text-center space-y-4">
            <div className="inline-block p-2 bg-green-50 rounded-2xl border border-green-100">
              <TrustScoreGauge score={scoreData.finalScore} size={160} />
            </div>

            <div>
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-green-100 text-[#16a34a]">
                {scoreData.riskLevel?.toUpperCase()} RATING
              </span>
              <h3 className="text-lg font-bold text-[#1a1a1a] mt-2">{scoreData.crop}</h3>
              <p className="text-xs text-gray-500">{scoreData.farmerName}</p>
            </div>

            <div className="p-4 bg-[#FAFAF7] rounded-xl border border-gray-200 text-left">
              <span className="text-[11px] font-bold text-[#16a34a] uppercase tracking-wider block mb-1">
                🗣️ Farmer-Friendly Summary
              </span>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                {scoreData.plainAi}
              </p>
            </div>
          </div>

          {/* SHAP Factors Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-200 shadow-xs space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h3 className="text-base font-bold text-[#1a1a1a]">📊 6-Factor Algorithm & SHAP Contributions</h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Each component contributes up to 20 points towards the 100-point trust score.
              </p>
            </div>

            <div className="space-y-3">
              {scoreData.factors?.map((f: any, idx: number) => (
                <div key={idx} className="p-3.5 bg-[#FAFAF7] rounded-xl border border-gray-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1a1a1a]">{f.name}</span>
                    <span className="font-extrabold text-[#16a34a]">{f.score} / {f.max} pts</span>
                  </div>

                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#16a34a] h-full rounded-full transition-all duration-500"
                      style={{ width: `${(f.score / f.max) * 100}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-gray-500">{f.desc}</span>
                    <span className={`font-mono font-bold ${f.shap >= 0 ? 'text-[#16a34a]' : 'text-red-600'}`}>
                      SHAP: {f.shap >= 0 ? `+${f.shap}` : f.shap}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
