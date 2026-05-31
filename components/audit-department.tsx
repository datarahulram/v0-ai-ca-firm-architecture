import { CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';

export function AuditDepartment() {
  const auditFindings = [
    { category: 'Documentation', score: 96, status: 'excellent', items: ['All invoices properly documented', 'Bank reconciliation complete', 'Supporting evidence attached'] },
    { category: 'Transaction Integrity', score: 92, status: 'excellent', items: ['No duplicate transactions', 'All entries properly classified', 'Amounts verified'] },
    { category: 'Fraud Detection', score: 98, status: 'excellent', items: ['No suspicious patterns detected', 'Related party transactions disclosed', 'Unusual transactions reviewed'] },
    { category: 'Compliance', score: 88, status: 'good', items: ['GST compliance verified', 'TDS computed correctly', '2 minor discrepancies noted'] },
  ];

  const riskAreas = [
    { name: 'High Value Transactions', count: 12, action: 'Reviewed', risk: 'Low' },
    { name: 'Round Amount Transactions', count: 8, action: 'Flagged', risk: 'Medium' },
    { name: 'Manual Journal Entries', count: 5, action: 'Verified', risk: 'Low' },
    { name: 'Related Party Transactions', count: 3, action: 'Disclosed', risk: 'Low' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 border border-border rounded-lg bg-card">
          <p className="text-sm font-semibold text-muted-foreground mb-2">Audit Readiness</p>
          <p className="text-3xl font-light text-primary">94/100</p>
          <p className="text-xs text-green-600 mt-2">Ready for audit</p>
        </div>
        <div className="p-6 border border-border rounded-lg bg-card">
          <p className="text-sm font-semibold text-muted-foreground mb-2">Findings</p>
          <p className="text-3xl font-light">2</p>
          <p className="text-xs text-muted-foreground mt-2">Minor issues</p>
        </div>
        <div className="p-6 border border-border rounded-lg bg-card">
          <p className="text-sm font-semibold text-muted-foreground mb-2">High Risk Items</p>
          <p className="text-3xl font-light">0</p>
          <p className="text-xs text-green-600 mt-2">All cleared</p>
        </div>
        <div className="p-6 border border-border rounded-lg bg-card">
          <p className="text-sm font-semibold text-muted-foreground mb-2">Last Audit</p>
          <p className="text-sm font-light">May 15, 2026</p>
          <p className="text-xs text-muted-foreground mt-2">15 days ago</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {auditFindings.map((finding) => (
          <div key={finding.category} className="p-6 border border-border rounded-lg bg-card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{finding.category}</h3>
              <div className="text-right">
                <p className="text-2xl font-light text-primary">{finding.score}</p>
                <p className="text-xs text-muted-foreground">Score</p>
              </div>
            </div>
            <div className="w-full bg-border rounded-full h-2 mb-4">
              <div 
                className="bg-primary h-2 rounded-full transition-all" 
                style={{ width: `${finding.score}%` }} 
              />
            </div>
            <ul className="space-y-2">
              {finding.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="p-6 border border-border rounded-lg bg-card">
        <h3 className="font-semibold mb-4">Risk Areas & Controls</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border">
              <tr>
                <th className="text-left py-2">Area</th>
                <th className="text-center py-2">Count</th>
                <th className="text-center py-2">Action Taken</th>
                <th className="text-right py-2">Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {riskAreas.map((area) => (
                <tr key={area.name} className="border-b border-border hover:bg-muted">
                  <td className="py-3">{area.name}</td>
                  <td className="text-center py-3">{area.count}</td>
                  <td className="text-center py-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">
                      {area.action}
                    </span>
                  </td>
                  <td className="text-right py-3 font-semibold text-green-600">{area.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="p-6 border border-border rounded-lg bg-card">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-yellow-600" />
          Audit Observations
        </h3>
        <div className="space-y-3">
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-sm">
            <p className="font-medium text-yellow-900">Minor: 2 invoices missing vendor GST number</p>
            <p className="text-xs text-yellow-800 mt-1">Recommendation: Update vendor master data</p>
          </div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded text-sm">
            <p className="font-medium text-blue-900">Note: Round amount transactions require disclosure</p>
            <p className="text-xs text-blue-800 mt-1">Status: Disclosed in audit schedule</p>
          </div>
        </div>
      </div>
    </div>
  );
}
