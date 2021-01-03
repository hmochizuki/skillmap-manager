import React, { memo, ReactElement } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { FULL_SCORE } from "config/business";
import { graphColors } from "components/theme";

type Props<X extends string, Y extends string> = {
  xDataKey: X;
  yLabel: string;
  data: Record<X | Y, string | number>[];
  categoriesFilter: { id: string; name: string; hide: boolean }[];
};

const HistryChart = <X extends string, Y extends string>({
  xDataKey,
  yLabel,
  data,
  categoriesFilter,
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
      {categoriesFilter.map(({ id, name, hide }, i) => {
        return hide ? null : (
          <Line
            key={id}
            name={name}
            type="monotone"
            dataKey={id}
            stroke={graphColors[i]}
            activeDot={{ r: 8 }}
          />
        );
      })}
    </LineChart>
  );
};

export default memo(HistryChart);
