'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Home } from 'lucide-react';
import BookkeepingPage from '@/components/pages/bookkeeping-page';
import TaxPage from '@/components/pages/tax-page';
import CompliancePage from '@/components/pages/compliance-page';
import AuditPage from '@/components/pages/audit-page';
import RiskPage from '@/components/pages/risk-page';
import ForecastPage from '@/components/pages/forecast-page';
import CFOPage from '@/components/pages/cfo-page';

type PageType = 'dashboard' | 'bookkeeping' | 'tax' | 'compliance' | 'audit' | 'risk' | 'forecast' | 'cfo';

const DEPARTMENTS = [
  { id: 'bookkeeping', label: 'Bookkeeping' },
  { id: 'tax', label: 'Tax Planning' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'audit', label: 'Audit' },
  { id: 'risk', label: 'Risk Analytics' },
  { id: 'forecast', label: 'Forecasting' },
  { id: 'cfo', label: 'CFO Decisions' },
];

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-border border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading Virtual CA Mind OS...</p>
        </div>
      </div>
    );
  }

  const goToDashboard = () => {
    setCurrentPage('dashboard');
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <button
              onClick={goToDashboard}
              className="flex items-center gap-2 hover:opacity-75 transition-opacity"
            >
              <div>
                <h1 className="text-xl sm:text-2xl font-light tracking-tight">Virtual CA</h1>
                <p className="text-xs text-muted-foreground">Financial Intelligence</p>
              </div>
            </button>
          </div>
          {currentPage !== 'dashboard' && (
            <button
              onClick={goToDashboard}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium hover:bg-muted rounded-lg transition-colors ml-auto"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        {sidebarOpen && (
          <div className="fixed inset-0 top-16 left-0 right-auto z-30 bg-card border-r border-border w-64 overflow-y-auto lg:static lg:top-auto lg:inset-auto lg:bg-background lg:border-r lg:border-border">
            <nav className="p-4 space-y-1">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide px-4 py-2">
                Departments
              </div>
              {DEPARTMENTS.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => {
                    setCurrentPage(dept.id as PageType);
                    setSidebarOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    currentPage === dept.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {dept.label}
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
            {/* Dashboard */}
            {currentPage === 'dashboard' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-light tracking-tight">Executive Dashboard</h2>
                  <p className="text-muted-foreground mt-2">
                    Real-time financial overview and department access
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-6 border border-border rounded-lg bg-card">
                    <p className="text-sm text-muted-foreground font-medium">Total Revenue</p>
                    <p className="text-3xl font-light mt-2">₹14.2L</p>
                    <p className="text-xs text-green-600 mt-2">↑ 12% vs last month</p>
                  </div>
                  <div className="p-6 border border-border rounded-lg bg-card">
                    <p className="text-sm text-muted-foreground font-medium">Tax Liability</p>
                    <p className="text-3xl font-light mt-2 text-red-600">₹2.85L</p>
                    <p className="text-xs text-muted-foreground mt-2">Current FY</p>
                  </div>
                  <div className="p-6 border border-border rounded-lg bg-card">
                    <p className="text-sm text-muted-foreground font-medium">Audit Score</p>
                    <p className="text-3xl font-light mt-2 text-green-600">94/100</p>
                    <p className="text-xs text-green-600 mt-2">Excellent</p>
                  </div>
                  <div className="p-6 border border-border rounded-lg bg-card">
                    <p className="text-sm text-muted-foreground font-medium">Risk Level</p>
                    <p className="text-3xl font-light mt-2 text-yellow-600">Medium</p>
                    <p className="text-xs text-muted-foreground mt-2">3 items to review</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 p-6 border border-border rounded-lg bg-card">
                    <h3 className="font-semibold mb-4">All Departments</h3>
                    <div className="space-y-2">
                      {DEPARTMENTS.map((dept) => (
                        <button
                          key={dept.id}
                          onClick={() => {
                            setCurrentPage(dept.id as PageType);
                            setSidebarOpen(false);
                          }}
                          className="w-full text-left px-4 py-3 rounded-lg hover:bg-muted transition-colors flex justify-between items-center text-sm"
                        >
                          <span>{dept.label}</span>
                          <span className="text-xs text-muted-foreground">→</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="p-6 border border-border rounded-lg bg-card">
                    <h3 className="font-semibold mb-4">System Status</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">AI Engine</span>
                        <span className="text-green-600 text-xs font-medium">Active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Data Sync</span>
                        <span className="text-green-600 text-xs font-medium">Current</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Compliance</span>
                        <span className="text-green-600 text-xs font-medium">On Track</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Last Update</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date().toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Department Pages */}
            {currentPage === 'bookkeeping' && (
              <BookkeepingPage onBack={goToDashboard} />
            )}
            {currentPage === 'tax' && <TaxPage onBack={goToDashboard} />}
            {currentPage === 'compliance' && <CompliancePage onBack={goToDashboard} />}
            {currentPage === 'audit' && <AuditPage onBack={goToDashboard} />}
            {currentPage === 'risk' && <RiskPage onBack={goToDashboard} />}
            {currentPage === 'forecast' && <ForecastPage onBack={goToDashboard} />}
            {currentPage === 'cfo' && <CFOPage onBack={goToDashboard} />}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 p-4 sm:p-6 text-center text-xs text-muted-foreground">
        <p>Virtual CA Mind OS © 2026 | AI-Powered Financial Intelligence Platform</p>
      </footer>
    </div>
  );
}
