import type { Transaction } from '../types';

export const initialTransactions: Transaction[] = [
  { id: '1', name: 'Salary', amount: 5000, type: 'income', frequency: 'monthly', active: true },
  { id: '2', name: 'Side Hustle', amount: 800, type: 'income', frequency: 'monthly', active: true },
  { id: '3', name: 'Rent', amount: 1500, type: 'expense', frequency: 'monthly', active: true },
  { id: '4', name: 'Groceries', amount: 400, type: 'expense', frequency: 'weekly', active: true },
  { id: '5', name: 'Utilities', amount: 200, type: 'expense', frequency: 'monthly', active: true },
  { id: '6', name: 'Car Insurance', amount: 100, type: 'expense', frequency: 'monthly', active: true },
  { id: '7', name: 'Internet', amount: 80, type: 'expense', frequency: 'monthly', active: true },
  { id: '8', name: 'New Laptop', amount: 1200, type: 'expense', frequency: 'one-time', date: new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toISOString(), active: true },
  { id: '9', name: 'Annual Bonus', amount: 2000, type: 'income', frequency: 'yearly', active: true },
];

export const INITIAL_BALANCE = 3500;
export const LOW_BALANCE_THRESHOLD = 1000;
