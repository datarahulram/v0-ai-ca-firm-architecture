'use client';

import { TaskMetrics } from '@/lib/types';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

export function TasksCard({ data }: { data: TaskMetrics }) {
  const completionRate = ((data.completed / data.total) * 100).toFixed(0);

  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-4">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">Monthly Tasks</h3>
        <span className="text-xs font-medium text-primary">{completionRate}% Done</span>
      </div>

      <div className="space-y-1">
        <div className="text-3xl font-light tracking-tight">
          {data.completed}/{data.total}
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-green-600" />
          <div>
            <p className="text-xs text-muted-foreground">Completed</p>
            <p className="text-lg font-light">{data.completed}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          <div>
            <p className="text-xs text-muted-foreground">Pending</p>
            <p className="text-lg font-light">{data.pending}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-orange-600" />
          <div>
            <p className="text-xs text-muted-foreground">Due Today</p>
            <p className="text-lg font-light">{data.dueToday}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
