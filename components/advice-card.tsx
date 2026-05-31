'use client';

import { AdviceMetrics } from '@/lib/types';
import { Lightbulb, Check, X } from 'lucide-react';
import { useState } from 'react';

export function AdviceCard({ data }: { data: AdviceMetrics }) {
  const [dismissed, setDismissed] = useState<string[]>([]);

  const activeRecs = data.recommendations.filter(r => !dismissed.includes(r.id) && r.status === 'pending');
  const topRec = activeRecs[0];

  return (
    <div className="rounded-lg border border-border bg-card p-6 space-y-4">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">AI Recommendations</h3>
        <span className="text-xs font-medium text-primary">{activeRecs.length} Active</span>
      </div>

      <div className="space-y-3">
        {topRec && (
          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg space-y-2">
            <div className="flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-sm">{topRec.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{topRec.description}</p>
              </div>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDismissed([...dismissed, topRec.id])}
                className="text-xs px-2 py-1 rounded hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3 h-3 inline mr-1" />
                Dismiss
              </button>
              <button className="text-xs px-2 py-1 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                <Check className="w-3 h-3 inline mr-1" />
                Implement
              </button>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground font-medium">{data.priority}</p>
        </div>
      </div>
    </div>
  );
}
