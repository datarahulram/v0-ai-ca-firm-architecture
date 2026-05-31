'use client';

import { useState } from 'react';
import { financialDataStore } from '@/lib/financial-engine';
import { Plus, Trash2, Eye } from 'lucide-react';

export function BookkeepingDepartmentV2() {
  const [ledgerEntries, setLedgerEntries] = useState(
    financialDataStore.calculateBookkeepingEntries()
  );
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    account: 'Revenue',
    description: '',
    debit: '',
    credit: '',
  });

  const [view, setView] = useState<'ledger' | 'add' | 'trial_balance'>('ledger');

  const handleAddEntry = () => {
    if (!formData.description || (!formData.debit && !formData.credit)) {
      alert('Please fill all fields');
      return;
    }

    const newEntry = {
      id: `${ledgerEntries.length + 1}`,
      date: formData.date,
      account: formData.account,
      debit: formData.debit ? parseFloat(formData.debit) : 0,
      credit: formData.credit ? parseFloat(formData.credit) : 0,
      description: formData.description,
      reference: `MAN-${Date.now()}`,
    };

    setLedgerEntries([...ledgerEntries, newEntry]);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      account: 'Revenue',
      description: '',
      debit: '',
      credit: '',
    });
    alert('Entry added successfully');
  };

  const calculateTrialBalance = () => {
    const accounts = new Map<string, { debit: number; credit: number }>();

    ledgerEntries.forEach(entry => {
      if (!accounts.has(entry.account)) {
        accounts.set(entry.account, { debit: 0, credit: 0 });
      }
      const acc = accounts.get(entry.account)!;
      acc.debit += entry.debit;
      acc.credit += entry.credit;
    });

    return Array.from(accounts.entries()).map(([account, { debit, credit }]) => ({
      account,
      debit,
      credit,
      balance: debit - credit,
    }));
  };

  const trialBalance = calculateTrialBalance();
  const totalDebits = trialBalance.reduce((sum, tb) => sum + tb.debit, 0);
  const totalCredits = trialBalance.reduce((sum, tb) => sum + tb.credit, 0);

  return (
    <div className="space-y-6">
      {/* View Selector */}
      <div className="flex gap-2 border-b border-border">
        {[
          { id: 'ledger', label: 'General Ledger' },
          { id: 'add', label: 'Add Entry' },
          { id: 'trial_balance', label: 'Trial Balance' },
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

      {/* General Ledger View */}
      {view === 'ledger' && (
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Date</th>
                <th className="px-4 py-3 text-left font-medium">Account</th>
                <th className="px-4 py-3 text-left font-medium">Description</th>
                <th className="px-4 py-3 text-right font-medium">Debit (₹)</th>
                <th className="px-4 py-3 text-right font-medium">Credit (₹)</th>
                <th className="px-4 py-3 text-left font-medium">Reference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ledgerEntries.slice(0, 20).map(entry => (
                <tr key={entry.id} className="hover:bg-muted/50">
                  <td className="px-4 py-3">{entry.date}</td>
                  <td className="px-4 py-3 font-medium">{entry.account}</td>
                  <td className="px-4 py-3 text-muted-foreground">{entry.description}</td>
                  <td className="px-4 py-3 text-right">
                    {entry.debit > 0 ? entry.debit.toLocaleString() : '-'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {entry.credit > 0 ? entry.credit.toLocaleString() : '-'}
                  </td>
                  <td className="px-4 py-3 text-xs text-primary">{entry.reference}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-4 py-3 bg-muted border-t border-border text-sm">
            Total Entries: {ledgerEntries.length}
          </div>
        </div>
      )}

      {/* Add Entry Form */}
      {view === 'add' && (
        <div className="p-6 border border-border rounded-lg bg-card space-y-4">
          <h3 className="font-semibold text-lg">Record Journal Entry</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-2">
                Date
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-2">
                Account
              </label>
              <select
                value={formData.account}
                onChange={e => setFormData({ ...formData, account: e.target.value })}
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
              >
                <option>Revenue</option>
                <option>Expense - Salaries</option>
                <option>Expense - Utilities</option>
                <option>Expense - Supplies</option>
                <option>Bank</option>
                <option>Accounts Receivable</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-muted-foreground block mb-2">
                Description
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={e => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter transaction description"
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-2">
                Debit (₹)
              </label>
              <input
                type="number"
                value={formData.debit}
                onChange={e => setFormData({ ...formData, debit: e.target.value })}
                placeholder="0"
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground block mb-2">
                Credit (₹)
              </label>
              <input
                type="number"
                value={formData.credit}
                onChange={e => setFormData({ ...formData, credit: e.target.value })}
                placeholder="0"
                className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
              />
            </div>
          </div>

          <button
            onClick={handleAddEntry}
            className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Record Entry
          </button>
        </div>
      )}

      {/* Trial Balance View */}
      {view === 'trial_balance' && (
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Account</th>
                <th className="px-4 py-3 text-right font-medium">Debit (₹)</th>
                <th className="px-4 py-3 text-right font-medium">Credit (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {trialBalance.map((tb, idx) => (
                <tr key={idx} className="hover:bg-muted/50">
                  <td className="px-4 py-3 font-medium">{tb.account}</td>
                  <td className="px-4 py-3 text-right">
                    {tb.debit > 0 ? tb.debit.toLocaleString() : '-'}
                  </td>
                  <td className="px-4 py-3 text-right">
                    {tb.credit > 0 ? tb.credit.toLocaleString() : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-muted border-t border-border font-semibold">
              <tr>
                <td className="px-4 py-3">TOTAL</td>
                <td className="px-4 py-3 text-right">{totalDebits.toLocaleString()}</td>
                <td className="px-4 py-3 text-right">{totalCredits.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
          <div className="px-4 py-3 bg-background border-t border-border text-sm">
            <p className={totalDebits === totalCredits ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
              {totalDebits === totalCredits ? '✓ Trial Balance is Balanced' : '✗ Out of Balance'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
