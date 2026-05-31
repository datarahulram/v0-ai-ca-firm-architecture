import { useState } from 'react';
import { TrendingUp, BarChart3, Calendar } from 'lucide-react';

export function ForecastCFODepartment() {
  const [forecastPeriod, setForecastPeriod] = useState('90');

  const scenarios = [
    {
      name: 'Base Case',
      description: 'Conservative growth assumptions',
      revenue30: '₹28.5L',
      revenue90: '₹92.3L',
      confidence: 88,
      cashFlow: '₹18.2L',
    },
    {
      name: 'Optimistic Case',
      description: 'Accelerated customer acquisition',
      revenue30: '₹32.1L',
      revenue90: '₹105.8L',
      confidence: 65,
      cashFlow: '₹22.5L',
    },
    {
      name: 'Conservative Case',
      description: 'Market headwinds scenario',
      revenue30: '₹24.2L',
      revenue90: '₹78.5L',
      confidence: 72,
      cashFlow: '₹14.1L',
    },
  ];

  const cfoDecisions = [
    {
      question: 'Can I hire 5 employees? (₹25L annual cost)',
      recommendation: 'Recommended',
      confidence: 87,
      reasoning: [
        'Cash reserves sufficient for 12+ months',
        'Revenue growth trajectory supports expansion',
        'Operational bottlenecks require headcount',
      ],
      risks: ['Slightly reduces cash buffer', 'Assumes revenue targets are met'],
    },
    {
      question: 'Should I apply for ₹1Cr working capital loan?',
      recommendation: 'Consider with Conditions',
      confidence: 72,
      reasoning: [
        'Strong revenue trajectory supports repayment',
        'Could accelerate growth initiatives',
        'Interest costs = 2-3% of revenue',
      ],
      risks: ['High debt-to-equity ratio impact', 'Requires collateral/guarantees'],
    },
    {
      question: 'Can I invest ₹15L in new product line?',
      recommendation: 'Not Recommended Now',
      confidence: 58,
      reasoning: [
        'Better to build 90-day cash buffer first',
        'Current product line still scaling',
        'Market saturation unclear',
      ],
      risks: ['Opportunity cost if market moves fast', 'Competitor might enter first'],
    },
  ];

  return (
    <div className="space-y-6">
      {/* Financial Forecasts */}
      <div className="border border-border rounded-lg bg-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Revenue & Cash Flow Forecasts
          </h3>
        </div>

        <div className="px-6 py-4 space-y-6">
          {scenarios.map((scenario, idx) => (
            <div key={idx} className="pb-4 border-b border-border last:border-b-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold">{scenario.name}</h4>
                  <p className="text-xs text-muted-foreground">{scenario.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Confidence</p>
                  <p className="font-semibold text-primary">{scenario.confidence}%</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-3 bg-muted/30 rounded">
                  <p className="text-xs text-muted-foreground mb-1">30-Day Revenue</p>
                  <p className="font-semibold">{scenario.revenue30}</p>
                </div>
                <div className="p-3 bg-muted/30 rounded">
                  <p className="text-xs text-muted-foreground mb-1">90-Day Revenue</p>
                  <p className="font-semibold">{scenario.revenue90}</p>
                </div>
                <div className="p-3 bg-muted/30 rounded">
                  <p className="text-xs text-muted-foreground mb-1">Cash Position</p>
                  <p className="font-semibold text-green-600">{scenario.cashFlow}</p>
                </div>
              </div>

              <div className="mt-3 w-full bg-border rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${scenario.confidence}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CFO Decisions */}
      <div className="space-y-4">
        <h3 className="font-semibold flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Strategic Decision Analysis
        </h3>

        {cfoDecisions.map((decision, idx) => (
          <div key={idx} className="border border-border rounded-lg bg-card p-6">
            <div className="flex items-start justify-between mb-4">
              <h4 className="font-semibold text-sm">{decision.question}</h4>
              <span
                className={`px-3 py-1 rounded font-semibold text-xs ${
                  decision.recommendation === 'Recommended'
                    ? 'bg-green-100 text-green-700'
                    : decision.recommendation === 'Consider with Conditions'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-700'
                }`}
              >
                {decision.recommendation}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-muted-foreground mb-2">Confidence Score</p>
                <div className="flex items-end gap-2">
                  <p className="text-2xl font-light">{decision.confidence}%</p>
                  <div className="flex-1 h-1 bg-border rounded-full">
                    <div
                      className="h-1 bg-primary rounded-full"
                      style={{ width: `${decision.confidence}%` }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-2">Key Reasoning</p>
                <ul className="space-y-1">
                  {decision.reasoning.slice(0, 2).map((reason, i) => (
                    <li key={i} className="text-xs flex gap-2">
                      <span className="text-primary">✓</span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2">RISK FACTORS</p>
              <ul className="space-y-1">
                {decision.risks.map((risk, i) => (
                  <li key={i} className="text-xs flex gap-2 text-yellow-700">
                    <span>⚠</span>
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border border-border rounded-lg bg-card">
          <h4 className="font-semibold mb-4">Current Position</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cash Balance</span>
              <span className="font-semibold">₹58.4L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Monthly Burn</span>
              <span className="font-semibold">₹12.5L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Runway</span>
              <span className="font-semibold">4.7 months</span>
            </div>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg bg-card">
          <h4 className="font-semibold mb-4">Q3 Targets</h4>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Revenue Target</span>
              <span className="font-semibold">₹92.3L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Margin Target</span>
              <span className="font-semibold">34%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Burn Target</span>
              <span className="font-semibold">-₹12.5L</span>
            </div>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg bg-card">
          <h4 className="font-semibold mb-4">Action Items</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>Review hiring timeline</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>Plan debt structure</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary">→</span>
              <span>Build 90-day buffer</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
