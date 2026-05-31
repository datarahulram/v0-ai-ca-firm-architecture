'use client';

import { useState, useEffect } from 'react';
import { financialDataStore } from '@/lib/financial-engine';
import { TrendingUp, TrendingDown, BarChart3 } from 'lucide-react';

export function ForecastCFODepartmentV2() {
  const [view, setView] = useState<'forecast' | 'decisions'>('forecast');
  const [forecasts, setForecasts] = useState(financialDataStore.calculateForecasts());
  const [decisions, setDecisions] = useState(financialDataStore.calculateCFODecisions());

  return (
    <div className="space-y-6">
      {/* View Selector */}
      <div className="flex gap-2 border-b border-border">
        {[
          { id: 'forecast', label: 'Revenue Forecasts' },
          { id: 'decisions', label: 'Strategic Decisions' },
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

      {/* Forecast View */}
      {view === 'forecast' && (
        <div className="space-y-6">
          {/* Scenario Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {forecasts.map((forecast, idx) => (
              <div key={idx} className="p-6 border border-border rounded-lg bg-card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-semibold capitalize">{forecast.scenario} Case</h3>
                    <p className="text-sm text-muted-foreground">{forecast.month}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">{forecast.confidence}%</p>
                    <p className="text-xs text-muted-foreground">Confidence</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Projected Revenue</p>
                    <p className="text-2xl font-light">₹{forecast.revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Projected Expenses</p>
                    <p className="text-xl font-light">₹{forecast.expenses.toLocaleString()}</p>
                  </div>
                  <div className="pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground mb-1">Expected Cash Flow</p>
                    <p
                      className={`text-2xl font-light ${
                        forecast.cash_flow > 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      ₹{forecast.cash_flow.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-4 p-2 bg-primary/10 border border-primary/20 rounded">
                  <p className="text-xs font-medium text-center">
                    {forecast.scenario === 'base'
                      ? 'Most Likely'
                      : forecast.scenario === 'optimistic'
                      ? 'Best Case'
                      : 'Worst Case'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Forecast Table */}
          <div className="p-6 border border-border rounded-lg bg-card">
            <h3 className="font-semibold mb-4">Forecast Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left px-3 py-2 font-medium">Metric</th>
                    <th className="text-right px-3 py-2 font-medium">Base Case</th>
                    <th className="text-right px-3 py-2 font-medium">Optimistic</th>
                    <th className="text-right px-3 py-2 font-medium">Conservative</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      metric: 'Revenue',
                      base: forecasts[0].revenue,
                      opt: forecasts[1].revenue,
                      cons: forecasts[2].revenue,
                    },
                    {
                      metric: 'Expenses',
                      base: forecasts[0].expenses,
                      opt: forecasts[1].expenses,
                      cons: forecasts[2].expenses,
                    },
                    {
                      metric: 'Cash Flow',
                      base: forecasts[0].cash_flow,
                      opt: forecasts[1].cash_flow,
                      cons: forecasts[2].cash_flow,
                    },
                    {
                      metric: 'Confidence',
                      base: forecasts[0].confidence,
                      opt: forecasts[1].confidence,
                      cons: forecasts[2].confidence,
                    },
                  ].map((row, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-muted/50">
                      <td className="px-3 py-2 font-medium">{row.metric}</td>
                      <td className="text-right px-3 py-2">
                        {typeof row.base === 'number' && row.base > 100
                          ? `₹${row.base.toLocaleString()}`
                          : `${row.base}%`}
                      </td>
                      <td className="text-right px-3 py-2 text-green-600">
                        {typeof row.opt === 'number' && row.opt > 100
                          ? `₹${row.opt.toLocaleString()}`
                          : `${row.opt}%`}
                      </td>
                      <td className="text-right px-3 py-2 text-yellow-600">
                        {typeof row.cons === 'number' && row.cons > 100
                          ? `₹${row.cons.toLocaleString()}`
                          : `${row.cons}%`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CFO Decisions View */}
      {view === 'decisions' && (
        <div className="space-y-4">
          {decisions.map(decision => (
            <div
              key={decision.id}
              className={`p-6 border rounded-lg ${
                decision.recommendation === 'recommended'
                  ? 'bg-green-50 border-green-200'
                  : decision.recommendation === 'consider'
                  ? 'bg-yellow-50 border-yellow-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{decision.question}</h3>
                  <p className="text-sm text-muted-foreground mt-1">Estimated Cost: ₹{decision.cost.toLocaleString()}</p>
                </div>
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded whitespace-nowrap ${
                    decision.recommendation === 'recommended'
                      ? 'bg-green-200 text-green-700'
                      : decision.recommendation === 'consider'
                      ? 'bg-yellow-200 text-yellow-700'
                      : 'bg-red-200 text-red-700'
                  }`}
                >
                  {decision.recommendation === 'recommended'
                    ? '✓ Recommended'
                    : decision.recommendation === 'consider'
                    ? '⚠ Consider'
                    : '✗ Not Recommended'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Confidence Score</p>
                  <p className="text-2xl font-light">{decision.confidence}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Financial Impact</p>
                  <p className="text-2xl font-light text-primary">
                    {decision.confidence > 75 ? '↑ High' : decision.confidence > 50 ? '→ Medium' : '↓ Low'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2">Key Reasoning:</h4>
                  <ul className="space-y-1">
                    {decision.reasoning.map((reason, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-primary font-bold mt-0.5">•</span>
                        <span>{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Risk Factors:</h4>
                  <ul className="space-y-1">
                    {decision.risk_factors.map((factor, idx) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <span className="text-yellow-600 font-bold mt-0.5">⚠</span>
                        <span>{factor}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity">
                View Detailed Analysis
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
