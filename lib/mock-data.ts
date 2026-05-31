import { FinancialMetrics, TaskMetrics, ProblemMetrics, AdviceMetrics, GrowthMetrics, DocumentAnalysis, MultiEngineReport, EngineAnalysis } from '@/lib/types';

// Mock data generator for realistic financial metrics
export const generateMockMetrics = (): FinancialMetrics => {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const daysInMonth = (new Date(now.getFullYear(), now.getMonth() + 1, 0)).getDate();
  const dayOfMonth = now.getDate();
  const progressPercent = dayOfMonth / daysInMonth;

  return {
    money: {
      totalRevenue: 125000 + Math.random() * 25000,
      totalExpenses: 45000 + Math.random() * 15000,
      netProfit: 75000 + Math.random() * 20000,
      cashFlow: 42000 + Math.random() * 18000,
      trends: 12.5 + (Math.random() - 0.5) * 5,
    },
    tasks: {
      total: 24,
      completed: Math.floor(24 * progressPercent),
      pending: Math.ceil(24 * (1 - progressPercent)),
      overdue: Math.floor(Math.random() * 2),
      dueToday: Math.floor(Math.random() * 4) + 1,
    },
    problems: {
      critical: Math.floor(Math.random() * 2),
      high: Math.floor(Math.random() * 3) + 1,
      medium: Math.floor(Math.random() * 4) + 2,
      low: Math.floor(Math.random() * 5) + 3,
      resolved: 8,
    },
    advice: {
      recommendations: [
        {
          id: '1',
          title: 'Optimize Tax Strategy',
          description: 'Review current tax position and implement Q4 planning strategies',
          impact: 'high',
          status: 'pending',
        },
        {
          id: '2',
          title: 'Review Expense Categories',
          description: 'Categorize uncategorized transactions for better insights',
          impact: 'medium',
          status: 'pending',
        },
        {
          id: '3',
          title: 'Update Financial Forecasts',
          description: 'Recalibrate 12-month projections based on Q3 performance',
          impact: 'high',
          status: 'pending',
        },
      ],
      priority: 'Tax optimization could save $15,000+ annually',
    },
    growth: {
      yearOverYear: 18.5,
      quarterOverQuarter: 6.2,
      monthOverMonth: 2.1,
      projectedNext12M: 145000,
      historicalData: [
        { period: 'Jan', value: 95000 },
        { period: 'Feb', value: 102000 },
        { period: 'Mar', value: 108000 },
        { period: 'Apr', value: 115000 },
        { period: 'May', value: 118000 },
        { period: 'Jun', value: 125000 },
      ],
    },
  };
};

export const generateMockDocuments = (): DocumentAnalysis[] => [
  {
    id: '1',
    fileName: 'Invoice-2024-001.pdf',
    type: 'invoice',
    amount: 5200,
    date: new Date().toISOString().split('T')[0],
    category: 'Client Services',
    confidence: 0.98,
    status: 'processed',
  },
  {
    id: '2',
    fileName: 'Receipt-Office-Supplies.pdf',
    type: 'receipt',
    amount: 340,
    date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    category: 'Office Supplies',
    confidence: 0.94,
    status: 'processed',
  },
  {
    id: '3',
    fileName: 'Bank-Statement-Nov.pdf',
    type: 'statement',
    amount: 42500,
    date: new Date(Date.now() - 172800000).toISOString().split('T')[0],
    category: 'Cash Position',
    confidence: 1.0,
    status: 'processed',
  },
];

export const generateMockEngineAnalysis = (): MultiEngineReport => {
  const baseFindings = {
    documentAnalyzer: {
      engineName: 'Document Analyzer',
      findings: [
        'Processed 125 documents this month',
        'Average confidence score: 96.2%',
        'Identified 3 high-value invoices',
      ],
      recommendations: [
        'Implement automated invoice routing',
        'Set up recurring receipt uploads',
      ],
      alerts: [],
      dataQuality: 96,
    },
    bookkeeper: {
      engineName: 'Bookkeeping Engine',
      findings: [
        'All transactions reconciled',
        'Cash flow positive across all categories',
        '8 uncategorized transactions requiring review',
      ],
      recommendations: [
        'Review expense coding for accuracy',
        'Set up automated categorization rules',
      ],
      alerts: [
        'One transaction exceeds budget threshold',
      ],
      dataQuality: 92,
    },
    taxAdvisor: {
      engineName: 'Tax Advisor',
      findings: [
        'Current tax position: $18,500 estimated liability',
        'Eligible deductions: $35,000',
        'Recommended tax provision: 22.5%',
      ],
      recommendations: [
        'Implement quarterly tax planning',
        'Consider tax-loss harvesting opportunities',
        'Review S-Corp vs LLC structure',
      ],
      alerts: [
        'Estimated tax payment due in 15 days',
      ],
      dataQuality: 88,
    },
    complianceChecker: {
      engineName: 'Compliance Checker',
      findings: [
        'All filings up to date',
        'License renewals due in 3 months',
        'Audit trail complete for all transactions',
      ],
      recommendations: [
        'Schedule license renewal process',
        'Update compliance calendar',
      ],
      alerts: [],
      dataQuality: 95,
    },
    auditEngine: {
      engineName: 'Audit Engine',
      findings: [
        'Financial statements aligned with GL',
        'No material discrepancies detected',
        'All supporting documentation available',
      ],
      recommendations: [
        'Document internal control procedures',
        'Schedule internal audit',
      ],
      alerts: [],
      dataQuality: 98,
    },
    riskAnalyzer: {
      engineName: 'Risk Analyzer',
      findings: [
        'Overall risk score: 3.2/10 (Low)',
        'Cash reserve ratio: 2.1 months optimal',
        'Revenue concentration: Moderate (3 clients > 40%)',
      ],
      recommendations: [
        'Diversify client base',
        'Increase cash reserves to 3 months',
      ],
      alerts: [
        'One major client at risk: review contract',
      ],
      dataQuality: 91,
    },
    forecastEngine: {
      engineName: 'Forecast Engine',
      findings: [
        'Projected 12-month revenue: $1.45M',
        'Operating margin trend: Improving',
        'Cash flow forecast: Healthy',
      ],
      recommendations: [
        'Increase marketing spend 20% for growth',
        'Plan for seasonal adjustments',
      ],
      alerts: [
        'Q4 typically sees 15% revenue dip',
      ],
      dataQuality: 87,
    },
    analyticsEngine: {
      engineName: 'Analytics Engine',
      findings: [
        'YoY growth: 18.5%',
        'Average invoice value: $4,250',
        'Payment terms: 30 days average',
      ],
      recommendations: [
        'Improve collection process',
        'Adjust pricing for premium services',
      ],
      alerts: [],
      dataQuality: 94,
    },
  };

  return {
    timestamp: new Date().toISOString(),
    documentAnalyzer: baseFindings.documentAnalyzer as EngineAnalysis,
    bookkeeper: baseFindings.bookkeeper as EngineAnalysis,
    taxAdvisor: baseFindings.taxAdvisor as EngineAnalysis,
    complianceChecker: baseFindings.complianceChecker as EngineAnalysis,
    auditEngine: baseFindings.auditEngine as EngineAnalysis,
    riskAnalyzer: baseFindings.riskAnalyzer as EngineAnalysis,
    forecastEngine: baseFindings.forecastEngine as EngineAnalysis,
    analyticsEngine: baseFindings.analyticsEngine as EngineAnalysis,
  };
};
