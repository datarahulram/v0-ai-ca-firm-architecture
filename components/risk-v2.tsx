'use client';

import { useState } from 'react';
import { financialDataStore } from '@/lib/financial-engine';
import { AlertTriangle, TrendingDown, BarChart3 } from 'lucide-react';

export function RiskAnalyticsDepartmentV2() {
  const [view, setView] = useState<'dashboard' | 'detailed' | 'mitigation'>('dashboard');
  const [selectedRisk, setSelectedRisk] = useState<string | null>(null);

  const risks = financialDataStore.calculateRisks();

  const getRiskColor = (score: number) => {
    if (score < 30) return 'text-green-600';
    if (score < 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskBgColor = (score: number) => {
    if (score < 30) return 'bg-green-50 border-green-200';
    if (score < 60) return 'bg-yellow-50 border-yellow-200';
    return 'bg-red-50 border-red-200';
  };

  return (
    <div className="space-y-6">
      {/* View Selector */}
      <div className="flex gap-2 border-b border-border">
        {[
          { id: 'dashboard', label: 'Risk Dashboard' },
          { id: 'detailed', label: 'Detailed Analysis' },
          { id: 'mitigation', label: 'Mitigation Strategies' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setView(tab.id as any)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              view === tab.id
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Risk Dashboard */}
      {view === 'dashboard' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {risks.map(risk => (
            <div
              key={risk.id}
              className={`p-6 border rounded-lg cursor-pointer transition-colors hover:shadow-md ${getRiskBgColor(
                risk.risk_score
              )}`}
              onClick={() => {
                setSelectedRisk(risk.id);
                setView('detailed');
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-semibold capitalize">{risk.category.replace('_', ' ')}</h3>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${
                  risk.severity === 'critical' ? 'bg-red-200 text-red-700' :
                  risk.severity === 'high' ? 'bg-orange-200 text-orange-700' :
                  risk.severity === 'medium' ? 'bg-yellow-200 text-yellow-700' :
                  'bg-green-200 text-green-700'
                }`}>
                  {risk.severity.toUpperCase()}
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-end gap-2">
                  <p className={`text-3xl font-light ${getRiskColor(risk.risk_score)}`}>
                    {risk.risk_score}
                  </p>
                  <p className="text-sm text-muted-foreground mb-1">/100</p>
                </div>
              </div>

              <div className="w-full bg-gray-300 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getRiskColor(risk.risk_score).replace('text-', 'bg-')}`}
                  style={{ width: `${risk.risk_score}%` }}
                />
              </div>

              <p className="text-sm mt-3 text-muted-foreground">{risk.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Detailed Analysis */}
      {view === 'detailed' && (
        <div className="space-y-6">
          {selectedRisk ? (
            <>
              {risks
                .filter(r => r.id === selectedRisk)
                .map(risk => (
                  <div key={risk.id} className={`p-6 border rounded-lg ${getRiskBgColor(risk.risk_score)}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="text-2xl font-light capitalize">{risk.category.replace('_', ' ')} Risk</h2>
                        <p className="text-sm text-muted-foreground mt-1">{risk.description}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-4xl font-light ${getRiskColor(risk.risk_score)}`}>
                          {risk.risk_score}
                        </p>
                        <p className="text-xs text-muted-foreground">Risk Score</p>
                      </div>
                    </div>

                    <div className="mt-6">
                      <h3 className="font-semibold mb-3">Risk Factors & Indicators</h3>
                      <ul className="space-y-2">
                        {[
                          `Current ${risk.category.replace('_', ' ')} position`,
                          'Trend analysis and projections',
                          'Comparative metrics vs industry',
                          'Sensitivity to market changes',
                        ].map((factor, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <span className="text-primary font-bold">•</span>
                            <span>{factor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
                      <p className="text-sm font-medium">
                        Recommended Action: Review {risk.category} controls and implement mitigation strategies
                      </p>
                    </div>
                  </div>
                ))}
            </>
          ) : (
            <div className="p-6 border border-border rounded-lg text-center text-muted-foreground">
              Select a risk from the dashboard to view detailed analysis
            </div>
          )}
        </div>
      )}

      {/* Mitigation Strategies */}
      {view === 'mitigation' && (
        <div className="space-y-4">
          {risks.map(risk => (
            <div key={risk.id} className="p-6 border border-border rounded-lg bg-card">
              <h3 className="font-semibold mb-4 capitalize">{risk.category.replace('_', ' ')} - Mitigation Strategies</h3>
              <ul className="space-y-2">
                {risk.mitigation.map((strategy, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4 mt-1 cursor-pointer"
                    />
                    <span className="text-sm">{strategy}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
