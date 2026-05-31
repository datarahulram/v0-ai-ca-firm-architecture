'use client';

import { useState, useEffect } from 'react';
import { financialDataStore } from '@/lib/financial-engine';
import { TaxCalculation } from '@/lib/financial-engine';
import { ArrowUp, TrendingDown } from 'lucide-react';

export function TaxDepartmentV2() {
  const [taxData, setTaxData] = useState<TaxCalculation | null>(null);
  const [view, setView] = useState<'overview' | 'calculator' | 'deductions'>('overview');
  const [formData, setFormData] = useState({
    gross_revenue: 1420000,
    deductions: 580000,
    gst_rate: 18,
    estimated_tax_rate: 30,
  });

  useEffect(() => {
    setTaxData(financialDataStore.calculateTaxes());
  }, []);

  const calculateTax = () => {
    const taxable_income = Math.max(0, formData.gross_revenue - formData.deductions);
    const total_tax = taxable_income * (formData.estimated_tax_rate / 100);
    const gst = formData.gross_revenue * (formData.gst_rate / 100);

    return {
      gross_revenue: formData.gross_revenue,
      deductions: formData.deductions,
      taxable_income,
      tax_rate: formData.estimated_tax_rate / 100,
      total_tax,
      gst_liability: gst,
      tds_collected: formData.gross_revenue * 0.02,
      net_tax_payable: total_tax + gst - (formData.gross_revenue * 0.02),
    };
  };

  const currentTax = calculateTax();

  return (
    <div className="space-y-6">
      {/* View Selector */}
      <div className="flex gap-2 border-b border-border">
        {[
          { id: 'overview', label: 'Tax Overview' },
          { id: 'calculator', label: 'Tax Calculator' },
          { id: 'deductions', label: 'Deductions' },
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

      {/* Tax Overview */}
      {view === 'overview' && taxData && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-6 border border-border rounded-lg bg-card">
              <p className="text-sm text-muted-foreground font-medium mb-2">Gross Revenue</p>
              <p className="text-3xl font-light">₹{taxData.gross_revenue.toLocaleString()}</p>
              <p className="text-xs text-primary mt-2">Financial Year 2025-26</p>
            </div>

            <div className="p-6 border border-border rounded-lg bg-card">
              <p className="text-sm text-muted-foreground font-medium mb-2">Taxable Income</p>
              <p className="text-3xl font-light">₹{taxData.taxable_income.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-2">After deductions</p>
            </div>

            <div className="p-6 border border-border rounded-lg bg-card">
              <p className="text-sm text-muted-foreground font-medium mb-2">Income Tax Liability</p>
              <p className="text-3xl font-light text-red-600">₹{taxData.total_tax.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-2">@ 30%</p>
            </div>

            <div className="p-6 border border-border rounded-lg bg-card">
              <p className="text-sm text-muted-foreground font-medium mb-2">GST Liability</p>
              <p className="text-3xl font-light">₹{taxData.gst_liability.toLocaleString()}</p>
              <p className="text-xs text-primary mt-2">↑ 12% vs last month</p>
            </div>

            <div className="p-6 border border-border rounded-lg bg-card">
              <p className="text-sm text-muted-foreground font-medium mb-2">TDS Collected</p>
              <p className="text-3xl font-light">₹{taxData.tds_collected.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-2">Available as credit</p>
            </div>

            <div className="p-6 border border-border rounded-lg bg-card">
              <p className="text-sm text-muted-foreground font-medium mb-2">Net Tax Payable</p>
              <p className="text-3xl font-light text-primary">₹{taxData.net_tax_payable.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-2">After TDS adjustment</p>
            </div>
          </div>

          {/* Tax Breakdown */}
          <div className="p-6 border border-border rounded-lg bg-card">
            <h3 className="font-semibold mb-4">Tax Calculation Breakdown</h3>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-muted-foreground">Gross Revenue</span>
                <span className="font-medium">₹{taxData.gross_revenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-muted-foreground">Less: Deductions</span>
                <span className="font-medium">₹{(taxData.gross_revenue - taxData.taxable_income).toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border font-semibold text-primary">
                <span>Taxable Income</span>
                <span>₹{taxData.taxable_income.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-muted-foreground">Income Tax @ 30%</span>
                <span className="font-medium">₹{taxData.total_tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-border">
                <span className="text-muted-foreground">GST Liability</span>
                <span className="font-medium">₹{taxData.gst_liability.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-muted-foreground">Less: TDS Collected</span>
                <span className="font-medium">-₹{taxData.tds_collected.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border text-lg font-semibold">
                <span>Net Tax Payable</span>
                <span className="text-red-600">₹{taxData.net_tax_payable.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tax Calculator */}
      {view === 'calculator' && (
        <div className="space-y-6">
          <div className="p-6 border border-border rounded-lg bg-card space-y-4">
            <h3 className="font-semibold text-lg">Interactive Tax Calculator</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  Gross Revenue (₹)
                </label>
                <input
                  type="number"
                  value={formData.gross_revenue}
                  onChange={e => setFormData({ ...formData, gross_revenue: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  Total Deductions (₹)
                </label>
                <input
                  type="number"
                  value={formData.deductions}
                  onChange={e => setFormData({ ...formData, deductions: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  value={formData.estimated_tax_rate}
                  onChange={e => setFormData({ ...formData, estimated_tax_rate: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">
                  GST Rate (%)
                </label>
                <input
                  type="number"
                  value={formData.gst_rate}
                  onChange={e => setFormData({ ...formData, gst_rate: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-input rounded-lg bg-background text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Calculator Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 border border-border rounded-lg bg-card">
              <p className="text-sm text-muted-foreground mb-2">Taxable Income</p>
              <p className="text-3xl font-light">₹{currentTax.taxable_income.toLocaleString()}</p>
            </div>
            <div className="p-6 border border-border rounded-lg bg-card">
              <p className="text-sm text-muted-foreground mb-2">Income Tax</p>
              <p className="text-3xl font-light text-red-600">₹{currentTax.total_tax.toLocaleString()}</p>
            </div>
            <div className="p-6 border border-border rounded-lg bg-card">
              <p className="text-sm text-muted-foreground mb-2">GST Liability</p>
              <p className="text-3xl font-light">₹{currentTax.gst_liability.toLocaleString()}</p>
            </div>
            <div className="p-6 border border-border rounded-lg bg-card">
              <p className="text-sm text-muted-foreground mb-2">Net Tax Payable</p>
              <p className="text-3xl font-light text-primary">₹{currentTax.net_tax_payable.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}

      {/* Deductions */}
      {view === 'deductions' && (
        <div className="p-6 border border-border rounded-lg bg-card space-y-4">
          <h3 className="font-semibold text-lg">Allowable Deductions</h3>
          <div className="space-y-3">
            {[
              { name: 'Salaries & Wages', amount: 300000, percentage: 21.1 },
              { name: 'Rent & Utilities', amount: 150000, percentage: 10.6 },
              { name: 'Office Supplies', amount: 45000, percentage: 3.2 },
              { name: 'Professional Services', amount: 85000, percentage: 6.0 },
            ].map((ded, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div>
                  <p className="font-medium">{ded.name}</p>
                  <p className="text-sm text-muted-foreground">₹{ded.amount.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">{ded.percentage}%</p>
                  <p className="text-xs text-muted-foreground">of revenue</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-sm font-medium text-primary">
              Total Deductions: ₹{formData.deductions.toLocaleString()} ({(formData.deductions / formData.gross_revenue * 100).toFixed(1)}% of revenue)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
