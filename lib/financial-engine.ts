// Global state and data management for the entire CA platform
export interface FinancialData {
  id: string;
  month: string;
  revenue: number;
  expenses: number;
  gst_collected: number;
  gst_paid: number;
  tds_collected: number;
  deposits: Deposit[];
  invoices: Invoice[];
  expenses_items: ExpenseItem[];
}

export interface Deposit {
  id: string;
  date: string;
  amount: number;
  description: string;
  category: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  date: string;
  amount: number;
  gst: number;
  status: 'paid' | 'pending' | 'overdue';
  customer: string;
}

export interface ExpenseItem {
  id: string;
  date: string;
  amount: number;
  category: string;
  description: string;
  gst: number;
  vendor: string;
}

export interface BookkeepingEntry {
  id: string;
  date: string;
  account: string;
  debit: number;
  credit: number;
  description: string;
  reference: string;
}

export interface TaxCalculation {
  gross_revenue: number;
  deductions: number;
  taxable_income: number;
  tax_rate: number;
  total_tax: number;
  gst_liability: number;
  tds_collected: number;
  net_tax_payable: number;
}

export interface RiskFactor {
  id: string;
  category: 'cash_flow' | 'tax' | 'vendor' | 'customer' | 'compliance';
  risk_score: number; // 0-100
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  mitigation: string[];
}

export interface Forecast {
  scenario: 'base' | 'optimistic' | 'conservative';
  month: string;
  revenue: number;
  expenses: number;
  cash_flow: number;
  confidence: number;
}

export interface CFODecision {
  id: string;
  question: string;
  cost: number;
  confidence: number;
  recommendation: 'recommended' | 'consider' | 'not_recommended';
  reasoning: string[];
  risk_factors: string[];
}

// Global Financial Data Store
class FinancialDataStore {
  private data: FinancialData;

  constructor() {
    this.data = this.initializeData();
  }

  private initializeData(): FinancialData {
    return {
      id: 'fy_2025_2026',
      month: 'June 2026',
      revenue: 1420000,
      expenses: 580000,
      gst_collected: 45230,
      gst_paid: 28450,
      tds_collected: 28450,
      deposits: [
        { id: '1', date: '2026-06-01', amount: 250000, description: 'Client ABC Payment', category: 'services' },
        { id: '2', date: '2026-06-05', amount: 180000, description: 'Client XYZ Payment', category: 'services' },
        { id: '3', date: '2026-06-10', amount: 320000, description: 'Client 123 Payment', category: 'services' },
      ],
      invoices: [
        { id: '1', invoice_number: 'INV-001', date: '2026-06-01', amount: 250000, gst: 45000, status: 'paid', customer: 'ABC Corp' },
        { id: '2', invoice_number: 'INV-002', date: '2026-06-05', amount: 180000, gst: 32400, status: 'pending', customer: 'XYZ Ltd' },
        { id: '3', invoice_number: 'INV-003', date: '2026-06-15', amount: 120000, gst: 21600, status: 'overdue', customer: 'Tech Solutions' },
      ],
      expenses_items: [
        { id: '1', date: '2026-06-02', amount: 50000, category: 'salaries', description: 'Employee Salaries', gst: 0, vendor: 'Payroll' },
        { id: '2', date: '2026-06-05', amount: 25000, category: 'utilities', description: 'Office Utilities', gst: 4500, vendor: 'Power Company' },
        { id: '3', date: '2026-06-10', amount: 15000, category: 'supplies', description: 'Office Supplies', gst: 2700, vendor: 'Supplier XYZ' },
      ],
    };
  }

  // Bookkeeping calculations
  calculateBookkeepingEntries(): BookkeepingEntry[] {
    const entries: BookkeepingEntry[] = [];
    let id = 1;

    // Revenue entries
    for (const deposit of this.data.deposits) {
      entries.push({
        id: `${id++}`,
        date: deposit.date,
        account: 'Bank',
        debit: deposit.amount,
        credit: 0,
        description: `Deposit - ${deposit.description}`,
        reference: `DEP-${deposit.id}`,
      });
      entries.push({
        id: `${id++}`,
        date: deposit.date,
        account: 'Revenue',
        debit: 0,
        credit: deposit.amount,
        description: `Revenue - ${deposit.description}`,
        reference: `DEP-${deposit.id}`,
      });
    }

    // Expense entries
    for (const expense of this.data.expenses_items) {
      entries.push({
        id: `${id++}`,
        date: expense.date,
        account: 'Expense - ' + expense.category,
        debit: expense.amount,
        credit: 0,
        description: expense.description,
        reference: `EXP-${expense.id}`,
      });
      entries.push({
        id: `${id++}`,
        date: expense.date,
        account: 'Bank',
        debit: 0,
        credit: expense.amount,
        description: `Payment - ${expense.description}`,
        reference: `EXP-${expense.id}`,
      });
    }

    return entries;
  }

  // Tax calculations based on real data
  calculateTaxes(): TaxCalculation {
    const gross_revenue = this.data.revenue;
    const total_expenses = this.data.expenses;
    const deductions = total_expenses + this.data.tds_collected;
    const taxable_income = Math.max(0, gross_revenue - deductions);
    const tax_rate = 0.30; // 30% corporate tax
    const total_tax = taxable_income * tax_rate;

    return {
      gross_revenue,
      deductions,
      taxable_income,
      tax_rate,
      total_tax,
      gst_liability: this.data.gst_collected - this.data.gst_paid,
      tds_collected: this.data.tds_collected,
      net_tax_payable: total_tax + (this.data.gst_collected - this.data.gst_paid),
    };
  }

  // Risk analysis based on data
  calculateRisks(): RiskFactor[] {
    const taxes = this.calculateTaxes();
    const cash_position = this.data.deposits.reduce((a, b) => a + b.amount, 0) - this.data.expenses;
    const overdue_invoices = this.data.invoices.filter(i => i.status === 'overdue').reduce((a, b) => a + b.amount, 0);
    const pending_invoices = this.data.invoices.filter(i => i.status === 'pending').reduce((a, b) => a + b.amount, 0);

    return [
      {
        id: 'cash_risk',
        category: 'cash_flow',
        risk_score: cash_position > 500000 ? 20 : cash_position > 200000 ? 45 : 75,
        severity: cash_position > 500000 ? 'low' : cash_position > 200000 ? 'medium' : 'high',
        description: 'Cash flow position analysis',
        mitigation: ['Accelerate receivables collection', 'Optimize payment terms', 'Build cash reserves'],
      },
      {
        id: 'tax_risk',
        category: 'tax',
        risk_score: taxes.taxable_income > 1000000 ? 65 : 35,
        severity: taxes.taxable_income > 1000000 ? 'high' : 'low',
        description: 'Tax liability and compliance risk',
        mitigation: ['Review deductions', 'Plan tax savings', 'Ensure timely filing'],
      },
      {
        id: 'customer_risk',
        category: 'customer',
        risk_score: (overdue_invoices / this.data.revenue) * 100,
        severity: overdue_invoices > 100000 ? 'high' : 'medium',
        description: `₹${overdue_invoices} in overdue invoices`,
        mitigation: ['Follow up on overdue payments', 'Adjust credit policies', 'Implement payment reminders'],
      },
    ];
  }

  // Forecasting calculations
  calculateForecasts(): Forecast[] {
    const baseRevenue = this.data.revenue;
    const baseExpenses = this.data.expenses;

    return [
      {
        scenario: 'base',
        month: 'July 2026',
        revenue: baseRevenue * 0.95,
        expenses: baseExpenses * 1.05,
        cash_flow: baseRevenue * 0.95 - baseExpenses * 1.05,
        confidence: 88,
      },
      {
        scenario: 'optimistic',
        month: 'July 2026',
        revenue: baseRevenue * 1.25,
        expenses: baseExpenses * 0.95,
        cash_flow: baseRevenue * 1.25 - baseExpenses * 0.95,
        confidence: 65,
      },
      {
        scenario: 'conservative',
        month: 'July 2026',
        revenue: baseRevenue * 0.75,
        expenses: baseExpenses * 1.15,
        cash_flow: baseRevenue * 0.75 - baseExpenses * 1.15,
        confidence: 72,
      },
    ];
  }

  // CFO Decisions based on calculations
  calculateCFODecisions(): CFODecision[] {
    const cash_position = this.data.deposits.reduce((a, b) => a + b.amount, 0) - this.data.expenses;
    const monthly_cash_burn = this.data.expenses;

    return [
      {
        id: 'hire_5_employees',
        question: 'Can I hire 5 new employees?',
        cost: 2500000, // ₹25L annually
        confidence: cash_position > 2500000 * 2 ? 87 : 45,
        recommendation: cash_position > 2500000 * 2 ? 'recommended' : 'consider',
        reasoning: [
          `Cash reserves: ₹${cash_position}`,
          `Annual cost: ₹${2500000}`,
          `Runway: ${Math.floor(cash_position / monthly_cash_burn)} months`,
          'Revenue growth: 12% YoY',
          'Operational capacity at 85%',
        ],
        risk_factors: ['Cash flow pressure', 'Revenue dependent on hiring'],
      },
      {
        id: 'working_capital_loan',
        question: 'Should I apply for ₹1Cr working capital loan?',
        cost: 1000000,
        confidence: 72,
        recommendation: 'consider',
        reasoning: [
          'Current debt-to-equity: 0.45',
          'Interest burden manageable',
          'Seasonal working capital needs',
          'Growth opportunities available',
        ],
        risk_factors: ['Debt service obligations', 'Interest rate fluctuations'],
      },
      {
        id: 'new_product_investment',
        question: 'Can I invest ₹15L in new product development?',
        cost: 1500000,
        confidence: 58,
        recommendation: 'not_recommended',
        reasoning: [
          'Market uncertainty',
          'Development timeline: 6 months',
          'ROI projection: 2.5 years',
          'Current focus on core business optimal',
        ],
        risk_factors: ['Product market fit uncertain', 'Development delays possible'],
      },
    ];
  }

  // Getters for all data
  getData() {
    return this.data;
  }

  addDeposit(deposit: Deposit) {
    this.data.deposits.push(deposit);
    this.data.revenue += deposit.amount;
  }

  addExpense(expense: ExpenseItem) {
    this.data.expenses_items.push(expense);
    this.data.expenses += expense.amount;
  }

  addInvoice(invoice: Invoice) {
    this.data.invoices.push(invoice);
  }
}

export const financialDataStore = new FinancialDataStore();
