import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AreaGraph = ({ avgValue, seconds }) => {
  const [avgArr, setAvgArr] = useState(
    Array.from({ length: 5 }, (_, i) => ({ name: `${i + 1}s`, Percent: 0 }))
  );

  useEffect(() => {
    setAvgArr(prevArr => {
      if (seconds <= 5) {
        const updatedArr = [...prevArr];
        updatedArr[seconds - 1] = { name: `${seconds}s`, Percent: avgValue };
        return updatedArr;
      }

      const newEntry = { name: `${seconds}s`, Percent: avgValue };
      const isDuplicate = prevArr[prevArr.length - 1]?.name === newEntry.name;

      return isDuplicate
        ? prevArr
        : [...prevArr.slice(1), newEntry];
    });
  }, [seconds, avgValue]);

  return (
    <div className="area-graph">
      <div className="chart-header">Area Chart</div>
      <ResponsiveContainer minHeight={300}>
        <AreaChart
          width={700}
          height={450}
          data={avgArr}
          margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
        >
          <XAxis dataKey="name" stroke="#4e4e4e" />
          <YAxis ticks={[0, 20, 40, 60, 80, 100]} domain={[0, 100]} stroke="#4e4e4e" />
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Percent"
            stroke="#5b5b60"
            fill="#cacbce"
            activeDot={{ r: 6 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaGraph;
