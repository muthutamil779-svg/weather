import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

interface ForecastErrorChartProps {
  data: Array<{ date: string; error: number }>;
}

export const ForecastErrorChart: React.FC<ForecastErrorChartProps> = ({ data }) => {
  return (
    <div className="charts-wrapper" style={{ width: '100%', height: '260px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="date" stroke="#8b93a3" fontSize={11} tickLine={false} />
          <YAxis stroke="#8b93a3" fontSize={11} tickLine={false} domain={[0, 'dataMax + 4']} unit=" mm" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#12161f',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              fontSize: '11px'
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
          <Line
            type="monotone"
            dataKey="error"
            name="Mean Absolute Precipitation Error (MAE)"
            stroke="#ef4444"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#ef4444' }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
