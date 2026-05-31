export interface FinancialMetrics {
  money: MoneyMetrics;
  tasks: TaskMetrics;
  problems: ProblemMetrics;
  advice: AdviceMetrics;
  growth: GrowthMetrics;
}

export interface MoneyMetrics {
  totalRevenue: number;
  totalExpenses: number;
  netProfit: number;
  cashFlow: number;
  trends: number; // percentage change
}

export interface TaskMetrics {
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  dueToday: number;
}

export interface ProblemMetrics {
  critical: number;
  high: number;
  medium: number;
  low: number;
  resolved: number;
}

export interface AdviceMetrics {
  recommendations: Recommendation[];
  priority: string;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  status: 'pending' | 'implemented' | 'dismissed';
}

export interface GrowthMetrics {
  yearOverYear: number;
  quarterOverQuarter: number;
  monthOverMonth: number;
  projectedNext12M: number;
  historicalData: GrowthData[];
}

export interface GrowthData {
  period: string;
  value: number;
}

export interface DocumentAnalysis {
  id: string;
  fileName: string;
  type: 'invoice' | 'receipt' | 'statement' | 'tax' | 'other';
  amount: number;
  date: string;
  category: string;
  confidence: number;
  status: 'processed' | 'pending' | 'error';
}

export interface EngineAnalysis {
  engineName: string;
  findings: string[];
  recommendations: string[];
  alerts: string[];
  dataQuality: number;
}

export interface MultiEngineReport {
  timestamp: string;
  documentAnalyzer: EngineAnalysis;
  bookkeeper: EngineAnalysis;
  taxAdvisor: EngineAnalysis;
  complianceChecker: EngineAnalysis;
  auditEngine: EngineAnalysis;
  riskAnalyzer: EngineAnalysis;
  forecastEngine: EngineAnalysis;
  analyticsEngine: EngineAnalysis;
}
