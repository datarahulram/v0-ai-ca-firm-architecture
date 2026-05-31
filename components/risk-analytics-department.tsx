import { useState } from 'react';
import { ChevronDown, ChevronUp, AlertTriangle, TrendingDown, Activity } from 'lucide-react';

export function RiskAnalyticsDepartment() {
  const [selectedRisk, setSelectedRisk] = useState<string>('cash');

  const risks = [
    {
      id: 'cash',
      name: 'Cash Flow Risk',
      severity: 'Medium',
      score: 65,
      description: 'Days cash on hand: 45 days',
      factors: [
        { name: 'Operating Runway', value: 45, unit: 'days', status: 'acceptable' },
        { name: 'Monthly Burn Rate', value: 15, unit: '%', status: 'acceptable' },
        { name: 'Collection Cycle', value: 32, unit: 'days', status: 'good' },
      ],
      recommendations: [
        'Accelerate customer collections',
        'Negotiate extended payment terms with vendors',
        'Build cash reserve buffer to 60 days',
      ],
    },
    {
      id: 'tax',
      name: 'Tax Compliance Risk',
      severity: 'Low',
      score: 95,
      description: 'All filings current and compliant',
      factors: [
        { name: 'GST Filing Status', value: 100, unit: '%', status: 'excellent' },
        { name: 'ITR Status', value: 90, unit: '%', status: 'good' },
        { name: 'Penalty Exposure', value: 0, unit: '₹', status: 'excellent' },
      ],
      recommendations: ['Maintain current filing schedule', 'Archive all documentation for 7 years'],
    },
    {
      id: 'vendor',
      name: 'Vendor Concentration Risk',
      severity: 'Medium',
      score: 58,
      description: '3 key vendors = 45% of expenses',
      factors: [
        { name: 'Top Vendor Dependency', value: 28, unit: '%', status: 'moderate' },
        { name: 'Single-Source Items', value: 8, unit: 'items', status: 'warning' },
        { name: 'Supplier Diversification', value: 62, unit: '%', status: 'acceptable' },
      ],
      recommendations: [
        'Develop backup suppliers for critical items',
        'Negotiate long-term contracts with key vendors',
        'Reduce dependency on top vendor to under 20%',
      ],
    },
  ];

  const selectedRiskData = risks.find((r) => r.id === selectedRisk) || risks[0];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {risks.map((risk) => (
          <button
            key={risk.id}
            onClick={() => setSelectedRisk(risk.id)}
            className={`p-6 border rounded-lg transition-all text-left ${
              selectedRisk === risk.id
                ? 'border-primary bg-primary/5'
                : 'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold">{risk.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{risk.description}</p>
              </div>
              {risk.severity === 'Low' && <Activity className="w-5 h-5 text-green-600" />}
              {risk.severity === 'Medium' && <AlertTriangle className="w-5 h-5 text-yellow-600" />}
              {risk.severity === 'High' && <AlertTriangle className="w-5 h-5 text-red-600" />}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Risk Score</span>
                <span className="font-semibold">{risk.score}/100</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    risk.score >= 80
                      ? 'bg-green-600'
                      : risk.score >= 60
                        ? 'bg-yellow-600'
                        : 'bg-red-600'
                  }`}
                  style={{ width: `${risk.score}%` }}
                />
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="p-6 border border-border rounded-lg bg-card">
        <h3 className="font-semibold mb-4">{selectedRiskData.name} - Detailed Analysis</h3>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold mb-3">Risk Factors</h4>
            <div className="space-y-3">
              {selectedRiskData.factors.map((factor, idx) => (
                <div key={idx} className="p-3 bg-muted/30 rounded">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{factor.name}</span>
                    <span className={`text-sm font-semibold ${
                      factor.status === 'excellent' ? 'text-green-600' :
                      factor.status === 'good' ? 'text-green-600' :
                      factor.status === 'acceptable' ? 'text-yellow-600' :
                      factor.status === 'warning' ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {factor.value} {factor.unit}
                    </span>
                  </div>
                  <div className="w-full bg-border rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        factor.status === 'excellent' || factor.status === 'good'
                          ? 'bg-green-600'
                          : factor.status === 'acceptable'
                            ? 'bg-yellow-600'
                            : 'bg-orange-600'
                      }`}
                      style={{ width: `${Math.min(factor.value, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-4">
            <h4 className="text-sm font-semibold mb-3">Mitigation Strategies</h4>
            <ul className="space-y-2">
              {selectedRiskData.recommendations.map((rec, idx) => (
                <li key={idx} className="flex gap-2 text-sm">
                  <span className="text-primary font-bold">•</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-border rounded-lg bg-card">
          <h4 className="font-semibold mb-3">Key Metrics</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Overall Risk Profile</span>
              <span className="font-semibold">Medium</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Active Risk Items</span>
              <span className="font-semibold">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Overdue Actions</span>
              <span className="font-semibold text-red-600">1</span>
            </div>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg bg-card">
          <h4 className="font-semibold mb-3">Portfolio Health</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-600" />
              <span className="text-sm">Low Risk: 1</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-600" />
              <span className="text-sm">Medium Risk: 2</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-600" />
              <span className="text-sm">High Risk: 0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
