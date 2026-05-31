'use client';

import { Download, FileJson, FileText, Mail } from 'lucide-react';
import { useState } from 'react';

export function ReportingPanel() {
  const [exporting, setExporting] = useState(false);

  const handleExport = (format: 'pdf' | 'csv' | 'json') => {
    setExporting(true);
    setTimeout(() => {
      const data = {
        format,
        timestamp: new Date().toISOString(),
        report: 'Virtual CA Financial Report',
        totalRevenue: 142000,
        netProfit: 83000,
        margin: 58.1,
      };

      const element = document.createElement('a');
      element.setAttribute(
        'href',
        `data:text/${format === 'json' ? 'json' : 'plain'};charset=utf-8,${encodeURIComponent(
          format === 'json' ? JSON.stringify(data, null, 2) : 'Financial Report\n' + JSON.stringify(data).replace(/,/g, '\n')
        )}`
      );
      element.setAttribute('download', `financial-report.${format}`);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      setExporting(false);
    }, 500);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PDF Export */}
        <button
          onClick={() => handleExport('pdf')}
          disabled={exporting}
          className="p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50 text-left"
        >
          <div className="flex items-center gap-3 mb-3">
            <FileText className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Export as PDF</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Professional financial report with charts and analysis
          </p>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Download className="w-4 h-4" />
            {exporting ? 'Generating...' : 'Generate Report'}
          </div>
        </button>

        {/* CSV Export */}
        <button
          onClick={() => handleExport('csv')}
          disabled={exporting}
          className="p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50 text-left"
        >
          <div className="flex items-center gap-3 mb-3">
            <FileJson className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Export as CSV</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Spreadsheet-ready format for further analysis
          </p>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Download className="w-4 h-4" />
            {exporting ? 'Generating...' : 'Download Data'}
          </div>
        </button>

        {/* Email Report */}
        <button
          disabled={exporting}
          className="p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50 text-left"
        >
          <div className="flex items-center gap-3 mb-3">
            <Mail className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Email Report</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Send financial summary to your accountant
          </p>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Mail className="w-4 h-4" />
            Send via Email
          </div>
        </button>

        {/* Schedule Report */}
        <button
          disabled={exporting}
          className="p-6 border border-border rounded-lg hover:bg-muted/50 transition-colors disabled:opacity-50 text-left"
        >
          <div className="flex items-center gap-3 mb-3">
            <Download className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Schedule Reports</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Get automated weekly or monthly summaries
          </p>
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Mail className="w-4 h-4" />
            Set Schedule
          </div>
        </button>
      </div>
    </div>
  );
}
