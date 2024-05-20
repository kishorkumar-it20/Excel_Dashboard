import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const WiderLineChart = ({ data }) => {
  return (
    <div style={{ width: '1700px', margin: 'auto' }}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis/>
          <YAxis label={{ value: 'Gross weight', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="Gross weight Metric Tons"
            stroke="#ff7300"
            strokeWidth={1}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
  

export default WiderLineChart;