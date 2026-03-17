export type TransactionType = 'income' | 'expense';
export type Frequency = 'one-time' | 'weekly' | 'monthly' | 'yearly';

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  type: TransactionType;
  frequency: Frequency;
  date?: string; // For one-time
  active: boolean; // For scenarios
}

export type ScenarioType = 'base' | 'optimistic' | 'conservative' | 'custom';

export interface ForecastDataPoint {
  date: string;
  balance: number;
  income: number;
  expense: number;
}
