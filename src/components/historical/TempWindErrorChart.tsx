import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

interface TempWindErrorChartProps {
  data: Array<{ date: string; error: number }>;
  metricName: string;
  unit: string;
  lineColor: string;
}

export const TempWindErrorChart: React.FC<TempWindErrorChartProps> = ({
  data,
  metricName,
  unit,
  lineColor
}) => {
  return (
    <div className="charts-wrapper" style={{ width: '100%', height: '260px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="date" stroke="#8b93a3" fontSize={11} tickLine={false} />
          <YAxis stroke="#8b93a3" fontSize={11} tickLine={false} unit={` ${unit}`} />
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
            name={`${metricName} Error (${unit})`}
            stroke={lineColor}
            strokeWidth={2.5}
            dot={{ r: 3, fill: lineColor }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
