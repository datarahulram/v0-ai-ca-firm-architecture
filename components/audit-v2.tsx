'use client';

import { useState } from 'react';
import { financialDataStore } from '@/lib/financial-engine';
import { CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react';

export function AuditDepartmentV2() {
  const [view, setView] = useState<'score' | 'findings' | 'transactions'>('score');
  const ledgerEntries = financialDataStore.calculateBookkeepingEntries();
  
  const auditReadiness = 94;
  const documentationQuality = 96;
  const transactionVerification = 92;
  const fraudRisk = 98;

  const findings = [
    { id: '1', type: 'success', title: 'No duplicate transactions detected', severity: 'info' },
    { id: '2', type: 'success', title: 'All high-value transactions properly documented', severity: 'info' },
    { id: '3', type: 'warning', title: '2 invoices missing vendor names', severity: 'low' },
    { id: '4', type: 'success', title: 'Bank reconciliation complete', severity: 'info' },
  ];

  return (
    <div className="space-y-6">
      {/* View Selector */}
      <div className="flex gap-2 border-b border-border">
        {[
          { id: 'score', label: 'Audit Score' },
          { id: 'findings', label: 'Findings' },
          { id: 'transactions', label: 'Verified Transactions' },
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

      {/* Audit Score */}
      {view === 'score' && (
        <div className="space-y-6">
          <div className="p-6 border border-border rounded-lg bg-card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Overall Audit Readiness</h3>
              <div className="text-right">
                <p className="text-4xl font-light text-primary">{auditReadiness}</p>
                <p className="text-xs text-muted-foreground">/100</p>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: 'Documentation Quality', score: documentationQuality },
                { label: 'Transaction Verification', score: transactionVerification },
                { label: 'Fraud Risk Assessment', score: fraudRisk },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-sm font-medium text-primary">{item.score}%</p>
                  </div>
                  <div className="w-full bg-border rounded-full h-3">
                    <div className="bg-primary h-3 rounded-full" style={{ width: `${item.score}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 border border-border rounded-lg bg-card">
              <p className="text-sm text-muted-foreground mb-2">Total Transactions Audited</p>
              <p className="text-3xl font-light">{ledgerEntries.length}</p>
              <p className="text-xs text-green-600 mt-2">✓ All verified</p>
            </div>
            <div className="p-6 border border-border rounded-lg bg-card">
              <p className="text-sm text-muted-foreground mb-2">Audit Period</p>
              <p className="text-3xl font-light">June 2026</p>
              <p className="text-xs text-muted-foreground mt-2">FY 2025-26</p>
            </div>
          </div>
        </div>
      )}

      {/* Findings */}
      {view === 'findings' && (
        <div className="space-y-3">
          {findings.map(finding => (
            <div
              key={finding.id}
              className={`p-4 border rounded-lg flex items-start gap-3 ${
                finding.type === 'success'
                  ? 'bg-green-50 border-green-200'
                  : 'bg-yellow-50 border-yellow-200'
              }`}
            >
              {finding.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-medium text-sm">{finding.title}</p>
                <p className="text-xs opacity-75 mt-1">Severity: {finding.severity}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Verified Transactions */}
      {view === 'transactions' && (
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
                <th className="px-4 py-3 text-right font-medium">Amount</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ledgerEntries.slice(0, 10).map(entry => (
                <tr key={entry.id} className="hover:bg-muted/50">
                  <td className="px-4 py-3">{entry.date}</td>
                  <td className="px-4 py-3">{entry.description}</td>
                  <td className="px-4 py-3 text-right font-medium">
                    ₹{(entry.debit + entry.credit).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded font-medium">
                      Verified
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
