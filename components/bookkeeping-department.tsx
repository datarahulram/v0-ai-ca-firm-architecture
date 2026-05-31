import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function BookkeepingDepartment() {
  const [expandedSection, setExpandedSection] = useState<string>('ledger');

  const sections = [
    {
      id: 'ledger',
      title: 'Ledger & Accounts',
      items: [
        { name: 'Chart of Accounts', balance: '₹2,45,60,000', type: 'Active' },
        { name: 'Assets', balance: '₹1,45,60,000', type: 'Asset Class' },
        { name: 'Liabilities', balance: '₹65,40,000', type: 'Liability Class' },
        { name: 'Equity', balance: '₹35,60,000', type: 'Equity Class' },
      ],
    },
    {
      id: 'journal',
      title: 'Journal Entries',
      items: [
        { date: '2026-05-31', description: 'Invoice INV-001 from Client ABC', amount: '₹50,000', status: 'Posted' },
        { date: '2026-05-30', description: 'Payment to Vendor XYZ', amount: '₹12,000', status: 'Posted' },
        { date: '2026-05-29', description: 'Bank Deposit', amount: '₹1,25,000', status: 'Posted' },
      ],
    },
    {
      id: 'trial',
      title: 'Trial Balance',
      items: [
        { account: 'Cash', debit: '₹58,400', credit: '-' },
        { account: 'Accounts Receivable', debit: '₹42,300', credit: '-' },
        { account: 'Inventory', debit: '₹65,000', credit: '-' },
        { account: 'Accounts Payable', debit: '-', credit: '₹35,200' },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 border border-border rounded-lg bg-card">
          <p className="text-sm font-semibold text-muted-foreground mb-2">Total Debits</p>
          <p className="text-2xl font-light">₹2,45,60,000</p>
        </div>
        <div className="p-6 border border-border rounded-lg bg-card">
          <p className="text-sm font-semibold text-muted-foreground mb-2">Total Credits</p>
          <p className="text-2xl font-light">₹2,45,60,000</p>
        </div>
        <div className="p-6 border border-border rounded-lg bg-card">
          <p className="text-sm font-semibold text-muted-foreground mb-2">Transactions Today</p>
          <p className="text-2xl font-light">8</p>
        </div>
        <div className="p-6 border border-border rounded-lg bg-card">
          <p className="text-sm font-semibold text-muted-foreground mb-2">Balance Status</p>
          <p className="text-2xl font-light text-primary">Balanced</p>
        </div>
      </div>

      {sections.map((section) => (
        <div key={section.id} className="border border-border rounded-lg bg-card overflow-hidden">
          <button
            onClick={() => setExpandedSection(expandedSection === section.id ? '' : section.id)}
            className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted transition-colors"
          >
            <h3 className="font-semibold">{section.title}</h3>
            {expandedSection === section.id ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {expandedSection === section.id && (
            <div className="px-6 py-4 border-t border-border">
              {section.id === 'ledger' && (
                <div className="space-y-3">
                  {section.items.map((item: any, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 hover:bg-muted rounded">
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.type}</p>
                      </div>
                      <p className="font-semibold">{item.balance}</p>
                    </div>
                  ))}
                </div>
              )}

              {section.id === 'journal' && (
                <div className="space-y-3">
                  {section.items.map((item: any, idx) => (
                    <div key={idx} className="p-3 border border-border rounded hover:bg-muted">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-medium">{item.description}</p>
                        <p className="font-semibold text-primary">{item.amount}</p>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <p>{item.date}</p>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded">{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {section.id === 'trial' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="border-b border-border">
                      <tr>
                        <th className="text-left py-2">Account</th>
                        <th className="text-right py-2">Debit</th>
                        <th className="text-right py-2">Credit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.items.map((item: any, idx) => (
                        <tr key={idx} className="border-b border-border hover:bg-muted">
                          <td className="py-2">{item.account}</td>
                          <td className="text-right py-2">{item.debit}</td>
                          <td className="text-right py-2">{item.credit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
