'use client';

import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import AgentActivityFeed from '@/components/AgentActivityFeed';

export default function AgentsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-gray-200 shadow-xs">
          <div>
            <h1 className="text-xl font-extrabold text-[#1a1a1a] flex items-center gap-2">
              <span>🤖</span> AI Agent Command Center
            </h1>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              Real-time orchestration of 7 autonomous LangGraph AI agents protecting the agricultural supply chain 24/7.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full text-xs font-bold text-[#16a34a]">
            <span className="pulsing-dot"></span> System Status: All Agents Operational
          </div>
        </div>

        {/* Supervisor Agent Card (Full width, green border, top) */}
        <div className="bg-white p-6 rounded-xl border-2 border-[#16a34a] shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-green-100 border border-green-200 flex items-center justify-center text-2xl text-[#16a34a]">
                👑
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-extrabold text-[#1a1a1a]">Supervisor Agent (Orchestrator)</h2>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-green-100 text-[#16a34a] rounded-full text-[11px] font-extrabold border border-green-200">
                    <span className="pulsing-dot"></span> ACTIVE
                  </span>
                </div>
                <p className="text-xs font-semibold text-gray-600 mt-0.5">
                  Current Task: <strong className="text-[#1a1a1a]">Coordinating fraud investigation for Shipment EX-1923</strong>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-gray-500">Connected Agents:</span>
              <span className="px-2.5 py-1 bg-red-50 text-red-700 border border-red-200 rounded-lg text-xs font-bold">
                🚨 Fraud Detection
              </span>
              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold">
                ⚖️ Compliance
              </span>
              <span className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-lg text-xs font-bold">
                🔍 Traceability
              </span>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-bold">
            <span>Tasks Today: <strong className="text-[#1a1a1a]">847</strong></span>
            <span>Avg Latency: <strong className="text-[#16a34a]">0.8s</strong></span>
            <span>Coordination Success: <strong className="text-[#16a34a]">99.8%</strong></span>
          </div>
        </div>

        {/* Agent Cards Grid (2x3 grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: '🔍',
              name: 'Traceability Agent',
              status: 'Active',
              action: 'Verified ownership chain for AG-2847',
              confidence: 98,
              tasks: 234,
            },
            {
              icon: '⭐',
              name: 'Quality Intelligence Agent',
              status: 'Processing',
              action: 'Estimating shelf life for AG-2841',
              confidence: 87,
              tasks: 156,
            },
            {
              icon: '🦠',
              name: 'Spoilage Prediction Agent',
              status: 'Active',
              action: 'Predicted 94% spoilage risk for EX-1917',
              confidence: 91,
              tasks: 89,
            },
            {
              icon: '🚨',
              name: 'Fraud Detection Agent',
              status: 'Active',
              action: 'FLAGGED: Duplicate certificate on EX-1923',
              confidence: 97,
              tasks: 43,
            },
            {
              icon: '⚖️',
              name: 'Compliance Agent',
              status: 'Active',
              action: 'EU pesticide residue check passed — EX-1923',
              confidence: 99,
              tasks: 178,
            },
            {
              icon: '👤',
              name: 'Consumer Trust Agent',
              status: 'Idle',
              action: "Last: Answered 'Is AG-2835 authentic?' — Yes",
              confidence: 94,
              tasks: 67,
            },
          ].map((agent, idx) => (
            <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{agent.icon}</span>
                  <h3 className="text-xs font-extrabold text-[#1a1a1a]">{agent.name}</h3>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                    agent.status === 'Active'
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : agent.status === 'Processing'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {agent.status === 'Active' && <span className="pulsing-dot"></span>}
                  {agent.status.toUpperCase()}
                </span>
              </div>

              <p className="text-[11px] font-semibold text-gray-700 line-clamp-1">
                {agent.action}
              </p>

              {/* Progress bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold text-gray-500">
                  <span>Confidence Score</span>
                  <span className="text-[#16a34a]">{agent.confidence}%</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#16a34a] h-full" style={{ width: `${agent.confidence}%` }}></div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-500">
                <span>Tasks Today</span>
                <span className="text-[#1a1a1a]">{agent.tasks}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Activity Feed */}
        <AgentActivityFeed />
      </div>
    </DashboardLayout>
  );
}
