'use client';

import { MultiEngineReport } from '@/lib/types';
import { useState } from 'react';
import { ChevronDown, AlertTriangle, CheckCircle2, TrendingUp } from 'lucide-react';

export function MultiEnginePanel({ report }: { report: MultiEngineReport }) {
  const [expandedEngine, setExpandedEngine] = useState<string>('documentAnalyzer');

  const engines = [
    { key: 'documentAnalyzer', label: 'Document Analyzer', icon: '📄' },
    { key: 'bookkeeper', label: 'Bookkeeper', icon: '📊' },
    { key: 'taxAdvisor', label: 'Tax Advisor', icon: '📋' },
    { key: 'complianceChecker', label: 'Compliance', icon: '✓' },
    { key: 'auditEngine', label: 'Audit Engine', icon: '🔍' },
    { key: 'riskAnalyzer', label: 'Risk Analyzer', icon: '⚠️' },
    { key: 'forecastEngine', label: 'Forecast Engine', icon: '📈' },
    { key: 'analyticsEngine', label: 'Analytics Engine', icon: '📉' },
  ];

  const getEngineData = (key: string) => {
    return (report as any)[key];
  };

  return (
    <div className="space-y-3">
      {engines.map((engine) => {
        const data = getEngineData(engine.key);
        const isExpanded = expandedEngine === engine.key;
        const hasAlerts = data.alerts.length > 0;

        return (
          <div key={engine.key} className="border border-border rounded-lg overflow-hidden bg-card hover:border-border transition-colors">
            <button
              onClick={() => setExpandedEngine(isExpanded ? '' : engine.key)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{engine.icon}</span>
                <div className="text-left">
                  <p className="font-medium text-sm">{engine.label}</p>
                  <p className="text-xs text-muted-foreground">
                    Quality: <span className="font-semibold">{data.dataQuality}%</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {hasAlerts && (
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                )}
                <ChevronDown
                  className={`w-4 h-4 text-muted-foreground transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                />
              </div>
            </button>

            {isExpanded && (
              <div className="px-6 py-4 border-t border-border space-y-4 bg-muted/30">
                {/* Findings */}
                {data.findings.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Findings</h4>
                    <ul className="space-y-1">
                      {data.findings.map((finding: string, idx: number) => (
                        <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                          <CheckCircle2 className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Recommendations */}
                {data.recommendations.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Recommendations</h4>
                    <ul className="space-y-1">
                      {data.recommendations.map((rec: string, idx: number) => (
                        <li key={idx} className="text-sm text-foreground flex items-start gap-2">
                          <TrendingUp className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Alerts */}
                {data.alerts.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Alerts</h4>
                    <ul className="space-y-1">
                      {data.alerts.map((alert: string, idx: number) => (
                        <li key={idx} className="text-sm text-red-600 dark:text-red-400 flex items-start gap-2">
                          <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <span>{alert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
