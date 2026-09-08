'use client';

import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import AgentActivityFeed from '@/components/AgentActivityFeed';

export default function AgentsPage() {
  const [agentLogs, setAgentLogs] = useState<any[]>([]);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/agents/feed');
      const json = await res.json();
      if (json.success) {
        setAgentLogs(json.data);
      }
    } catch (e) {
      console.error('Failed to load agent logs:', e);
    }
  };

  useEffect(() => {
    fetchLogs();
    const interval = setInterval(fetchLogs, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout title="AI Agent Command Center" role="Admin">
      {/* Top Banner Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Active AI Agents</p>
            <p className="text-2xl font-extrabold text-[#16a34a] mt-1">7 Operational</p>
            <span className="text-[11px] font-semibold text-[#16a34a] block mt-1">
              LangGraph / Python Microservice
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-green-100 text-[#16a34a] flex items-center justify-center text-xl font-bold">
            🤖
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Agent Tasks</p>
            <p className="text-2xl font-extrabold text-[#1a1a1a] mt-1">1,482 Executed</p>
            <span className="text-[11px] font-semibold text-gray-500 block mt-1">
              Sub-second Latency
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl font-bold">
            ⚡
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Fraud Flagged</p>
            <p className="text-2xl font-extrabold text-red-600 mt-1">12 Anomalies</p>
            <span className="text-[11px] font-semibold text-red-600 block mt-1">
              Auto Regulator Alert
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center text-xl font-bold">
            🚨
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">RAG Knowledge Base</p>
            <p className="text-2xl font-extrabold text-purple-700 mt-1">4 Countries</p>
            <span className="text-[11px] font-semibold text-purple-600 block mt-1">
              UK, UAE, USA, Japan
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center text-xl font-bold">
            📚
          </div>
        </div>
      </div>

      {/* 7 Agent Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { name: 'Supervisor Agent', icon: '⚙️', role: 'Multi-Agent Orchestration & Dispatch', status: 'ACTIVE', color: 'bg-blue-100 text-blue-800' },
          { name: 'Traceability Agent', icon: '🔍', role: 'Polygon Blockchain & SHA-256 Hash Audit', status: 'ACTIVE', color: 'bg-green-100 text-green-800' },
          { name: 'Fraud Detection Agent', icon: '🚨', role: 'Duplicate Hash & Weight Anomaly Scanner', status: 'ACTIVE', color: 'bg-red-100 text-red-800' },
          { name: 'Compliance Agent (RAG)', icon: '⚖️', role: 'International MRL & Phytosanitary RAG', status: 'ACTIVE', color: 'bg-purple-100 text-purple-800' },
          { name: 'Spoilage Prediction Agent', icon: '🦠', role: 'Perishable Thermal Stress ML Predictor', status: 'ACTIVE', color: 'bg-amber-100 text-amber-800' },
          { name: 'Quality Intelligence Agent', icon: '⭐', role: 'Grade A Assessment & Freshness Index', status: 'ACTIVE', color: 'bg-[#16a34a] text-white' },
        ].map((agent, idx) => (
          <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xl">{agent.icon}</span>
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${agent.color}`}>
                {agent.status}
              </span>
            </div>
            <h3 className="text-sm font-bold text-[#1a1a1a]">{agent.name}</h3>
            <p className="text-xs text-gray-500">{agent.role}</p>
          </div>
        ))}
      </div>

      {/* Live Feed */}
      <AgentActivityFeed />
    </DashboardLayout>
  );
}
