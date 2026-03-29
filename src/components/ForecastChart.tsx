import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import type { ForecastDataPoint } from '../types';
import { LOW_BALANCE_THRESHOLD } from '../data/mockData';

interface Props {
  data: ForecastDataPoint[];
}

export function ForecastChart({ data }: Props) {
  return (
    <div className="h-[400px] w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="date" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" tickFormatter={(value) => `$${value}`} />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
            formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Balance']}
          />
          <ReferenceLine y={LOW_BALANCE_THRESHOLD} label={{ position: 'top', value: 'Low Balance Warning', fill: '#ef4444', fontSize: 12 }} stroke="#ef4444" strokeDasharray="3 3" />
          <Line 
            type="monotone" 
            dataKey="balance" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-center text-xs text-slate-400 mt-2">* Forecasts are simulated estimates based on current scenarios and assumptions.</p>
    </div>
  );
}
