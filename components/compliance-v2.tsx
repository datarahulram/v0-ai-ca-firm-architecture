'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';

interface ComplianceItem {
  id: string;
  name: string;
  frequency: string;
  deadline: string;
  daysLeft: number;
  status: 'compliant' | 'pending' | 'due_soon' | 'overdue';
  lastFiled?: string;
}

export function ComplianceDepartmentV2() {
  const [view, setView] = useState<'timeline' | 'checklist' | 'penalties'>('timeline');
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([
    {
      id: '1',
      name: 'GST Return Filing',
      frequency: 'Monthly',
      deadline: '2026-07-15',
      daysLeft: 14,
      status: 'pending',
      lastFiled: '2026-05-31',
    },
    {
      id: '2',
      name: 'Income Tax Return',
      frequency: 'Annual',
      deadline: '2026-09-30',
      daysLeft: 122,
      status: 'pending',
      lastFiled: '2025-09-30',
    },
    {
      id: '3',
      name: 'ROC Filing (MCA)',
      frequency: 'Annual',
      deadline: '2026-07-30',
      daysLeft: 29,
      status: 'due_soon',
      lastFiled: '2025-07-30',
    },
    {
      id: '4',
      name: 'TDS Deposit',
      frequency: 'Quarterly',
      deadline: '2026-06-30',
      daysLeft: 0,
      status: 'compliant',
      lastFiled: '2026-06-30',
    },
  ]);

  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const handleCheck = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'pending':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'due_soon':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'Compliant';
      case 'pending':
        return 'Pending';
      case 'due_soon':
        return 'Due Soon';
      case 'overdue':
        return 'Overdue';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* View Selector */}
      <div className="flex gap-2 border-b border-border">
        {[
          { id: 'timeline', label: 'Filing Timeline' },
          { id: 'checklist', label: 'Compliance Checklist' },
          { id: 'penalties', label: 'Penalties & Interest' },
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

      {/* Filing Timeline */}
      {view === 'timeline' && (
        <div className="space-y-4">
          {complianceItems.map(item => (
            <div
              key={item.id}
              className={`p-6 border rounded-lg ${getStatusColor(item.status)}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm opacity-75">{item.frequency}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border`}>
                  {getStatusLabel(item.status)}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <p className="text-xs opacity-75">Deadline</p>
                  <p className="font-medium">{new Date(item.deadline).toLocaleDateString('en-IN')}</p>
                </div>
                <div>
                  <p className="text-xs opacity-75">Days Left</p>
                  <p className="font-medium">{item.daysLeft > 0 ? item.daysLeft : 'Today'}</p>
                </div>
                <div>
                  <p className="text-xs opacity-75">Last Filed</p>
                  <p className="font-medium">
                    {item.lastFiled ? new Date(item.lastFiled).toLocaleDateString('en-IN') : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs opacity-75">Status</p>
                  <p className="font-medium">{item.status === 'compliant' ? '✓ Done' : '⧗ Pending'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Compliance Checklist */}
      {view === 'checklist' && (
        <div className="p-6 border border-border rounded-lg bg-card space-y-4">
          <h3 className="font-semibold text-lg">Monthly Compliance Checklist</h3>

          <div className="space-y-3">
            {[
              { id: 'gst', label: 'File GST Return (GSTR-3B)', dueDate: 'Monthly 15th' },
              { id: 'bank', label: 'Reconcile Bank Statements', dueDate: 'Monthly' },
              { id: 'payroll', label: 'Process Salary Payments', dueDate: 'Monthly 25th' },
              { id: 'tds', label: 'Calculate TDS/TCS', dueDate: 'Monthly 31st' },
              { id: 'backup', label: 'Backup Financial Records', dueDate: 'Monthly 30th' },
            ].map(item => (
              <label key={item.id} className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted transition-colors">
                <input
                  type="checkbox"
                  checked={checkedItems.has(item.id)}
                  onChange={() => handleCheck(item.id)}
                  className="w-5 h-5"
                />
                <div className="flex-1">
                  <p className={`font-medium ${checkedItems.has(item.id) ? 'line-through text-muted-foreground' : ''}`}>
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground">Due: {item.dueDate}</p>
                </div>
                {checkedItems.has(item.id) && <CheckCircle2 className="w-5 h-5 text-green-600" />}
              </label>
            ))}
          </div>

          <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-sm font-medium text-primary">
              Completion: {Math.round((checkedItems.size / 5) * 100)}%
            </p>
            <div className="w-full bg-border rounded-full h-2 mt-2">
              <div
                className="bg-primary h-2 rounded-full transition-all"
                style={{ width: `${(checkedItems.size / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Penalties & Interest */}
      {view === 'penalties' && (
        <div className="space-y-4">
          <div className="p-6 border border-border rounded-lg bg-card">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-semibold text-lg">Penalty & Interest Calculator</h3>
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>

            <div className="space-y-4">
              {[
                {
                  violation: 'Late GST Filing',
                  amount: 50000,
                  rate: '1% monthly',
                  severity: 'high',
                },
                {
                  violation: 'Late ITR Filing',
                  amount: 100000,
                  rate: 'Per day delay',
                  severity: 'critical',
                },
                {
                  violation: 'TDS Non-Deposit',
                  amount: 75000,
                  rate: '1.5% + interest',
                  severity: 'high',
                },
              ].map((penalty, idx) => (
                <div
                  key={idx}
                  className={`p-4 border rounded-lg ${
                    penalty.severity === 'critical'
                      ? 'bg-red-50 border-red-200'
                      : 'bg-yellow-50 border-yellow-200'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{penalty.violation}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Penalty: ₹{penalty.amount.toLocaleString()} | {penalty.rate}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded ${
                        penalty.severity === 'critical'
                          ? 'bg-red-200 text-red-700'
                          : 'bg-yellow-200 text-yellow-700'
                      }`}
                    >
                      {penalty.severity.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm font-medium text-green-700">
                ✓ Current Status: All filings up to date. No penalties applicable.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
