import { AlertCircle, CheckCircle2, Clock } from 'lucide-react';

export function ComplianceDepartment() {
  const filings = [
    { name: 'GST Return', frequency: 'Monthly', deadline: '2026-06-15', status: 'compliant', daysLeft: 14 },
    { name: 'ITR Filing', frequency: 'Annual', deadline: '2026-09-30', status: 'pending', daysLeft: 121 },
    { name: 'ROC Filing', frequency: 'Annual', deadline: '2026-07-30', status: 'urgent', daysLeft: 59 },
    { name: 'TDS Deposit', frequency: 'Quarterly', deadline: '2026-06-07', status: 'overdue', daysLeft: -25 },
  ];

  const statusStyles = {
    compliant: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle2 },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
    urgent: { bg: 'bg-orange-100', text: 'text-orange-700', icon: AlertCircle },
    overdue: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle },
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 border border-border rounded-lg bg-card">
          <p className="text-sm font-semibold text-muted-foreground mb-2">Compliance Score</p>
          <p className="text-3xl font-light">92/100</p>
          <p className="text-xs text-green-600 mt-2">↑ Excellent</p>
        </div>
        <div className="p-6 border border-border rounded-lg bg-card">
          <p className="text-sm font-semibold text-muted-foreground mb-2">Filings Completed</p>
          <p className="text-3xl font-light">18/22</p>
          <p className="text-xs text-muted-foreground mt-2">This year</p>
        </div>
        <div className="p-6 border border-border rounded-lg bg-card">
          <p className="text-sm font-semibold text-muted-foreground mb-2">Pending Actions</p>
          <p className="text-3xl font-light">4</p>
          <p className="text-xs text-yellow-600 mt-2">Requires attention</p>
        </div>
        <div className="p-6 border border-border rounded-lg bg-card">
          <p className="text-sm font-semibold text-muted-foreground mb-2">Penalties Risk</p>
          <p className="text-3xl font-light text-green-600">Low</p>
          <p className="text-xs text-muted-foreground mt-2">No violations</p>
        </div>
      </div>

      <div className="p-6 border border-border rounded-lg bg-card">
        <h3 className="font-semibold mb-4">Filing Deadlines & Status</h3>
        <div className="space-y-3">
          {filings.map((filing) => {
            const styles = statusStyles[filing.status as keyof typeof statusStyles];
            const StatusIcon = styles.icon;
            return (
              <div key={filing.name} className="p-4 border border-border rounded-lg hover:bg-muted">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-sm">{filing.name}</p>
                    <p className="text-xs text-muted-foreground">{filing.frequency}</p>
                  </div>
                  <div className={`${styles.bg} ${styles.text} px-3 py-1 rounded-full flex items-center gap-1`}>
                    <StatusIcon className="w-4 h-4" />
                    <span className="text-xs font-semibold capitalize">{filing.status}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <p className="text-muted-foreground">Deadline: {filing.deadline}</p>
                  <p className="font-semibold">{filing.daysLeft > 0 ? `${filing.daysLeft} days` : 'Overdue'}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-6 border border-border rounded-lg bg-card">
        <h3 className="font-semibold mb-4">Upcoming Compliance Alerts</h3>
        <div className="space-y-3">
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex gap-3">
            <Clock className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">ROC Annual Return due in 59 days</p>
              <p className="text-xs text-muted-foreground mt-1">Required by July 30, 2026</p>
            </div>
          </div>
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-sm">TDS Deposit Overdue by 25 Days</p>
              <p className="text-xs text-muted-foreground mt-1">Action Required: Process immediately to avoid penalties</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
