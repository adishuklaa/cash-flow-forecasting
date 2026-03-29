import { useCashFlow } from '../hooks/useCashFlow';
import { ForecastChart } from './ForecastChart';
import { LOW_BALANCE_THRESHOLD } from '../data/mockData';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  DollarSign, 
  Settings2,
  Calendar
} from 'lucide-react';
import { cn } from '../lib/utils';
import type { ScenarioType } from '../types';

export function Dashboard() {
  const { 
    transactions, 
    forecast, 
    scenario, 
    setScenario, 
    toggleTransaction,
    customModifiers,
    updateCustomModifier
  } = useCashFlow();

  const lowestBalance = Math.min(...forecast.map(f => f.balance));
  const hasLowBalanceWarning = lowestBalance < LOW_BALANCE_THRESHOLD;
  const currentBalance = forecast[0]?.balance || 0;
  const endBalance = forecast[forecast.length - 1]?.balance || 0;

  const scenarios: { value: ScenarioType, label: string }[] = [
    { value: 'base', label: 'Base Case' },
    { value: 'optimistic', label: 'Optimistic (+10% Inc, -10% Exp)' },
    { value: 'conservative', label: 'Conservative (-10% Inc, +10% Exp)' },
    { value: 'custom', label: 'Custom Simulation' }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Cash Flow Forecast
            </h1>
            <p className="text-slate-400 mt-1">90-Day Interactive Projection</p>
          </div>
          
          <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
            {scenarios.map(s => (
              <button
                key={s.value}
                onClick={() => setScenario(s.value)}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  scenario === s.value 
                    ? "bg-blue-600 text-white shadow-sm" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-700"
                )}
              >
                {s.label.split(' ')[0]}
              </button>
            ))}
          </div>
        </header>

        {/* Alerts */}
        {hasLowBalanceWarning && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
            <AlertTriangle className="text-red-500 w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-red-500 font-medium">Low Balance Alert</h3>
              <p className="text-red-400/80 text-sm mt-1">
                Your forecasted balance drops to ${lowestBalance.toFixed(2)}, which is below your safe threshold of ${LOW_BALANCE_THRESHOLD}.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                  Projection Chart
                </h2>
                <div className="text-right">
                  <p className="text-sm text-slate-400">90-Day Est. Balance</p>
                  <p className="text-2xl font-bold text-emerald-400">${endBalance.toFixed(2)}</p>
                </div>
              </div>
              <ForecastChart data={forecast} />
            </div>

            {/* Custom Scenario Controls */}
            {scenario === 'custom' && (
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
                <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                  <Settings2 className="w-5 h-5 text-purple-400" />
                  Custom Scenario Modifiers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Income Multiplier: {(customModifiers.incomeMultiplier * 100).toFixed(0)}%</label>
                    <input 
                      type="range" 
                      min="0.5" max="1.5" step="0.05" 
                      value={customModifiers.incomeMultiplier}
                      onChange={(e) => updateCustomModifier('income', parseFloat(e.target.value))}
                      className="w-full accent-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Expense Multiplier: {(customModifiers.expenseMultiplier * 100).toFixed(0)}%</label>
                    <input 
                      type="range" 
                      min="0.5" max="1.5" step="0.05" 
                      value={customModifiers.expenseMultiplier}
                      onChange={(e) => updateCustomModifier('expense', parseFloat(e.target.value))}
                      className="w-full accent-red-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4">Current Status</h2>
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Current Balance</p>
                  <p className="text-2xl font-bold">${currentBalance.toFixed(2)}</p>
                </div>
              </div>
            </div>

            {/* Transactions List */}
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex-1">
              <h2 className="text-lg font-semibold mb-4">Income & Expenses</h2>
              <p className="text-xs text-slate-400 mb-4">Toggle items to simulate "what-if" scenarios (e.g. canceling a subscription).</p>
              
              <div className="space-y-3">
                {transactions.map(t => (
                  <div 
                    key={t.id} 
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer",
                      t.active ? "bg-slate-700/50 border-slate-600" : "bg-slate-800 border-slate-700 opacity-50 grayscale"
                    )}
                    onClick={() => toggleTransaction(t.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-2 rounded-md",
                        t.type === 'income' ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                      )}>
                        {t.type === 'income' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      </div>
                      <div>
                        <p className={cn("text-sm font-medium", !t.active && "line-through text-slate-500")}>{t.name}</p>
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <Calendar className="w-3 h-3" />
                          <span className="capitalize">{t.frequency}</span>
                        </div>
                      </div>
                    </div>
                    <div className={cn(
                      "font-semibold",
                      t.type === 'income' ? "text-emerald-400" : "text-rose-400",
                      !t.active && "line-through text-slate-500"
                    )}>
                      {t.type === 'income' ? '+' : '-'}${t.amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
