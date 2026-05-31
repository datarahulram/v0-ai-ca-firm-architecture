'use client';

import { GrowthMetrics } from '@/lib/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

export function GrowthCard({ data }: { data: GrowthMetrics }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-4">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">Financial Growth</h3>
        <span className="text-xs font-medium text-green-600 flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          {data.yearOverYear.toFixed(1)}% YoY
        </span>
      </div>

      <div className="h-32 w-full -mx-6 px-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.historicalData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="period" stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
            <YAxis stroke="var(--muted-foreground)" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
              }}
              formatter={(value: any) => `$${(value / 1000).toFixed(0)}K`}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--primary)"
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-2 border-t border-border">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Quarter</p>
          <p className="text-sm font-semibold text-green-600">+{data.quarterOverQuarter.toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Month</p>
          <p className="text-sm font-semibold text-green-600">+{data.monthOverMonth.toFixed(1)}%</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Projected 12M</p>
          <p className="text-sm font-semibold">${(data.projectedNext12M / 1000).toFixed(0)}K</p>
        </div>
      </div>
    </div>
  );
}
