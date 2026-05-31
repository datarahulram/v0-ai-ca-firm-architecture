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
import { TaxDepartment } from '@/components/tax-department';
import { RiskAnalyticsDepartment } from '@/components/risk-analytics-department';
import { ForecastCFODepartment } from '@/components/forecast-cfo-department';
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
              <TaxDepartment />
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
              <RiskAnalyticsDepartment />
            </div>
          )}

          {activeTab === 'forecast' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-light tracking-tight mb-2">Forecasting & Scenarios</h2>
                <p className="text-muted-foreground">Revenue, cash flow, and growth projections</p>
              </div>
              <ForecastCFODepartment />
            </div>
          )}

          {activeTab === 'cfo' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-light tracking-tight mb-2">CFO Intelligence & Decisions</h2>
                <p className="text-muted-foreground">Strategic business decision recommendations</p>
              </div>
              <ForecastCFODepartment />
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
