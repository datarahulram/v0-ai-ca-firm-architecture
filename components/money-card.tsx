'use client';

import { MoneyMetrics } from '@/lib/types';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function MoneyCard({ data }: { data: MoneyMetrics }) {
  const isPositiveTrend = data.trends > 0;
  const profitMargin = ((data.netProfit / data.totalRevenue) * 100).toFixed(1);

  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-4">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">Total Revenue</h3>
        <span className="text-xs font-medium text-primary">This Month</span>
      </div>

      <div className="space-y-1">
        <div className="text-3xl font-light tracking-tight">
          ${(data.totalRevenue / 1000).toFixed(0)}K
        </div>
        <div className="flex items-center gap-2">
          <div className={`flex items-center gap-1 text-sm ${isPositiveTrend ? 'text-green-600' : 'text-red-600'}`}>
            {isPositiveTrend ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {Math.abs(data.trends).toFixed(1)}%
          </div>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Net Profit</p>
          <p className="text-lg font-light">${(data.netProfit / 1000).toFixed(0)}K</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Margin</p>
          <p className="text-lg font-light">{profitMargin}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Cash Flow</p>
          <p className="text-lg font-light">${(data.cashFlow / 1000).toFixed(0)}K</p>
        </div>
      </div>
    </div>
  );
}
