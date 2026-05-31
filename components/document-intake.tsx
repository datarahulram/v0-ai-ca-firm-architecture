'use client';

import { DocumentAnalysis } from '@/lib/types';
import { Upload, File, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export function DocumentIntake({ documents }: { documents: DocumentAnalysis[] }) {
  const [uploaded, setUploaded] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processed':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      invoice: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
      receipt: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
      statement: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
      tax: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
      other: 'bg-gray-100 text-gray-700 dark:bg-gray-900/20 dark:text-gray-400',
    };
    return colors[type] || colors.other;
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onClick={() => setUploaded(!uploaded)}
        className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:bg-muted/30 cursor-pointer transition-colors"
      >
        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="font-medium text-sm mb-1">Upload Financial Documents</p>
        <p className="text-xs text-muted-foreground">
          Drag and drop invoices, receipts, and statements
        </p>
      </div>

      {/* Processed Documents */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-foreground">Recent Documents</h3>
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
          >
            <File className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-sm font-medium truncate">{doc.fileName}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(doc.type)}`}>
                  {doc.type}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{doc.category}</span>
                <span>•</span>
                <span>{doc.date}</span>
                <span>•</span>
                <span className="font-semibold text-foreground">${doc.amount.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Confidence</p>
                <p className="text-sm font-semibold">{(doc.confidence * 100).toFixed(0)}%</p>
              </div>
              {getStatusIcon(doc.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
