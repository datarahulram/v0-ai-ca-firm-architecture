'use client';

import { ProblemMetrics } from '@/lib/types';
import { AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';

export function ProblemsCard({ data }: { data: ProblemMetrics }) {
  const totalIssues = data.critical + data.high + data.medium + data.low;
  const resolutionRate = ((data.resolved / (totalIssues + data.resolved)) * 100).toFixed(0);

  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-4">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">Issues & Alerts</h3>
        <span className={`text-xs font-medium ${data.critical > 0 ? 'text-red-600' : 'text-green-600'}`}>
          {totalIssues} Open
        </span>
      </div>

      <div className="space-y-2">
        {data.critical > 0 && (
          <div className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <span className="text-sm font-medium text-red-700 dark:text-red-400">Critical</span>
            </div>
            <span className="text-sm font-semibold text-red-700 dark:text-red-400">{data.critical}</span>
          </div>
        )}
        {data.high > 0 && (
          <div className="flex items-center justify-between p-2 bg-orange-50 dark:bg-orange-950/20 rounded border border-orange-200 dark:border-orange-800">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-700 dark:text-orange-400">High</span>
            </div>
            <span className="text-sm font-semibold text-orange-700 dark:text-orange-400">{data.high}</span>
          </div>
        )}
        {data.medium > 0 && (
          <div className="flex items-center justify-between p-2 bg-yellow-50 dark:bg-yellow-950/20 rounded border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">Medium</span>
            </div>
            <span className="text-sm font-semibold text-yellow-700 dark:text-yellow-400">{data.medium}</span>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-xs text-muted-foreground">Resolved This Month</span>
          </div>
          <span className="text-sm font-semibold">{data.resolved}</span>
        </div>
      </div>
    </div>
  );
}
