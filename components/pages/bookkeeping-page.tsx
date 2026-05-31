'use client';

import { useState } from 'react';
import { Plus, Trash2, AlertCircle } from 'lucide-react';
import { analyzeFinancialData } from '@/lib/ai-service';

interface JournalEntry {
  id: string;
  date: string;
  description: string;
  account: string;
  debit: number;
  credit: number;
}

interface BookkeepingPageProps {
  onBack: () => void;
}

export default function BookkeepingPage({ onBack }: BookkeepingPageProps) {
  const [entries, setEntries] = useState<JournalEntry[]>([
    {
      id: '1',
      date: '2024-01-15',
      description: 'Sales Revenue',
      account: 'Cash/Bank',
      debit: 50000,
      credit: 0,
    },
    {
      id: '2',
      date: '2024-01-15',
      description: 'Sales Revenue',
      account: 'Revenue',
      debit: 0,
      credit: 50000,
    },
  ]);

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    account: 'Cash',
    debit: '',
    credit: '',
  });

  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<string>('');
  const [balance, setBalance] = useState(0);

  const calculateBalance = () => {
    const total = entries.reduce((sum, entry) => sum + entry.debit - entry.credit, 0);
    setBalance(total);
  };

  const handleAddEntry = async () => {
    if (!formData.description || (!formData.debit && !formData.credit)) {
      alert('Please fill all fields');
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: formData.date,
      description: formData.description,
      account: formData.account,
      debit: parseFloat(formData.debit) || 0,
      credit: parseFloat(formData.credit) || 0,
    };

    setEntries([...entries, newEntry]);
    setFormData({
      date: new Date().toISOString().split('T')[0],
      description: '',
      account: 'Cash',
      debit: '',
      credit: '',
    });
  };

  const handleDeleteEntry = (id: string) => {
    setEntries(entries.filter((e) => e.id !== id));
  };

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const response = await analyzeFinancialData({
        type: 'bookkeeping',
        data: { entries, balance },
        query: 'Validate journal entries and suggest improvements',
      });
      setAnalysis(response.analysis);
      calculateBalance();
    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysis('Analysis service temporarily unavailable. Displaying standard validation.');
    } finally {
      setLoading(false);
    }
  };

  const totalDebits = entries.reduce((sum, e) => sum + e.debit, 0);
  const totalCredits = entries.reduce((sum, e) => sum + e.credit, 0);
  const isBalanced = Math.abs(totalDebits - totalCredits) < 0.01;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light tracking-tight">Bookkeeping</h2>
          <p className="text-muted-foreground text-sm mt-1">General Ledger & Journal Entries</p>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm hover:bg-muted rounded-lg transition-colors"
        >
          Back
        </button>
      </div>

      {/* Add Entry Form */}
      <div className="p-6 border border-border rounded-lg bg-card">
        <h3 className="font-semibold mb-4">Add Journal Entry</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3">
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="px-3 py-2 border border-border rounded-lg text-sm bg-background"
          />
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="px-3 py-2 border border-border rounded-lg text-sm bg-background"
          />
          <select
            value={formData.account}
            onChange={(e) => setFormData({ ...formData, account: e.target.value })}
            className="px-3 py-2 border border-border rounded-lg text-sm bg-background"
          >
            <option>Cash</option>
            <option>Revenue</option>
            <option>Expense</option>
            <option>Liability</option>
            <option>Asset</option>
          </select>
          <input
            type="number"
            placeholder="Debit"
            value={formData.debit}
            onChange={(e) => setFormData({ ...formData, debit: e.target.value })}
            className="px-3 py-2 border border-border rounded-lg text-sm bg-background"
          />
          <input
            type="number"
            placeholder="Credit"
            value={formData.credit}
            onChange={(e) => setFormData({ ...formData, credit: e.target.value })}
            className="px-3 py-2 border border-border rounded-lg text-sm bg-background"
          />
          <button
            onClick={handleAddEntry}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2 justify-center"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      {/* Journal Entries */}
      <div className="p-6 border border-border rounded-lg bg-card overflow-x-auto">
        <h3 className="font-semibold mb-4">Journal Entries</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-2 px-2 font-medium">Date</th>
              <th className="text-left py-2 px-2 font-medium">Description</th>
              <th className="text-left py-2 px-2 font-medium">Account</th>
              <th className="text-right py-2 px-2 font-medium">Debit</th>
              <th className="text-right py-2 px-2 font-medium">Credit</th>
              <th className="text-center py-2 px-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="border-b border-border hover:bg-muted/50">
                <td className="py-3 px-2">{entry.date}</td>
                <td className="py-3 px-2">{entry.description}</td>
                <td className="py-3 px-2 text-xs">{entry.account}</td>
                <td className="py-3 px-2 text-right">
                  {entry.debit > 0 ? `₹${entry.debit.toFixed(2)}` : '-'}
                </td>
                <td className="py-3 px-2 text-right">
                  {entry.credit > 0 ? `₹${entry.credit.toFixed(2)}` : '-'}
                </td>
                <td className="py-3 px-2 text-center">
                  <button
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Trial Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border border-border rounded-lg bg-card">
          <p className="text-sm text-muted-foreground font-medium">Total Debits</p>
          <p className="text-2xl font-light mt-2">₹{totalDebits.toFixed(2)}</p>
        </div>
        <div className="p-6 border border-border rounded-lg bg-card">
          <p className="text-sm text-muted-foreground font-medium">Total Credits</p>
          <p className="text-2xl font-light mt-2">₹{totalCredits.toFixed(2)}</p>
        </div>
        <div
          className={`p-6 border rounded-lg ${
            isBalanced
              ? 'border-green-200 bg-green-50/50'
              : 'border-red-200 bg-red-50/50'
          }`}
        >
          <p className="text-sm font-medium">Status</p>
          <p className={`text-2xl font-light mt-2 ${isBalanced ? 'text-green-600' : 'text-red-600'}`}>
            {isBalanced ? 'Balanced' : 'Unbalanced'}
          </p>
        </div>
      </div>

      {/* AI Analysis */}
      <div className="p-6 border border-border rounded-lg bg-card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">AI Analysis</h3>
          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
        {analysis && (
          <div className="space-y-3">
            <div className="flex gap-3 p-4 bg-blue-50/50 border border-blue-200 rounded-lg">
              <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900">{analysis}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
