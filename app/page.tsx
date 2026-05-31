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
import { FinancialMetrics, DocumentAnalysis, MultiEngineReport } from '@/lib/types';
import { Menu, X } from 'lucide-react';

export default function Dashboard() {
  const [metrics, setMetrics] = useState<FinancialMetrics | null>(null);
  const [documents, setDocuments] = useState<DocumentAnalysis[]>([]);
  const [report, setReport] = useState<MultiEngineReport | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'documents' | 'engines' | 'reporting' | 'consultation'>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    setMetrics(generateMockMetrics());
    setDocuments(generateMockDocuments());
    setReport(generateMockEngineAnalysis());
  }, []);

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
      {/* Header */}
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
              <h1 className="text-2xl font-light tracking-tight">Virtual CA</h1>
              <p className="text-xs text-muted-foreground">AI Chartered Accountant Platform</p>
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
        {/* Sidebar Navigation */}
        {sidebarOpen && (
          <div className="fixed inset-0 top-16 left-0 right-auto z-30 bg-card border-r border-border p-4 w-48 lg:static lg:inset-auto lg:top-auto lg:bg-transparent lg:border-r lg:border-border">
            <nav className="space-y-2">
              {[
                { id: 'overview', label: 'Dashboard Overview' },
                { id: 'documents', label: 'Document Intake' },
                { id: 'engines', label: 'Multi-Engine Analysis' },
                { id: 'reporting', label: 'Reports & Export' },
                { id: 'consultation', label: 'AI Consultation' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Main Metrics Grid - Golden Ratio Layout */}
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

          {/* Document Intake Tab */}
          {activeTab === 'documents' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-light tracking-tight mb-2">Document Intake Engine</h2>
                <p className="text-muted-foreground text-sm">
                  Upload financial documents for automatic analysis and categorization
                </p>
              </div>
              <DocumentIntake documents={documents} />
            </div>
          )}

          {/* Multi-Engine Analysis Tab */}
          {activeTab === 'engines' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-light tracking-tight mb-2">Multi-Engine Analysis</h2>
                <p className="text-muted-foreground text-sm">
                  Comprehensive financial analysis from 8 specialized AI engines
                </p>
              </div>
              <MultiEnginePanel report={report} />
            </div>
          )}

          {/* Reporting Tab */}
          {activeTab === 'reporting' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-light tracking-tight mb-2">Reports & Export</h2>
                <p className="text-muted-foreground text-sm">
                  Generate comprehensive financial reports and export your data
                </p>
              </div>
              <ReportingPanel />
            </div>
          )}

          {/* AI Consultation Tab */}
          {activeTab === 'consultation' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-light tracking-tight mb-2">AI Financial Advisor</h2>
                <p className="text-muted-foreground text-sm">
                  Ask questions about your finances, taxes, and growth strategies
                </p>
              </div>
              <AIConsultation />
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 p-6 text-center text-xs text-muted-foreground">
        <p>Virtual CA © 2024 | Powered by AI Engines | Real-time Financial Intelligence</p>
      </footer>
    </div>
  );
}
