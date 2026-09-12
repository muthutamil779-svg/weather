import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

interface ConfidenceVsActualChartProps {
  data: Array<{ date: string; confidence: number; actualAccuracy: number }>;
}

export const ConfidenceVsActualChart: React.FC<ConfidenceVsActualChartProps> = ({ data }) => {
  return (
    <div className="charts-wrapper" style={{ width: '100%', height: '260px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="date" stroke="#8b93a3" fontSize={11} tickLine={false} />
          <YAxis stroke="#8b93a3" fontSize={11} tickLine={false} domain={[50, 100]} unit="%" />
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
            dataKey="confidence"
            name="Model Initial Confidence (%)"
            stroke="#3b9cff"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={{ r: 3, fill: '#3b9cff' }}
          />
          <Line
            type="monotone"
            dataKey="actualAccuracy"
            name="Post-Hoc Verification Accuracy (%)"
            stroke="#22c55e"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#22c55e' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
