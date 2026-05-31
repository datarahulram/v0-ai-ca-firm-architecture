'use client';

import { useState, useEffect } from 'react';
import { BookkeepingDepartmentV2 } from '@/components/bookkeeping-v2';
import { TaxDepartmentV2 } from '@/components/tax-v2';
import { ComplianceDepartmentV2 } from '@/components/compliance-v2';
import { AuditDepartmentV2 } from '@/components/audit-v2';
import { RiskAnalyticsDepartmentV2 } from '@/components/risk-v2';
import { ForecastCFODepartmentV2 } from '@/components/forecast-cfo-v2';
import { Menu, X, Brain, BookOpen, DollarSign, CheckCircle2, AlertCircle, BarChart3, TrendingUp, Zap } from 'lucide-react';

type DepartmentTab = 'dashboard' | 'bookkeeping' | 'tax' | 'compliance' | 'audit' | 'risk' | 'forecast' | 'cfo';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<DepartmentTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const departments = [
    { id: 'dashboard', label: 'Executive Dashboard', icon: Brain },
    { id: 'bookkeeping', label: 'Bookkeeping', icon: BookOpen },
    { id: 'tax', label: 'Tax Planning', icon: DollarSign },
    { id: 'compliance', label: 'Compliance', icon: CheckCircle2 },
    { id: 'audit', label: 'Audit', icon: AlertCircle },
    { id: 'risk', label: 'Risk Analytics', icon: TrendingUp },
    { id: 'forecast', label: 'Forecasting', icon: Zap },
    { id: 'cfo', label: 'CFO Decisions', icon: BarChart3 },
  ];

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-border border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading CA Mind OS...</p>
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
              <h1 className="text-2xl font-light tracking-tight">Virtual CA Mind OS</h1>
              <p className="text-xs text-muted-foreground">Real-time Financial Intelligence Platform</p>
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <p className="text-xs text-muted-foreground">Active Department</p>
            <p className="text-sm font-medium">
              {departments.find(d => d.id === activeTab)?.label || 'Dashboard'}
            </p>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="fixed inset-0 top-16 left-0 right-auto z-30 bg-card border-r border-border p-4 w-56 lg:static lg:inset-auto lg:top-auto lg:bg-background lg:border-r lg:border-border max-h-[calc(100vh-64px)] overflow-y-auto">
            <div className="mb-6">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4">Departments</p>
              <nav className="space-y-2">
                {departments.map(dept => {
                  const Icon = dept.icon;
                  return (
                    <button
                      key={dept.id}
                      onClick={() => {
                        setActiveTab(dept.id as DepartmentTab);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        activeTab === dept.id
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="text-left">{dept.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 lg:p-8 max-w-7xl">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-light tracking-tight">Executive Dashboard</h2>
                <p className="text-muted-foreground mt-2">Real-time financial metrics across all departments</p>
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
                  <p className="text-xs text-green-600 mt-2">✓ Excellent</p>
                </div>
                <div className="p-6 border border-border rounded-lg bg-card">
                  <p className="text-sm text-muted-foreground font-medium">Risk Level</p>
                  <p className="text-3xl font-light mt-2 text-yellow-600">Medium</p>
                  <p className="text-xs text-muted-foreground mt-2">3 actions needed</p>
                </div>
              </div>

              <div className="p-6 border border-border rounded-lg bg-card">
                <h3 className="font-semibold mb-4">Quick Access</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {departments.slice(1).map(dept => (
                    <button
                      key={dept.id}
                      onClick={() => {
                        setActiveTab(dept.id as DepartmentTab);
                        setSidebarOpen(false);
                      }}
                      className="p-3 border border-border rounded-lg hover:bg-muted transition-colors text-center text-sm font-medium"
                    >
                      {dept.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Bookkeeping */}
          {activeTab === 'bookkeeping' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-light tracking-tight">Bookkeeping Department</h2>
                <p className="text-muted-foreground mt-2">General Ledger, Journal Entries & Trial Balance</p>
              </div>
              <BookkeepingDepartmentV2 />
            </div>
          )}

          {/* Tax */}
          {activeTab === 'tax' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-light tracking-tight">Tax Planning</h2>
                <p className="text-muted-foreground mt-2">Income Tax, GST & TDS Calculations</p>
              </div>
              <TaxDepartmentV2 />
            </div>
          )}

          {/* Compliance */}
          {activeTab === 'compliance' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-light tracking-tight">Compliance Management</h2>
                <p className="text-muted-foreground mt-2">Filing Deadlines, Penalties & Compliance Tracking</p>
              </div>
              <ComplianceDepartmentV2 />
            </div>
          )}

          {/* Audit */}
          {activeTab === 'audit' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-light tracking-tight">Audit & Verification</h2>
                <p className="text-muted-foreground mt-2">Transaction Verification & Audit Readiness</p>
              </div>
              <AuditDepartmentV2 />
            </div>
          )}

          {/* Risk */}
          {activeTab === 'risk' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-light tracking-tight">Risk Analytics</h2>
                <p className="text-muted-foreground mt-2">Comprehensive Risk Assessment & Mitigation</p>
              </div>
              <RiskAnalyticsDepartmentV2 />
            </div>
          )}

          {/* Forecast */}
          {activeTab === 'forecast' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-light tracking-tight">Forecasting</h2>
                <p className="text-muted-foreground mt-2">Revenue Projections & Financial Scenarios</p>
              </div>
              <ForecastCFODepartmentV2 />
            </div>
          )}

          {/* CFO */}
          {activeTab === 'cfo' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-light tracking-tight">CFO Intelligence</h2>
                <p className="text-muted-foreground mt-2">Strategic Business Decisions & Analysis</p>
              </div>
              <ForecastCFODepartmentV2 />
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 p-6 text-center text-xs text-muted-foreground">
        <p>Virtual CA Mind OS © 2026 | Real-time Financial Intelligence | All Rights Reserved</p>
      </footer>
    </div>
  );
}
