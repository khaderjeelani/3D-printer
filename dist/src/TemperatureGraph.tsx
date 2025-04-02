import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { TemperatureDataPoint } from '../types';

interface Props {
  data: TemperatureDataPoint[];
}

export function TemperatureGraph({ data }: Props) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="time" 
            domain={['auto', 'auto']}
            tickFormatter={(time) => new Date(time).toLocaleTimeString()}
          />
          <YAxis domain={[0, 250]} />
          <Tooltip 
            labelFormatter={(time) => new Date(Number(time)).toLocaleTimeString()}
            formatter={(value: number) => [`${value.toFixed(1)}°C`]}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="hotend" 
            stroke="#ef4444" 
            name="Hotend" 
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="bed" 
            stroke="#3b82f6" 
            name="Bed" 
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}