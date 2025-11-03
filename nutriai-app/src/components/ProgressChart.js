import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { listEntries } from '../api/entriesClient';

function ProgressChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function load() {
      const rows = await listEntries();
      // Map rows to chart data: { date, weight }
      const mapped = (rows || []).map((r) => ({ date: r.date, weight: Number(r.weight) || null })).filter(d => d.weight != null);
      setData(mapped);
    }
    load();
  }, []);

  if (!data || data.length === 0) return <div>No progress data yet.</div>;

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProgressChart;
