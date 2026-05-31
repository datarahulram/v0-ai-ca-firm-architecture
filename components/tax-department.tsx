import { useState } from 'react';
import { ChevronDown, ChevronUp, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

export function TaxDepartment() {
  const [expandedTab, setExpandedTab] = useState<string>('overview');

  const taxComponents = [
    {
      id: 'gst',
      label: 'GST Management',
      icon: '📋',
      data: {
        liability: '₹45,230',
        filedReturns: 12,
        pendingReturns: 0,
        nextDeadline: '2026-06-15',
        inputCredits: '₹18,500',
      },
    },
    {
      id: 'income-tax',
      label: 'Income Tax',
      icon: '💰',
      data: {
        taxableIncome: '₹3,82,100',
        taxComputed: '₹68,778',
        taxPaid: '₹65,000',
        refundDue: '₹3,778',
        deadline: '2026-09-30',
      },
    },
    {
      id: 'tds',
      label: 'TDS/TCS',
      icon: '🏦',
      data: {
        collected: '₹28,450',
        deposited: '₹28,450',
        pending: '₹0',
        penalties: '₹0',
        compliance: '100%',
      },
    },
  ];

  const recommendations = [
    { type: 'critical', text: 'Review GST return for potential input credits optimization' },
    { type: 'high', text: 'Plan quarterly tax payments to minimize interest liability' },
    { type: 'medium', text: 'Consider income-splitting strategy for better tax efficiency' },
    { type: 'low', text: 'Document all business-related travel expenses for deduction' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {taxComponents.map((comp) => (
          <div key={comp.id} className="p-6 border border-border rounded-lg bg-card">
            <p className="text-2xl mb-2">{comp.icon}</p>
            <p className="text-sm font-semibold text-muted-foreground mb-4">{comp.label}</p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Primary Metric</span>
                <span className="font-semibold">{Object.values(comp.data)[0]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border border-border rounded-lg bg-card">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold">Tax Planning Recommendations</h3>
        </div>
        <div className="px-6 py-4 space-y-3">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="flex gap-3 p-3 rounded bg-muted/30">
              {rec.type === 'critical' && <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />}
              {rec.type === 'high' && <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0" />}
              {rec.type === 'medium' && <TrendingUp className="w-5 h-5 text-yellow-600 flex-shrink-0" />}
              {rec.type === 'low' && <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />}
              <p className="text-sm">{rec.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-border rounded-lg bg-card overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-semibold">Tax Calculation Worksheet</h3>
        </div>
        <div className="px-6 py-4">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between p-2 border-b border-border">
              <span>Gross Income</span>
              <span className="font-semibold">₹5,85,000</span>
            </div>
            <div className="flex justify-between p-2 border-b border-border">
              <span>Business Expenses</span>
              <span className="font-semibold">-₹1,50,000</span>
            </div>
            <div className="flex justify-between p-2 border-b border-border">
              <span>Deductions (80C, etc.)</span>
              <span className="font-semibold">-₹52,900</span>
            </div>
            <div className="flex justify-between p-2 bg-muted/50 rounded font-semibold">
              <span>Taxable Income</span>
              <span>₹3,82,100</span>
            </div>
            <div className="flex justify-between p-2 border-t border-border text-primary font-semibold">
              <span>Estimated Tax</span>
              <span>₹68,778</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
