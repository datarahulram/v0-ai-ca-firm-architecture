'use client';

import { useState, useEffect } from 'react';
import { generateMockMetrics, generateMockDocuments, generateMockEngineAnalysis } from '@/lib/mock-data';
import { MoneyCard } from '@/components/money-card';
import { TasksCard } from '@/components/tasks-card';
import { ProblemsCard } from '@/components/problems-card';
import { AdviceCard } from '@/components/advice-card';
import { GrowthCard } from '@/components/growth-card';
import { MultiEnginePanel } from '@/components/multi-engine-panel';
import { DocumentIntake } from '@/components/document-intake';
import { ReportingPanel } from '@/components/reporting-panel';
import { AIConsultation } from '@/components/ai-consultation';
import { BookkeepingDepartment } from '@/components/bookkeeping-department';
import { ComplianceDepartment } from '@/components/compliance-department';
import { AuditDepartment } from '@/components/audit-department';
import { FinancialMetrics, DocumentAnalysis, MultiEngineReport } from '@/lib/types';
import { Menu, X, FileText, DollarSign, CheckCircle2, AlertCircle, TrendingUp, Brain, Zap, BookOpen } from 'lucide-react';

export default function Dashboard() {
  const [metrics, setMetrics] = useState<FinancialMetrics | null>(null);
  const [documents, setDocuments] = useState<DocumentAnalysis[]>([]);
  const [report, setReport] = useState<MultiEngineReport | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'bookkeeping' | 'tax' | 'compliance' | 'audit' | 'risk' | 'forecast' | 'cfo' | 'advisory'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setMetrics(generateMockMetrics());
    setDocuments(generateMockDocuments());
    setReport(generateMockEngineAnalysis());
  }, []);

  const departments = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: Brain },
    { id: 'bookkeeping', label: 'Bookkeeping', icon: BookOpen },
    { id: 'tax', label: 'Tax Planning', icon: DollarSign },
    { id: 'compliance', label: 'Compliance', icon: CheckCircle2 },
    { id: 'audit', label: 'Audit', icon: AlertCircle },
    { id: 'risk', label: 'Risk Analysis', icon: TrendingUp },
    { id: 'forecast', label: 'Forecasting', icon: Zap },
    { id: 'cfo', label: 'CFO Decisions', icon: Brain },
    { id: 'advisory', label: 'Advisory', icon: FileText },
  ];

  if (!metrics || !report) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-border border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Analyzing your finances...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="text-2xl font-light tracking-tight">Virtual CA Mind OS</h1>
              <p className="text-xs text-muted-foreground">AI Chartered Accountant Firm</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-muted-foreground">Last Updated</p>
              <p className="text-sm font-medium">{new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {sidebarOpen && (
          <div className="fixed inset-0 top-16 left-0 right-auto z-30 bg-card border-r border-border p-4 w-56 lg:static lg:inset-auto lg:top-auto lg:bg-background lg:border-r lg:border-border overflow-y-auto max-h-[calc(100vh-64px)]">
            <div className="mb-6">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Departments</p>
              <nav className="space-y-2">
                {departments.map((dept) => {
                  const Icon = dept.icon;
                  return (
                    <button
                      key={dept.id}
                      onClick={() => {
                        setActiveTab(dept.id as any);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        activeTab === dept.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{dept.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        <main className="flex-1 p-6 lg:p-8 max-w-7xl">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-light tracking-tight mb-2">Executive Dashboard</h2>
                <p className="text-muted-foreground">Real-time financial overview across all departments</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <MoneyCard data={metrics.money} />
                <TasksCard data={metrics.tasks} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProblemsCard data={metrics.problems} />
                <AdviceCard data={metrics.advice} />
              </div>
              <GrowthCard data={metrics.growth} />
            </div>
          )}

          {activeTab === 'bookkeeping' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-light tracking-tight mb-2">Bookkeeping Department</h2>
                <p className="text-muted-foreground">Accounting records, ledgers, and journal entries</p>
              </div>
              <BookkeepingDepartment />
            </div>
          )}

          {activeTab === 'tax' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-light tracking-tight mb-2">Tax Planning & Strategy</h2>
                <p className="text-muted-foreground">GST, Income Tax, TDS calculations and filings</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 border border-border rounded-lg bg-card">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">GST Liability</p>
                  <p className="text-2xl font-light">₹45,230</p>
                  <p className="text-xs text-primary mt-2">↑ 12% vs last month</p>
                </div>
                <div className="p-6 border border-border rounded-lg bg-card">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Tax Position</p>
                  <p className="text-2xl font-light">₹3,82,100</p>
                  <p className="text-xs text-muted-foreground mt-2">Current financial year</p>
                </div>
                <div className="p-6 border border-border rounded-lg bg-card">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">TDS Collected</p>
                  <p className="text-2xl font-light">₹28,450</p>
                  <p className="text-xs text-muted-foreground mt-2">Amount pending</p>
                </div>
              </div>
              <div className="p-6 border border-border rounded-lg bg-card">
                <h3 className="font-semibold mb-4">Tax Recommendations</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Review GST returns for potential input credits optimization</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Consider TDS provisions before year-end to minimize liabilities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span>Implement income splitting strategy for better tax efficiency</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-light tracking-tight mb-2">Compliance Management</h2>
                <p className="text-muted-foreground">Filing deadlines, regulatory requirements, and penalties</p>
              </div>
              <ComplianceDepartment />
            </div>
          )}

          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-light tracking-tight mb-2">Audit & Verification</h2>
                <p className="text-muted-foreground">Financial record validation and fraud detection</p>
              </div>
              <AuditDepartment />
            </div>
          )}

          {activeTab === 'risk' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-light tracking-tight mb-2">Risk Analysis</h2>
                <p className="text-muted-foreground">Comprehensive risk assessment across all operations</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 border border-border rounded-lg bg-card">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Cash Risk</p>
                  <p className="text-2xl font-light text-yellow-600">Medium</p>
                  <p className="text-xs text-muted-foreground mt-2">Days cash on hand: 45</p>
                </div>
                <div className="p-6 border border-border rounded-lg bg-card">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Tax Risk</p>
                  <p className="text-2xl font-light text-green-600">Low</p>
                  <p className="text-xs text-muted-foreground mt-2">Compliance score: 95%</p>
                </div>
                <div className="p-6 border border-border rounded-lg bg-card">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Vendor Risk</p>
                  <p className="text-2xl font-light text-yellow-600">Medium</p>
                  <p className="text-xs text-muted-foreground mt-2">3 vendors at risk</p>
                </div>
                <div className="p-6 border border-border rounded-lg bg-card">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Customer Risk</p>
                  <p className="text-2xl font-light text-yellow-600">Medium</p>
                  <p className="text-xs text-muted-foreground mt-2">₹12L overdue</p>
                </div>
                <div className="p-6 border border-border rounded-lg bg-card">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Compliance Risk</p>
                  <p className="text-2xl font-light text-green-600">Low</p>
                  <p className="text-xs text-muted-foreground mt-2">All deadlines met</p>
                </div>
                <div className="p-6 border border-border rounded-lg bg-card">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Overall Risk</p>
                  <p className="text-2xl font-light">Medium</p>
                  <p className="text-xs text-muted-foreground mt-2">Action needed: 3</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'forecast' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-light tracking-tight mb-2">Forecasting & Scenarios</h2>
                <p className="text-muted-foreground">Revenue, cash flow, and growth projections</p>
              </div>
              <GrowthCard data={metrics.growth} />
              <div className="p-6 border border-border rounded-lg bg-card">
                <h3 className="font-semibold mb-4">30/90/180 Day Forecast</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Next 30 Days</p>
                    <p className="text-xl font-light">₹28.5L</p>
                    <p className="text-xs text-green-600 mt-1">↑ 8% confidence</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Next 90 Days</p>
                    <p className="text-xl font-light">₹92.3L</p>
                    <p className="text-xs text-green-600 mt-1">↑ 6% confidence</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">Next 180 Days</p>
                    <p className="text-xl font-light">₹2.1Cr</p>
                    <p className="text-xs text-yellow-600 mt-1">↑ 4% confidence</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cfo' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-light tracking-tight mb-2">CFO Intelligence & Decisions</h2>
                <p className="text-muted-foreground">Strategic business decision recommendations</p>
              </div>
              <div className="space-y-6">
                <div className="p-6 border border-border rounded-lg bg-card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">Can I hire 5 employees?</h3>
                      <p className="text-sm text-muted-foreground mt-1">₹25L annual cost</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded font-semibold text-sm">Recommended</span>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Confidence Score</p>
                      <p className="text-2xl font-light text-primary">87%</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Reasoning</p>
                      <ul className="text-sm space-y-1">
                        <li>✓ Cash reserves sufficient for next 12 months</li>
                        <li>✓ Revenue growth supporting expansion</li>
                        <li>✓ Operational capacity requires additional headcount</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="p-6 border border-border rounded-lg bg-card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold">Should I apply for working capital loan?</h3>
                      <p className="text-sm text-muted-foreground mt-1">₹1Cr facility</p>
                    </div>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded font-semibold text-sm">Consider</span>
                  </div>
                  <div className="mt-4 space-y-3">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Confidence Score</p>
                      <p className="text-2xl font-light text-primary">72%</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">Conditions</p>
                      <ul className="text-sm space-y-1">
                        <li>⚠ High debt-to-equity ratio may impact approval</li>
                        <li>✓ Strong revenue trajectory supports repayment</li>
                        <li>✓ Improved cash management needed</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'advisory' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-light tracking-tight mb-2">Strategic Advisory</h2>
                <p className="text-muted-foreground">Business intelligence and growth strategies</p>
              </div>
              <AIConsultation />
            </div>
          )}
        </main>
      </div>

      <footer className="border-t border-border bg-card/50 p-6 text-center text-xs text-muted-foreground">
        <p>Virtual CA Mind OS © 2026 | AI Chartered Accountant Firm | All Departments Integrated</p>
      </footer>
    </div>
  );
}
