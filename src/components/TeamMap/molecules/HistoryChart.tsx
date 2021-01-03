import React, { memo, ReactElement } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { FULL_SCORE } from "config/business";
import { graphColors } from "components/theme";

type Props<X extends string, Y extends string> = {
  xDataKey: X;
  yDataKeys: Y[];
  yLabel: string;
  data: Record<X, Y | number>[];
};

const HistryChart = <X extends string, Y extends string>({
  xDataKey,
  yDataKeys,
  yLabel,
  data,
}: Props<X, Y>): ReactElement<Props<X, Y>> => {
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
      <XAxis dataKey={xDataKey} />
      <YAxis
        domain={[0, FULL_SCORE]}
        label={{ value: yLabel, position: "insideLeft" }}
      />
      <Legend layout="horizontal" align="center" verticalAlign="bottom" />
      {yDataKeys.map((key, i) => {
        return (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={graphColors[i]}
            activeDot={{ r: 8 }}
          />
        );
      })}
    </LineChart>
  );
};

export default memo(HistryChart);
