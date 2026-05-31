'use client';

import { useState } from 'react';
import { analyzeFinancialData } from '@/lib/ai-service';

interface TaxPageProps {
  onBack: () => void;
}

export default function TaxPage({ onBack }: TaxPageProps) {
  const [formData, setFormData] = useState({
    grossIncome: '1420000',
    deductions: '320000',
    gstSales: '500000',
    gstPurchases: '150000',
    tdsCollected: '28450',
  });

  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const calculateTax = async () => {
    setLoading(true);
    try {
      const response = await analyzeFinancialData({
        type: 'tax',
        data: formData,
        query: 'Calculate tax liability including income tax, GST, and TDS implications',
      });
      
      const grossIncome = parseFloat(formData.grossIncome);
      const deductions = parseFloat(formData.deductions);
      const taxableIncome = grossIncome - deductions;
      const incomeTax = taxableIncome * 0.30;
      const gstLiability = (parseFloat(formData.gstSales) - parseFloat(formData.gstPurchases)) * 0.18;
      
      setResults({
        taxableIncome,
        incomeTax,
        gstLiability,
        tdsAdjustment: parseFloat(formData.tdsCollected),
        netTaxDue: Math.max(0, incomeTax + gstLiability - parseFloat(formData.tdsCollected)),
        aiAnalysis: response.analysis,
        recommendations: response.recommendations,
      });
    } catch (error) {
      console.error('Tax calculation failed:', error);
      setResults({ error: 'Calculation service unavailable' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light tracking-tight">Tax Planning</h2>
          <p className="text-muted-foreground text-sm mt-1">Income Tax, GST & TDS Analysis</p>
        </div>
        <button
          onClick={onBack}
          className="px-4 py-2 text-sm hover:bg-muted rounded-lg transition-colors"
        >
          Back
        </button>
      </div>

      {/* Input Form */}
      <div className="p-6 border border-border rounded-lg bg-card">
        <h3 className="font-semibold mb-4">Tax Parameters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Gross Income</label>
            <input
              type="number"
              value={formData.grossIncome}
              onChange={(e) => setFormData({ ...formData, grossIncome: e.target.value })}
              className="w-full mt-2 px-3 py-2 border border-border rounded-lg text-sm bg-background"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Deductions</label>
            <input
              type="number"
              value={formData.deductions}
              onChange={(e) => setFormData({ ...formData, deductions: e.target.value })}
              className="w-full mt-2 px-3 py-2 border border-border rounded-lg text-sm bg-background"
            />
          </div>
          <div>
            <label className="text-sm font-medium">GST Sales</label>
            <input
              type="number"
              value={formData.gstSales}
              onChange={(e) => setFormData({ ...formData, gstSales: e.target.value })}
              className="w-full mt-2 px-3 py-2 border border-border rounded-lg text-sm bg-background"
            />
          </div>
          <div>
            <label className="text-sm font-medium">GST Purchases</label>
            <input
              type="number"
              value={formData.gstPurchases}
              onChange={(e) => setFormData({ ...formData, gstPurchases: e.target.value })}
              className="w-full mt-2 px-3 py-2 border border-border rounded-lg text-sm bg-background"
            />
          </div>
          <div>
            <label className="text-sm font-medium">TDS Collected</label>
            <input
              type="number"
              value={formData.tdsCollected}
              onChange={(e) => setFormData({ ...formData, tdsCollected: e.target.value })}
              className="w-full mt-2 px-3 py-2 border border-border rounded-lg text-sm bg-background"
            />
          </div>
        </div>
        <button
          onClick={calculateTax}
          disabled={loading}
          className="mt-6 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          {loading ? 'Calculating...' : 'Calculate Tax'}
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-lg bg-card">
              <p className="text-xs text-muted-foreground font-medium">Taxable Income</p>
              <p className="text-2xl font-light mt-1">₹{results.taxableIncome?.toFixed(0)}</p>
            </div>
            <div className="p-4 border border-border rounded-lg bg-card">
              <p className="text-xs text-muted-foreground font-medium">Income Tax (30%)</p>
              <p className="text-2xl font-light mt-1 text-red-600">₹{results.incomeTax?.toFixed(0)}</p>
            </div>
            <div className="p-4 border border-border rounded-lg bg-card">
              <p className="text-xs text-muted-foreground font-medium">GST Liability</p>
              <p className="text-2xl font-light mt-1 text-red-600">₹{results.gstLiability?.toFixed(0)}</p>
            </div>
            <div className="p-4 border border-border rounded-lg bg-card">
              <p className="text-xs text-muted-foreground font-medium">TDS Adjustment</p>
              <p className="text-2xl font-light mt-1 text-green-600">-₹{results.tdsAdjustment?.toFixed(0)}</p>
            </div>
            <div className="p-4 border border-border rounded-lg bg-card lg:col-span-2">
              <p className="text-xs text-muted-foreground font-medium">Net Tax Due</p>
              <p className="text-2xl font-light mt-1 text-red-600">₹{results.netTaxDue?.toFixed(0)}</p>
            </div>
          </div>

          {results.aiAnalysis && (
            <div className="p-6 border border-border rounded-lg bg-blue-50/50">
              <h4 className="font-semibold text-sm mb-2">AI Tax Analysis</h4>
              <p className="text-sm text-blue-900">{results.aiAnalysis}</p>
            </div>
          )}

          {results.recommendations && results.recommendations.length > 0 && (
            <div className="p-6 border border-border rounded-lg bg-card">
              <h4 className="font-semibold text-sm mb-3">Recommendations</h4>
              <ul className="space-y-2">
                {results.recommendations.map((rec: string, i: number) => (
                  <li key={i} className="text-sm flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
