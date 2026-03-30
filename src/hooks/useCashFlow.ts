import { useState, useMemo } from 'react';
import type { Transaction, ScenarioType, ForecastDataPoint } from '../types';
import { initialTransactions, INITIAL_BALANCE } from '../data/mockData';
import { startOfDay, addDays, format, parseISO, isSameDay } from 'date-fns';

export function useCashFlow() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [scenario, setScenario] = useState<ScenarioType>('base');
  const [customModifiers, setCustomModifiers] = useState({
    incomeMultiplier: 1,
    expenseMultiplier: 1,
  });

  const activeTransactions = useMemo(() => {
    return transactions.map(t => {
      let modifiedAmount = t.amount;
      
      if (scenario === 'optimistic') {
        if (t.type === 'income') modifiedAmount *= 1.1;
        if (t.type === 'expense') modifiedAmount *= 0.9;
      } else if (scenario === 'conservative') {
        if (t.type === 'income') modifiedAmount *= 0.9;
        if (t.type === 'expense') modifiedAmount *= 1.1;
      } else if (scenario === 'custom') {
        if (t.type === 'income') modifiedAmount *= customModifiers.incomeMultiplier;
        if (t.type === 'expense') modifiedAmount *= customModifiers.expenseMultiplier;
      }
      
      return { ...t, amount: modifiedAmount };
    }).filter(t => t.active);
  }, [transactions, scenario, customModifiers]);

  const forecast = useMemo(() => {
    const data: ForecastDataPoint[] = [];
    let currentBalance = INITIAL_BALANCE;
    const today = startOfDay(new Date());

    for (let i = 0; i <= 90; i++) {
      const currentDate = addDays(today, i);
      let dailyIncome = 0;
      let dailyExpense = 0;

      activeTransactions.forEach(t => {
        let appliesToday = false;
        
        if (t.frequency === 'one-time' && t.date) {
          appliesToday = isSameDay(currentDate, parseISO(t.date));
        } else if (t.frequency === 'monthly') {
          appliesToday = currentDate.getDate() === today.getDate(); // Simplification
        } else if (t.frequency === 'weekly') {
          appliesToday = currentDate.getDay() === today.getDay();
        } else if (t.frequency === 'yearly') {
           appliesToday = currentDate.getMonth() === today.getMonth() && currentDate.getDate() === today.getDate();
        }

        if (appliesToday) {
          if (t.type === 'income') dailyIncome += t.amount;
          else dailyExpense += t.amount;
        }
      });

      currentBalance += dailyIncome - dailyExpense;

      data.push({
        date: format(currentDate, 'MMM dd'),
        balance: currentBalance,
        income: dailyIncome,
        expense: dailyExpense,
      });
    }

    return data;
  }, [activeTransactions]);

  const toggleTransaction = (id: string) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, active: !t.active } : t));
    if (scenario !== 'custom') setScenario('custom');
  };

  const updateCustomModifier = (type: 'income' | 'expense', value: number) => {
    setCustomModifiers(prev => ({
      ...prev,
      [type === 'income' ? 'incomeMultiplier' : 'expenseMultiplier']: value
    }));
    setScenario('custom');
  };

  return {
    transactions,
    activeTransactions,
    forecast,
    scenario,
    setScenario,
    toggleTransaction,
    customModifiers,
    updateCustomModifier
  };
}
