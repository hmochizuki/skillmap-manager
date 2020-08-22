import React, { memo } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

const data = [
  {
    ym: "2020/01",
    React: 10,
    Redux: 10,
    Others: 10,
  },
  {
    ym: "2020/02",
    React: 10,
    Redux: 20,
    Others: 30,
  },
  {
    ym: "2020/03",
    React: 40,
    Redux: 50,
    Others: 60,
  },
  {
    ym: "2020/04",
    React: 70,
    Redux: 80,
    Others: 90,
  },
  {
    ym: "2020/05",
    React: 70,
    Redux: 60,
    Others: 50,
  },
  {
    ym: "2020/06",
    React: 90,
    Redux: 80,
    Others: 70,
  },
  {
    ym: "2020/07",
    React: 70,
    Redux: 20,
    Others: 80,
  },
];

const HistryChart = () => {
  return (
    <LineChart
      width={800}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="ym" />
      <YAxis domain={[0, 100]} />
      <Legend layout="vertical" align="right" verticalAlign="middle" />
      <Line
        type="monotone"
        dataKey="React"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
      <Line type="monotone" dataKey="Redux" stroke="#82ca9d" />
      <Line type="monotone" dataKey="Others" stroke="#ccc" />
    </LineChart>
  );
};

export default memo(HistryChart);
