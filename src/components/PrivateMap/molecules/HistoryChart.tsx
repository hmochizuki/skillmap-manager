import React, { memo, FC } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import {
  purple,
  blue,
  red,
  orange,
  green,
  pink,
  teal,
  indigo,
} from "@material-ui/core/colors";
import { FULL_SCORE } from "config/business";

type Props = {
  xDataKey: string;
  yDataKeys: string[];
  data: Array<Record<string, string | number>>;
};

// TODO: theme に含める
const colors = [
  purple[500],
  blue[500],
  red[500],
  orange[500],
  teal[500],
  green[500],
  pink[500],
  indigo[500],
];

const HistryChart: FC<Props> = ({ xDataKey, yDataKeys, data }) => {
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
      <YAxis domain={[0, FULL_SCORE]} />
      <Legend layout="vertical" align="right" verticalAlign="middle" />
      {yDataKeys.map((key, i) => {
        return (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors[i]}
            activeDot={{ r: 8 }}
          />
        );
      })}
    </LineChart>
  );
};

export default memo(HistryChart);
