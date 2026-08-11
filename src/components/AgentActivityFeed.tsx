'use client';

import React from 'react';

export interface FeedItem {
  id: string;
  time: string;
  agent: string;
  agentType: 'fraud' | 'compliance' | 'traceability' | 'quality' | 'consumer';
  title: string;
  details: string;
  badge?: { text: string; color: 'red' | 'green' | 'amber' | 'blue' };
}

const feedData: FeedItem[] = [
  {
    id: '1',
    time: '14:23:01',
    agent: '🚨 Fraud Detection Agent',
    agentType: 'fraud',
    title: 'Detected duplicate certificate hash for Batch AG-2847',
    details: 'Risk Score: 94/100 | Action: FLAGGED | Escalated to Regulator Dashboard',
    badge: { text: 'FLAGGED', color: 'red' },
  },
  {
    id: '2',
    time: '14:22:45',
    agent: '⚖️ Compliance Agent',
    agentType: 'compliance',
    title: 'EU pesticide residue compliance verified for Shipment EX-1923',
    details: 'Regulation: EC 396/2005 | Result: PASSED',
    badge: { text: 'PASSED', color: 'green' },
  },
  {
    id: '3',
    time: '14:22:12',
    agent: '⭐ Quality Intelligence Agent',
    agentType: 'quality',
    title: 'Shelf life estimated for Batch AG-2841: 12 days',
    details: 'Confidence: 87% | Factors: Temperature 5.2°C, Humidity 78%, Transit: 3 days',
    badge: { text: 'COMPLETED', color: 'blue' },
  },
  {
    id: '4',
    time: '14:21:58',
    agent: '🔍 Traceability Agent',
    agentType: 'traceability',
    title: 'Ownership chain verified for AG-2835',
    details: '6 chain events confirmed | No missing transactions | AUTHENTIC',
    badge: { text: 'AUTHENTIC', color: 'green' },
  },
  {
    id: '5',
    time: '14:21:34',
    agent: '🦠 Spoilage Prediction Agent',
    agentType: 'quality',
    title: 'HIGH RISK: Shipment EX-1917 — 94% spoilage probability within 48 hours',
    details: 'Recommendation: Prioritize immediate delivery',
    badge: { text: 'HIGH RISK', color: 'amber' },
  },
  {
    id: '6',
    time: '14:21:12',
    agent: '⚖️ Compliance Agent',
    agentType: 'compliance',
    title: 'Cross-border regulatory conflict detected',
    details: 'Japan MRL for pesticide Chlorpyrifos: 0.01 ppm vs India MRL: 0.5 ppm — CONFLICT FLAGGED for EX-1904',
    badge: { text: 'CONFLICT', color: 'red' },
  },
  {
    id: '7',
    time: '14:20:47',
    agent: '👤 Consumer Trust Agent',
    agentType: 'consumer',
    title: 'Consumer query answered for product AG-2835',
    details: 'Q: "Is this Basmati Rice authentic?" | A: "Yes — 6 blockchain checkpoints verified"',
    badge: { text: 'ANSWERED', color: 'blue' },
  },
  {
    id: '8',
    time: '14:20:23',
    agent: '🔍 Traceability Agent',
    agentType: 'traceability',
    title: 'Missing transaction detected in chain for AG-2829',
    details: 'Expected: Mandi registration | Found: Direct to exporter | ANOMALY FLAGGED',
    badge: { text: 'ANOMALY', color: 'amber' },
  },
];

const borderColorMap = {
  traceability: 'border-l-[#16a34a]', // Green
  compliance: 'border-l-blue-600',    // Blue
  fraud: 'border-l-[#dc2626]',         // Red
  quality: 'border-l-[#d97706]',       // Amber
  consumer: 'border-l-purple-600',     // Purple
};

export default function AgentActivityFeed() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-[#1a1a1a] flex items-center gap-2">
          <span>📡</span> Live Agent Activity Feed
        </h3>
        <span className="text-xs font-semibold text-gray-500 flex items-center gap-1.5">
          <span className="pulsing-dot"></span> Streaming Real-time
        </span>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
        {feedData.map((item) => (
          <div
            key={item.id}
            className={`p-3.5 bg-[#FAFAF7] rounded-xl border border-gray-200 border-l-4 ${
              borderColorMap[item.agentType]
            } transition-all hover:bg-white hover:shadow-xs animate-feed-slide-in`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-gray-400 font-medium">[{item.time}]</span>
                <span className="text-xs font-bold text-[#1a1a1a]">{item.agent}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    item.badge.color === 'red'
                      ? 'bg-red-100 text-red-700'
                      : item.badge.color === 'green'
                      ? 'bg-green-100 text-green-700'
                      : item.badge.color === 'amber'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-blue-100 text-blue-700'
                  }`}
                >
                  {item.badge.text}
                </span>
              )}
            </div>
            <p className="text-xs font-bold text-[#1a1a1a] mt-1">{item.title}</p>
            <p className="text-[11px] text-gray-500 mt-0.5 font-mono">{item.details}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
