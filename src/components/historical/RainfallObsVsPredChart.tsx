import React from 'react';
import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

interface RainfallObsVsPredChartProps {
  data: Array<{ date: string; observed: number; predicted: number }>;
}

export const RainfallObsVsPredChart: React.FC<RainfallObsVsPredChartProps> = ({ data }) => {
  return (
    <div className="charts-wrapper" style={{ width: '100%', height: '260px' }}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 15, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="date" stroke="#8b93a3" fontSize={11} tickLine={false} />
          <YAxis stroke="#8b93a3" fontSize={11} tickLine={false} unit=" mm" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#12161f',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              fontSize: '11px'
            }}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }} />
          <Bar
            dataKey="observed"
            name="IMD Doppler / Gauge Observed (mm)"
            fill="#22d3ee"
            opacity={0.7}
            radius={[4, 4, 0, 0]}
          />
          <Line
            type="monotone"
            dataKey="predicted"
            name="NWP Ensemble Mean Predicted (mm)"
            stroke="#f59e0b"
            strokeWidth={2.5}
            dot={{ r: 4, fill: '#f59e0b' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
