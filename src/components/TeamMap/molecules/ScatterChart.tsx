import React, { ReactElement } from "react";
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
import {
  ScatterChart as BaseScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Legend,
  Scatter,
  LabelList,
} from "recharts";
import { FULL_SCORE } from "config/business";

const colors = [
  purple[500],
  blue[500],
  red[500],
  orange[500],
  teal[500],
  green[500],
  pink[500],
  indigo[500],
  purple[200],
  blue[200],
  red[200],
  orange[200],
  teal[200],
  green[200],
  pink[200],
  indigo[200],
];

type Axis = {
  key: string;
  label: string;
};

type Props<Key extends string> = {
  data: (Record<Key, string> & { show: boolean })[];
  dataKey: Key;
  axis: {
    x: Axis;
    y: Axis;
    z: Axis;
  };
};

const ScatterChart = <Key extends string>({
  data,
  dataKey,
  axis: { x, y, z },
}: Props<Key>): ReactElement<Props<Key>> => {
  return (
    <BaseScatterChart
      width={730}
      height={250}
      margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        type="number"
        dataKey={x.key}
        name={x.label}
        domain={[0, FULL_SCORE]}
        label={{ value: x.label, position: "insideBottom" }}
      />
      <YAxis
        type="number"
        dataKey={y.key}
        name={y.label}
        domain={[0, "auto"]}
        label={{ value: y.label, position: "insideLeft" }}
      />
      <ZAxis type="number" dataKey={z.key} name={z.label} range={[100, 1000]} />
      <Legend />
      {data.map((d, i) => (
        <Scatter
          key={d[dataKey]}
          name={d[dataKey]}
          data={[d]}
          fill={colors[i]}
          hide={!d.show}
        >
          <LabelList dataKey={dataKey} position="top" />
        </Scatter>
      ))}
    </BaseScatterChart>
  );
};

export default ScatterChart;
